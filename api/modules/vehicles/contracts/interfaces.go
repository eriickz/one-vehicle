package vehiclescontracts

import (
	"context"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	"github.com/labstack/echo/v5"
)

type IVehiclesRepository interface {
	ListVehicles(ctx context.Context, filters utils.PaginationFilters) ([]Vehicle, int, error)
	GetVehicle(ctx context.Context, id string) (*Vehicle, error)
	GetCurrentVehicle(ctx context.Context) (*Vehicle, error)
	SetCurrentVehicle(ctx context.Context, id string) (*Vehicle, error)
	GetVehicleMetrics(ctx context.Context, vehicleID string) (*VehicleMetricsResponse, error)
	CreateVehicle(ctx context.Context, req VehicleRequest) (*Vehicle, error)
	UpdateVehicle(ctx context.Context, id string, req VehicleRequest) (*Vehicle, error)
	DeleteVehicle(ctx context.Context, id string) error
}

type IVehiclesService interface {
	ListVehicles(c *echo.Context, filters utils.PaginationFilters) ([]Vehicle, int, error)
	GetVehicle(c *echo.Context, id string) (*Vehicle, error)
	GetCurrentVehicle(c *echo.Context) (*Vehicle, error)
	SetCurrentVehicle(c *echo.Context, id string) (*Vehicle, error)
	GetVehicleMetrics(c *echo.Context, id string) (*VehicleMetricsResponse, error)
	CreateVehicle(c *echo.Context, req VehicleRequest) (*Vehicle, error)
	UpdateVehicle(c *echo.Context, id string, req VehicleRequest) (*Vehicle, error)
	DeleteVehicle(c *echo.Context, id string) error
}
