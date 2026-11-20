package catalogservices

import (
	"context"
	"fmt"
	"time"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
)

type CatalogService struct {
	repo     catalogcontracts.ICatalogRepository
	validate *validator.Validate
}

func NewCatalogService(repo catalogcontracts.ICatalogRepository, validate *validator.Validate) *CatalogService {
	return &CatalogService{repo: repo, validate: validate}
}

var _ catalogcontracts.ICatalogService = (*CatalogService)(nil)

func (s *CatalogService) GetCatalog(c *echo.Context, name string) (any, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	switch name {
	case "currencies":
		return s.repo.GetCurrencies(ctx)
	case "categories":
		return s.repo.GetCategories(ctx)
	default:
		return nil, fmt.Errorf("catalog '%s' not found", name)
	}
}

func (s *CatalogService) ListCurrencies(c *echo.Context, filters utils.PaginationFilters) ([]catalogcontracts.Currency, int, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.ListCurrencies(ctx, filters)
}

func (s *CatalogService) GetCurrency(c *echo.Context, id int16) (*catalogcontracts.Currency, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetCurrency(ctx, id)
}

func (s *CatalogService) CreateCurrency(c *echo.Context, req catalogcontracts.CurrencyRequest) (*catalogcontracts.Currency, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.CreateCurrency(ctx, req)
}

func (s *CatalogService) UpdateCurrency(c *echo.Context, id int16, req catalogcontracts.CurrencyRequest) (*catalogcontracts.Currency, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.UpdateCurrency(ctx, id, req)
}

func (s *CatalogService) DeleteCurrency(c *echo.Context, id int16) error {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.DeleteCurrency(ctx, id)
}

func (s *CatalogService) ListCategories(c *echo.Context, filters utils.PaginationFilters) ([]catalogcontracts.Category, int, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.ListCategories(ctx, filters)
}

func (s *CatalogService) GetCategory(c *echo.Context, id int16) (*catalogcontracts.Category, error) {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.GetCategory(ctx, id)
}

func (s *CatalogService) CreateCategory(c *echo.Context, req catalogcontracts.CategoryRequest) (*catalogcontracts.Category, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.CreateCategory(ctx, req)
}

func (s *CatalogService) UpdateCategory(c *echo.Context, id int16, req catalogcontracts.CategoryRequest) (*catalogcontracts.Category, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.UpdateCategory(ctx, id, req)
}

func (s *CatalogService) DeleteCategory(c *echo.Context, id int16) error {
	ctx, cancel := context.WithTimeout(c.Request().Context(), time.Second*5)
	defer cancel()

	return s.repo.DeleteCategory(ctx, id)
}
