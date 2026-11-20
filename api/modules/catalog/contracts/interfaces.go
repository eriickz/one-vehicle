package catalogcontracts

import (
	"context"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	"github.com/labstack/echo/v5"
)

type ICatalogRepository interface {
	GetCurrencies(ctx context.Context) ([]Currency, error)
	ListCurrencies(ctx context.Context, filters utils.PaginationFilters) ([]Currency, int, error)
	GetCurrency(ctx context.Context, id int16) (*Currency, error)
	CreateCurrency(ctx context.Context, req CurrencyRequest) (*Currency, error)
	UpdateCurrency(ctx context.Context, id int16, req CurrencyRequest) (*Currency, error)
	DeleteCurrency(ctx context.Context, id int16) error

	GetCategories(ctx context.Context) ([]Category, error)
	ListCategories(ctx context.Context, filters utils.PaginationFilters) ([]Category, int, error)
	GetCategory(ctx context.Context, id int16) (*Category, error)
	CreateCategory(ctx context.Context, req CategoryRequest) (*Category, error)
	UpdateCategory(ctx context.Context, id int16, req CategoryRequest) (*Category, error)
	DeleteCategory(ctx context.Context, id int16) error
}

type ICatalogService interface {
	GetCatalog(c *echo.Context, name string) (any, error)
	ListCurrencies(c *echo.Context, filters utils.PaginationFilters) ([]Currency, int, error)
	GetCurrency(c *echo.Context, id int16) (*Currency, error)
	CreateCurrency(c *echo.Context, req CurrencyRequest) (*Currency, error)
	UpdateCurrency(c *echo.Context, id int16, req CurrencyRequest) (*Currency, error)
	DeleteCurrency(c *echo.Context, id int16) error

	ListCategories(c *echo.Context, filters utils.PaginationFilters) ([]Category, int, error)
	GetCategory(c *echo.Context, id int16) (*Category, error)
	CreateCategory(c *echo.Context, req CategoryRequest) (*Category, error)
	UpdateCategory(c *echo.Context, id int16, req CategoryRequest) (*Category, error)
	DeleteCategory(c *echo.Context, id int16) error
}
