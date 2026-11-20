package maintenancerepositories

import (
	"context"

	maintenancecontracts "github.com/eriickz/one-vehicle/api/modules/maintenance/contracts"
	"github.com/uptrace/bun"
)

type MaintenanceRepository struct {
	db *bun.DB
}

func NewMaintenanceRepository(db *bun.DB) *MaintenanceRepository {
	return &MaintenanceRepository{db: db}
}

var _ maintenancecontracts.IMaintenanceRepository = (*MaintenanceRepository)(nil)

func (repo *MaintenanceRepository) ListLogs(ctx context.Context, filters maintenancecontracts.MaintenanceLogFilters) ([]maintenancecontracts.MaintenanceLog, int, error) {
	logs := make([]maintenancecontracts.MaintenanceLog, 0)

	baseQuery := func() *bun.SelectQuery {
		q := repo.db.NewSelect().
			Model((*maintenancecontracts.MaintenanceLog)(nil)).
			Relation("Vehicle").
			Relation("Vehicle.Currency").
			Relation("Category")

		if filters.VehicleID != "" {
			q.Where("maintenance_log.vehicle_id = ?", filters.VehicleID)
		}

		if filters.CategoryID > 0 {
			q.Where("maintenance_log.category_id = ?", filters.CategoryID)
		}

		if filters.Search != "" {
			pattern := "%" + filters.Search + "%"
			q.Where("maintenance_log.title ILIKE ? OR maintenance_log.notes ILIKE ?", pattern, pattern)
		}

		return q
	}

	total, err := baseQuery().Count(ctx)
	if err != nil {
		return nil, 0, err
	}

	err = baseQuery().
		Order("maintenance_log.date DESC", "maintenance_log.created_at DESC").
		Limit(int64(filters.PageSize)).
		Offset(int64(filters.Offset())).
		Scan(ctx, &logs)
	if err != nil {
		return nil, 0, err
	}

	return logs, int(total), nil
}

func (repo *MaintenanceRepository) GetLog(ctx context.Context, id string) (*maintenancecontracts.MaintenanceLog, error) {
	log := new(maintenancecontracts.MaintenanceLog)
	err := repo.db.NewSelect().
		Model(log).
		Relation("Vehicle").
		Relation("Vehicle.Currency").
		Relation("Category").
		Where("maintenance_log.id = ?", id).
		Scan(ctx)
	if err != nil {
		return nil, err
	}
	return log, nil
}

func (repo *MaintenanceRepository) CreateLog(ctx context.Context, log *maintenancecontracts.MaintenanceLog) (*maintenancecontracts.MaintenanceLog, error) {
	_, err := repo.db.NewInsert().Model(log).Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return repo.GetLog(ctx, log.ID)
}

func (repo *MaintenanceRepository) UpdateLog(ctx context.Context, id string, req maintenancecontracts.MaintenanceLogRequest, log *maintenancecontracts.MaintenanceLog) (*maintenancecontracts.MaintenanceLog, error) {
	_, err := repo.db.NewUpdate().Model(log).WherePK().Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return repo.GetLog(ctx, id)
}

func (repo *MaintenanceRepository) DeleteLog(ctx context.Context, id string) error {
	_, err := repo.db.NewDelete().Model((*maintenancecontracts.MaintenanceLog)(nil)).Where("id = ?", id).Exec(ctx)
	return err
}
