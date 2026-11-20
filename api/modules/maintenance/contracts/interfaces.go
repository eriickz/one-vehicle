package maintenancecontracts

import (
	"context"

	"github.com/labstack/echo/v5"
)

type IMaintenanceRepository interface {
	ListLogs(ctx context.Context, filters MaintenanceLogFilters) ([]MaintenanceLog, int, error)
	GetLog(ctx context.Context, id string) (*MaintenanceLog, error)
	CreateLog(ctx context.Context, log *MaintenanceLog) (*MaintenanceLog, error)
	UpdateLog(ctx context.Context, id string, req MaintenanceLogRequest, log *MaintenanceLog) (*MaintenanceLog, error)
	DeleteLog(ctx context.Context, id string) error
}

type IMaintenanceService interface {
	ListLogs(c *echo.Context, filters MaintenanceLogFilters) ([]MaintenanceLog, int, error)
	GetLog(c *echo.Context, id string) (*MaintenanceLog, error)
	CreateLog(c *echo.Context, req MaintenanceLogRequest) (*MaintenanceLog, error)
	UpdateLog(c *echo.Context, id string, req MaintenanceLogRequest) (*MaintenanceLog, error)
	DeleteLog(c *echo.Context, id string) error
}
