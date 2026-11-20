package mcatalog

import (
	catalogcontrollers "github.com/eriickz/one-vehicle/api/modules/catalog/controllers"
	catalogrepositories "github.com/eriickz/one-vehicle/api/modules/catalog/repositories"
	catalogservices "github.com/eriickz/one-vehicle/api/modules/catalog/services"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
	"github.com/uptrace/bun"
)

func RegisterCatalogRoutes(apiGroup *echo.Group, dbClient *bun.DB, validate *validator.Validate) {
	catalogRepo := catalogrepositories.NewCatalogRepository(dbClient)
	catalogService := catalogservices.NewCatalogService(catalogRepo, validate)
	catalogController := catalogcontrollers.NewCatalogController(catalogService)

	apiGroup.GET("/catalog/:name", catalogController.GetCatalog)

	currenciesGroup := apiGroup.Group("/currencies")
	currenciesGroup.GET("", catalogController.ListCurrencies)
	currenciesGroup.GET("/:id", catalogController.GetCurrency)
	currenciesGroup.POST("", catalogController.CreateCurrency)
	currenciesGroup.PUT("/:id", catalogController.UpdateCurrency)
	currenciesGroup.DELETE("/:id", catalogController.DeleteCurrency)

	categoriesGroup := apiGroup.Group("/categories")
	categoriesGroup.GET("", catalogController.ListCategories)
	categoriesGroup.GET("/:id", catalogController.GetCategory)
	categoriesGroup.POST("", catalogController.CreateCategory)
	categoriesGroup.PUT("/:id", catalogController.UpdateCategory)
	categoriesGroup.DELETE("/:id", catalogController.DeleteCategory)
}
