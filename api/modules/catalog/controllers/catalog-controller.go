package catalogcontrollers

import (
	"net/http"

	"github.com/eriickz/one-vehicle/api/internal/contracts"
	"github.com/eriickz/one-vehicle/api/internal/utils"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	"github.com/labstack/echo/v5"
)

type CatalogController struct {
	service catalogcontracts.ICatalogService
}

func NewCatalogController(service catalogcontracts.ICatalogService) *CatalogController {
	return &CatalogController{service: service}
}

func (cc *CatalogController) GetCatalog(c *echo.Context) error {
	name := c.Param("name")

	if c.QueryParam("page") != "" {
		filters := utils.NewPaginationFilters(c.QueryParam("page"), c.QueryParam("pageSize"), c.QueryParam("search"))

		var (
			data       any
			totalCount int
			err        error
		)

		switch name {
		case "currencies":
			data, totalCount, err = cc.service.ListCurrencies(c, filters)
		case "categories":
			data, totalCount, err = cc.service.ListCategories(c, filters)
		default:
			return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
				Message: "Catalog not found",
			})
		}

		if err != nil {
			return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, contracts.APIResponse[any]{
			Data:       data,
			Page:       filters.Page,
			PageSize:   filters.PageSize,
			TotalCount: totalCount,
		})
	}

	data, err := cc.service.GetCatalog(c, name)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[any]{
		Data: data,
	})
}

// Currencies Handlers

func (cc *CatalogController) ListCurrencies(c *echo.Context) error {
	filters := utils.NewPaginationFilters(c.QueryParam("page"), c.QueryParam("pageSize"), c.QueryParam("search"))
	data, totalCount, err := cc.service.ListCurrencies(c, filters)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[[]catalogcontracts.Currency]{
		Data:       data,
		Page:       filters.Page,
		PageSize:   filters.PageSize,
		TotalCount: totalCount,
	})
}

func (cc *CatalogController) GetCurrency(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid currency ID",
		})
	}

	currency, err := cc.service.GetCurrency(c, id)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[catalogcontracts.Currency]{
		Data: *currency,
	})
}

func (cc *CatalogController) CreateCurrency(c *echo.Context) error {
	var req catalogcontracts.CurrencyRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	currency, err := cc.service.CreateCurrency(c, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, contracts.APIResponse[catalogcontracts.Currency]{
		Message: "Currency created successfully.",
		Data:    *currency,
	})
}

func (cc *CatalogController) UpdateCurrency(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid currency ID",
		})
	}

	var req catalogcontracts.CurrencyRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	currency, err := cc.service.UpdateCurrency(c, id, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[catalogcontracts.Currency]{
		Message: "Currency updated successfully.",
		Data:    *currency,
	})
}

func (cc *CatalogController) DeleteCurrency(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid currency ID",
		})
	}

	if err := cc.service.DeleteCurrency(c, id); err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[any]{
		Message: "Currency deleted successfully.",
	})
}

// Categories Handlers

func (cc *CatalogController) ListCategories(c *echo.Context) error {
	filters := utils.NewPaginationFilters(c.QueryParam("page"), c.QueryParam("pageSize"), c.QueryParam("search"))
	data, totalCount, err := cc.service.ListCategories(c, filters)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[[]catalogcontracts.Category]{
		Data:       data,
		Page:       filters.Page,
		PageSize:   filters.PageSize,
		TotalCount: totalCount,
	})
}

func (cc *CatalogController) GetCategory(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid category ID",
		})
	}

	category, err := cc.service.GetCategory(c, id)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[catalogcontracts.Category]{
		Data: *category,
	})
}

func (cc *CatalogController) CreateCategory(c *echo.Context) error {
	var req catalogcontracts.CategoryRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	category, err := cc.service.CreateCategory(c, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, contracts.APIResponse[catalogcontracts.Category]{
		Message: "Category created successfully.",
		Data:    *category,
	})
}

func (cc *CatalogController) UpdateCategory(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid category ID",
		})
	}

	var req catalogcontracts.CategoryRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	category, err := cc.service.UpdateCategory(c, id, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[catalogcontracts.Category]{
		Message: "Category updated successfully.",
		Data:    *category,
	})
}

func (cc *CatalogController) DeleteCategory(c *echo.Context) error {
	id, err := utils.ParsePositiveInt16(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Invalid category ID",
		})
	}

	if err := cc.service.DeleteCategory(c, id); err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[any]{
		Message: "Category deleted successfully.",
	})
}
