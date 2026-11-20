package maintenancecontracts

import (
	"github.com/eriickz/one-vehicle/api/internal/utils"
	"github.com/shopspring/decimal"
)

type MaintenanceLogRequest struct {
	VehicleID  string          `json:"vehicleId" validate:"required"`
	CategoryID *int16          `json:"categoryId"`
	Date       string          `json:"date" validate:"required"`
	Mileage    int             `json:"mileage" validate:"min=0"`
	Title      string          `json:"title" validate:"required,min=2,max=200"`
	Cost       decimal.Decimal `json:"cost" validate:"required"`
	Notes      *string         `json:"notes"`
}

type MaintenanceLogFilters struct {
	utils.PaginationFilters
	VehicleID  string `query:"vehicleId" json:"vehicleId"`
	CategoryID int16  `query:"categoryId" json:"categoryId"`
}
