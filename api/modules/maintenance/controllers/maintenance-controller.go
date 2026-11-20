package maintenancecontrollers

import (
	"net/http"

	"github.com/eriickz/one-vehicle/api/internal/contracts"
	"github.com/eriickz/one-vehicle/api/internal/utils"
	maintenancecontracts "github.com/eriickz/one-vehicle/api/modules/maintenance/contracts"
	"github.com/labstack/echo/v5"
)

type MaintenanceController struct {
	service maintenancecontracts.IMaintenanceService
}

func NewMaintenanceController(service maintenancecontracts.IMaintenanceService) *MaintenanceController {
	return &MaintenanceController{service: service}
}

func (mc *MaintenanceController) ListLogs(c *echo.Context) error {
	baseFilters := utils.NewPaginationFilters(c.QueryParam("page"), c.QueryParam("pageSize"), c.QueryParam("search"))

	var categoryID int16
	if c.QueryParam("categoryId") != "" {
		if cid, err := utils.ParsePositiveInt16(c.QueryParam("categoryId")); err == nil {
			categoryID = cid
		}
	}

	filters := maintenancecontracts.MaintenanceLogFilters{
		PaginationFilters: baseFilters,
		VehicleID:         c.QueryParam("vehicleId"),
		CategoryID:        categoryID,
	}

	data, totalCount, err := mc.service.ListLogs(c, filters)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[[]maintenancecontracts.MaintenanceLog]{
		Data:       data,
		Page:       filters.Page,
		PageSize:   filters.PageSize,
		TotalCount: totalCount,
	})
}

func (mc *MaintenanceController) GetLog(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Maintenance log ID is required",
		})
	}

	log, err := mc.service.GetLog(c, id)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: "Maintenance log not found",
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[maintenancecontracts.MaintenanceLog]{
		Data: *log,
	})
}

func (mc *MaintenanceController) CreateLog(c *echo.Context) error {
	var req maintenancecontracts.MaintenanceLogRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	log, err := mc.service.CreateLog(c, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, contracts.APIResponse[maintenancecontracts.MaintenanceLog]{
		Message: "Maintenance log created successfully.",
		Data:    *log,
	})
}

func (mc *MaintenanceController) UpdateLog(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Maintenance log ID is required",
		})
	}

	var req maintenancecontracts.MaintenanceLogRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	log, err := mc.service.UpdateLog(c, id, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[maintenancecontracts.MaintenanceLog]{
		Message: "Maintenance log updated successfully.",
		Data:    *log,
	})
}

func (mc *MaintenanceController) DeleteLog(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Maintenance log ID is required",
		})
	}

	if err := mc.service.DeleteLog(c, id); err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[any]{
		Message: "Maintenance log deleted successfully.",
	})
}
