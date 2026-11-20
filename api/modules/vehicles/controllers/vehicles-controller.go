package vehiclescontrollers

import (
	"net/http"

	"github.com/eriickz/one-vehicle/api/internal/contracts"
	"github.com/eriickz/one-vehicle/api/internal/utils"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/labstack/echo/v5"
)

type VehiclesController struct {
	service vehiclescontracts.IVehiclesService
}

func NewVehiclesController(service vehiclescontracts.IVehiclesService) *VehiclesController {
	return &VehiclesController{service: service}
}

func (vc *VehiclesController) ListVehicles(c *echo.Context) error {
	filters := utils.NewPaginationFilters(c.QueryParam("page"), c.QueryParam("pageSize"), c.QueryParam("search"))
	data, totalCount, err := vc.service.ListVehicles(c, filters)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[[]vehiclescontracts.Vehicle]{
		Data:       data,
		Page:       filters.Page,
		PageSize:   filters.PageSize,
		TotalCount: totalCount,
	})
}

func (vc *VehiclesController) GetVehicle(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Vehicle ID is required",
		})
	}

	vehicle, err := vc.service.GetVehicle(c, id)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: "Vehicle not found",
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[vehiclescontracts.Vehicle]{
		Data: *vehicle,
	})
}

func (vc *VehiclesController) GetVehicleMetrics(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Vehicle ID is required",
		})
	}

	metrics, err := vc.service.GetVehicleMetrics(c, id)
	if err != nil {
		return c.JSON(http.StatusNotFound, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[vehiclescontracts.VehicleMetricsResponse]{
		Data: *metrics,
	})
}

func (vc *VehiclesController) CreateVehicle(c *echo.Context) error {
	var req vehiclescontracts.VehicleRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	vehicle, err := vc.service.CreateVehicle(c, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, contracts.APIResponse[vehiclescontracts.Vehicle]{
		Message: "Vehicle created successfully.",
		Data:    *vehicle,
	})
}

func (vc *VehiclesController) UpdateVehicle(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Vehicle ID is required",
		})
	}

	var req vehiclescontracts.VehicleRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Malformed request payload",
		})
	}

	vehicle, err := vc.service.UpdateVehicle(c, id, req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[vehiclescontracts.Vehicle]{
		Message: "Vehicle updated successfully.",
		Data:    *vehicle,
	})
}

func (vc *VehiclesController) DeleteVehicle(c *echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, contracts.APIResponse[any]{
			Message: "Vehicle ID is required",
		})
	}

	if err := vc.service.DeleteVehicle(c, id); err != nil {
		return c.JSON(http.StatusInternalServerError, contracts.APIResponse[any]{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, contracts.APIResponse[any]{
		Message: "Vehicle deleted successfully.",
	})
}
