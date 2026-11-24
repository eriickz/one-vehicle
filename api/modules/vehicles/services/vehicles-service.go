package vehiclesservices

import (
	"context"
	"time"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
)

type VehiclesService struct {
	repo     vehiclescontracts.IVehiclesRepository
	validate *validator.Validate
}

func NewVehiclesService(repo vehiclescontracts.IVehiclesRepository, validate *validator.Validate) *VehiclesService {
	return &VehiclesService{repo: repo, validate: validate}
}

var _ vehiclescontracts.IVehiclesService = (*VehiclesService)(nil)

func (s *VehiclesService) ListVehicles(c *echo.Context, filters utils.PaginationFilters) ([]vehiclescontracts.Vehicle, int, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.ListVehicles(ctx, filters)
}

func (s *VehiclesService) GetVehicle(c *echo.Context, id string) (*vehiclescontracts.Vehicle, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetVehicle(ctx, id)
}

func (s *VehiclesService) GetCurrentVehicle(c *echo.Context) (*vehiclescontracts.Vehicle, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetCurrentVehicle(ctx)
}

func (s *VehiclesService) SetCurrentVehicle(c *echo.Context, id string) (*vehiclescontracts.Vehicle, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.SetCurrentVehicle(ctx, id)
}

func (s *VehiclesService) GetVehicleMetrics(c *echo.Context, id string) (*vehiclescontracts.VehicleMetricsResponse, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetVehicleMetrics(ctx, id)
}

func (s *VehiclesService) CreateVehicle(c *echo.Context, req vehiclescontracts.VehicleRequest) (*vehiclescontracts.Vehicle, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.CreateVehicle(ctx, req)
}

func (s *VehiclesService) UpdateVehicle(c *echo.Context, id string, req vehiclescontracts.VehicleRequest) (*vehiclescontracts.Vehicle, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.UpdateVehicle(ctx, id, req)
}

func (s *VehiclesService) DeleteVehicle(c *echo.Context, id string) error {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.DeleteVehicle(ctx, id)
}
