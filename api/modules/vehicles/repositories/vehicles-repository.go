package vehiclesrepositories

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/shopspring/decimal"
	"github.com/uptrace/bun"
)

type VehiclesRepository struct {
	db *bun.DB
}

func NewVehiclesRepository(db *bun.DB) *VehiclesRepository {
	return &VehiclesRepository{db: db}
}

var _ vehiclescontracts.IVehiclesRepository = (*VehiclesRepository)(nil)

func (repo *VehiclesRepository) ListVehicles(ctx context.Context, filters utils.PaginationFilters) ([]vehiclescontracts.Vehicle, int, error) {
	vehicles := make([]vehiclescontracts.Vehicle, 0)

	baseQuery := func() *bun.SelectQuery {
		q := repo.db.NewSelect().
			Model((*vehiclescontracts.Vehicle)(nil)).
			Relation("Currency")

		if filters.Search != "" {
			pattern := "%" + filters.Search + "%"
			q.Where("make ILIKE ? OR model ILIKE ? OR license_plate ILIKE ?", pattern, pattern, pattern)
		}

		return q
	}

	total, err := baseQuery().Count(ctx)
	if err != nil {
		return nil, 0, err
	}

	err = baseQuery().
		Order("created_at DESC").
		Limit(int64(filters.PageSize)).
		Offset(int64(filters.Offset())).
		Scan(ctx, &vehicles)
	if err != nil {
		return nil, 0, err
	}

	return vehicles, int(total), nil
}

func (repo *VehiclesRepository) GetVehicle(ctx context.Context, id string) (*vehiclescontracts.Vehicle, error) {
	vehicle := new(vehiclescontracts.Vehicle)
	err := repo.db.NewSelect().
		Model(vehicle).
		Relation("Currency").
		Where("vehicle.id = ?", id).
		Scan(ctx)
	if err != nil {
		return nil, err
	}
	return vehicle, nil
}

func (repo *VehiclesRepository) GetCurrentVehicle(ctx context.Context) (*vehiclescontracts.Vehicle, error) {
	vehicle := new(vehiclescontracts.Vehicle)

	err := repo.db.NewSelect().
		Model(vehicle).
		Relation("Currency").
		Where("vehicle.is_active = true").
		Order("vehicle.created_at DESC").
		Limit(1).
		Scan(ctx)
	if err != nil {
		return nil, err
	}

	return vehicle, nil
}

func (repo *VehiclesRepository) SetCurrentVehicle(ctx context.Context, id string) (*vehiclescontracts.Vehicle, error) {
	_, err := repo.db.NewUpdate().
		Model((*vehiclescontracts.Vehicle)(nil)).
		Set("is_active = false").
		Where("is_active = true").
		Exec(ctx)
	if err != nil {
		return nil, err
	}

	_, err = repo.db.NewUpdate().
		Model((*vehiclescontracts.Vehicle)(nil)).
		Set("is_active = true").
		Where("id = ?", id).
		Exec(ctx)
	if err != nil {
		return nil, err
	}

	return repo.GetVehicle(ctx, id)
}

func (repo *VehiclesRepository) GetVehicleMetrics(ctx context.Context, vehicleID string) (*vehiclescontracts.VehicleMetricsResponse, error) {
	vehicle, err := repo.GetVehicle(ctx, vehicleID)
	if err != nil {
		return nil, err
	}

	var stats struct {
		TotalExpenses   decimal.Decimal `bun:"total_expenses"`
		TotalLogsCount  int             `bun:"total_logs_count"`
		MaxMileage      sql.NullInt32   `bun:"max_mileage"`
		LastServiceDate *time.Time      `bun:"last_service_date"`
	}

	err = repo.db.NewSelect().
		TableExpr("maintenance_logs AS ml").
		ColumnExpr("COALESCE(SUM(ml.cost), 0) AS total_expenses").
		ColumnExpr("COUNT(ml.id) AS total_logs_count").
		ColumnExpr("MAX(ml.mileage) AS max_mileage").
		ColumnExpr("MAX(ml.date) AS last_service_date").
		Where("ml.vehicle_id = ?", vehicleID).
		Scan(ctx, &stats)
	if err != nil {
		return nil, err
	}

	var lastLog struct {
		Title string    `bun:"title"`
		Date  time.Time `bun:"date"`
	}

	err = repo.db.NewSelect().
		Table("maintenance_logs").
		Column("title", "date").
		Where("vehicle_id = ?", vehicleID).
		Order("date DESC", "created_at DESC").
		Limit(1).
		Scan(ctx, &lastLog)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	currentMileage := vehicle.InitialMileage
	if stats.MaxMileage.Valid && int(stats.MaxMileage.Int32) > currentMileage {
		currentMileage = int(stats.MaxMileage.Int32)
	}

	return &vehiclescontracts.VehicleMetricsResponse{
		VehicleID:      vehicleID,
		CurrentMileage: currentMileage,
		TotalExpenses:  stats.TotalExpenses,
		TotalLogsCount: stats.TotalLogsCount,
	}, nil
}

func (repo *VehiclesRepository) CreateVehicle(ctx context.Context, req vehiclescontracts.VehicleRequest) (*vehiclescontracts.Vehicle, error) {
	count, err := repo.db.NewSelect().Model((*vehiclescontracts.Vehicle)(nil)).Count(ctx)
	if err != nil {
		return nil, err
	}

	vehicle := &vehiclescontracts.Vehicle{
		ID:             utils.GenerateUUID(),
		CurrencyID:     req.CurrencyID,
		Make:           req.Make,
		Model:          req.Model,
		Year:           req.Year,
		LicensePlate:   req.LicensePlate,
		InitialMileage: req.InitialMileage,
		IsActive:       count == 0,
	}

	_, err = repo.db.NewInsert().Model(vehicle).Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return vehicle, nil
}

func (repo *VehiclesRepository) UpdateVehicle(ctx context.Context, id string, req vehiclescontracts.VehicleRequest) (*vehiclescontracts.Vehicle, error) {
	vehicle, err := repo.GetVehicle(ctx, id)
	if err != nil {
		return nil, err
	}

	vehicle.CurrencyID = req.CurrencyID
	vehicle.Make = req.Make
	vehicle.Model = req.Model
	vehicle.Year = req.Year
	vehicle.LicensePlate = req.LicensePlate
	vehicle.InitialMileage = req.InitialMileage

	_, err = repo.db.NewUpdate().Model(vehicle).WherePK().Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return vehicle, err
}

func (repo *VehiclesRepository) DeleteVehicle(ctx context.Context, id string) error {
	vehicle, err := repo.GetVehicle(ctx, id)
	if err != nil {
		return err
	}

	_, err = repo.db.NewDelete().
		Table("maintenance_logs").
		Where("vehicle_id = ?", id).
		Exec(ctx)
	if err != nil {
		return err
	}

	_, err = repo.db.NewDelete().Model((*vehiclescontracts.Vehicle)(nil)).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}

	if vehicle.IsActive {
		_, err = repo.db.NewUpdate().
			Model((*vehiclescontracts.Vehicle)(nil)).
			Set("is_active = true").
			Where("id = (SELECT id FROM vehicles ORDER BY created_at DESC LIMIT 1)").
			Exec(ctx)
		if err != nil {
			return err
		}
	}

	return err
}
