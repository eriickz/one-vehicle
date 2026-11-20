package mmaintenance

import (
	catalogrepositories "github.com/eriickz/one-vehicle/api/modules/catalog/repositories"
	maintenancecontrollers "github.com/eriickz/one-vehicle/api/modules/maintenance/controllers"
	maintenancerepositories "github.com/eriickz/one-vehicle/api/modules/maintenance/repositories"
	maintenanceservices "github.com/eriickz/one-vehicle/api/modules/maintenance/services"
	vehiclesrepositories "github.com/eriickz/one-vehicle/api/modules/vehicles/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
	"github.com/uptrace/bun"
)

func RegisterMaintenanceRoutes(apiGroup *echo.Group, dbClient *bun.DB, validate *validator.Validate) {
	maintenanceRepo := maintenancerepositories.NewMaintenanceRepository(dbClient)
	vehiclesRepo := vehiclesrepositories.NewVehiclesRepository(dbClient)
	catalogRepo := catalogrepositories.NewCatalogRepository(dbClient)

	maintenanceService := maintenanceservices.NewMaintenanceService(maintenanceRepo, vehiclesRepo, catalogRepo, validate)
	maintenanceController := maintenancecontrollers.NewMaintenanceController(maintenanceService)

	logsGroup := apiGroup.Group("/maintenance-logs")
	logsGroup.GET("", maintenanceController.ListLogs)
	logsGroup.GET("/:id", maintenanceController.GetLog)
	logsGroup.POST("", maintenanceController.CreateLog)
	logsGroup.PUT("/:id", maintenanceController.UpdateLog)
	logsGroup.DELETE("/:id", maintenanceController.DeleteLog)
}
