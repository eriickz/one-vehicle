package maintenanceservices

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	maintenancecontracts "github.com/eriickz/one-vehicle/api/modules/maintenance/contracts"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
)

type MaintenanceService struct {
	repo         maintenancecontracts.IMaintenanceRepository
	vehiclesRepo vehiclescontracts.IVehiclesRepository
	catalogRepo  catalogcontracts.ICatalogRepository
	validate     *validator.Validate
}

func NewMaintenanceService(
	repo maintenancecontracts.IMaintenanceRepository,
	vehiclesRepo vehiclescontracts.IVehiclesRepository,
	catalogRepo catalogcontracts.ICatalogRepository,
	validate *validator.Validate,
) *MaintenanceService {
	return &MaintenanceService{
		repo:         repo,
		vehiclesRepo: vehiclesRepo,
		catalogRepo:  catalogRepo,
		validate:     validate,
	}
}

var _ maintenancecontracts.IMaintenanceService = (*MaintenanceService)(nil)

func parseDate(dateStr string) (time.Time, error) {
	if t, err := time.Parse("2006-01-02", dateStr); err == nil {
		return t, nil
	}
	if t, err := time.Parse(time.RFC3339, dateStr); err == nil {
		return t, nil
	}
	return time.Time{}, errors.New("invalid date format (expected YYYY-MM-DD or RFC3339)")
}

func (s *MaintenanceService) ListLogs(c *echo.Context, filters maintenancecontracts.MaintenanceLogFilters) ([]maintenancecontracts.MaintenanceLog, int, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.ListLogs(ctx, filters)
}

func (s *MaintenanceService) GetLog(c *echo.Context, id string) (*maintenancecontracts.MaintenanceLog, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetLog(ctx, id)
}

func (s *MaintenanceService) CreateLog(c *echo.Context, req maintenancecontracts.MaintenanceLogRequest) (*maintenancecontracts.MaintenanceLog, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	if req.Cost.IsNegative() {
		return nil, errors.New("cost cannot be negative")
	}

	parsedDate, err := parseDate(req.Date)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	vehicle, err := s.vehiclesRepo.GetVehicle(ctx, req.VehicleID)
	if err != nil {
		return nil, fmt.Errorf("vehicle with ID '%s' not found", req.VehicleID)
	}

	if req.Mileage < vehicle.InitialMileage {
		return nil, fmt.Errorf("mileage (%d) cannot be lower than the vehicle initial mileage (%d)", req.Mileage, vehicle.InitialMileage)
	}

	_, err = s.catalogRepo.GetCategory(ctx, req.CategoryID)
	if err != nil {
		return nil, fmt.Errorf("category with ID '%d' not found", req.CategoryID)
	}

	log := &maintenancecontracts.MaintenanceLog{
		ID:         utils.GenerateUUID(),
		VehicleID:  req.VehicleID,
		CategoryID: req.CategoryID,
		Date:       parsedDate,
		Mileage:    req.Mileage,
		Title:      req.Title,
		Cost:       req.Cost,
		Notes:      req.Notes,
	}

	return s.repo.CreateLog(ctx, log)
}

func (s *MaintenanceService) UpdateLog(c *echo.Context, id string, req maintenancecontracts.MaintenanceLogRequest) (*maintenancecontracts.MaintenanceLog, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	if req.Cost.IsNegative() {
		return nil, errors.New("cost cannot be negative")
	}

	parsedDate, err := parseDate(req.Date)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	existingLog, err := s.repo.GetLog(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("maintenance log with ID '%s' not found", id)
	}

	vehicle, err := s.vehiclesRepo.GetVehicle(ctx, req.VehicleID)
	if err != nil {
		return nil, fmt.Errorf("vehicle with ID '%s' not found", req.VehicleID)
	}

	if req.Mileage < vehicle.InitialMileage {
		return nil, fmt.Errorf("mileage (%d) cannot be lower than the vehicle initial mileage (%d)", req.Mileage, vehicle.InitialMileage)
	}

	_, err = s.catalogRepo.GetCategory(ctx, req.CategoryID)
	if err != nil {
		return nil, fmt.Errorf("category with ID '%d' not found", req.CategoryID)
	}

	existingLog.VehicleID = req.VehicleID
	existingLog.CategoryID = req.CategoryID
	existingLog.Date = parsedDate
	existingLog.Mileage = req.Mileage
	existingLog.Title = req.Title
	existingLog.Cost = req.Cost
	existingLog.Notes = req.Notes

	return s.repo.UpdateLog(ctx, id, req, existingLog)
}

func (s *MaintenanceService) DeleteLog(c *echo.Context, id string) error {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.DeleteLog(ctx, id)
}
