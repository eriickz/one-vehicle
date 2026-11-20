package main

import (
	"fmt"

	"github.com/eriickz/one-vehicle/api/internal/clients"
	"github.com/eriickz/one-vehicle/api/internal/config"
	mcatalog "github.com/eriickz/one-vehicle/api/modules/catalog"
	mmaintenance "github.com/eriickz/one-vehicle/api/modules/maintenance"
	mvehicles "github.com/eriickz/one-vehicle/api/modules/vehicles"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	envVars, err := config.LoadEnv()
	if err != nil {
		panic(err)
	}

	dbClient := clients.LoadDBClient(envVars.DBURL)
	validate := validator.New(validator.WithRequiredStructEnabled())

	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.RequestID())

	apiGroup := e.Group("/api")

	apiGroup.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	mcatalog.RegisterCatalogRoutes(apiGroup, dbClient, validate)
	mvehicles.RegisterVehiclesRoutes(apiGroup, dbClient, validate)
	mmaintenance.RegisterMaintenanceRoutes(apiGroup, dbClient, validate)

	if err := e.Start(fmt.Sprintf(":%s", envVars.AppPort)); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
