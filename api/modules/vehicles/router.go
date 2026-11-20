package mvehicles

import (
	vehiclescontrollers "github.com/eriickz/one-vehicle/api/modules/vehicles/controllers"
	vehiclesrepositories "github.com/eriickz/one-vehicle/api/modules/vehicles/repositories"
	vehiclesservices "github.com/eriickz/one-vehicle/api/modules/vehicles/services"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
	"github.com/uptrace/bun"
)

func RegisterVehiclesRoutes(apiGroup *echo.Group, dbClient *bun.DB, validate *validator.Validate) {
	vehiclesRepo := vehiclesrepositories.NewVehiclesRepository(dbClient)
	vehiclesService := vehiclesservices.NewVehiclesService(vehiclesRepo, validate)
	vehiclesController := vehiclescontrollers.NewVehiclesController(vehiclesService)

	vehiclesGroup := apiGroup.Group("/vehicles")
	vehiclesGroup.GET("", vehiclesController.ListVehicles)
	vehiclesGroup.GET("/:id", vehiclesController.GetVehicle)
	vehiclesGroup.GET("/:id/metrics", vehiclesController.GetVehicleMetrics)
	vehiclesGroup.POST("", vehiclesController.CreateVehicle)
	vehiclesGroup.PUT("/:id", vehiclesController.UpdateVehicle)
	vehiclesGroup.DELETE("/:id", vehiclesController.DeleteVehicle)
}
