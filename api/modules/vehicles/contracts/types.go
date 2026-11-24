package vehiclescontracts

import (
	"github.com/shopspring/decimal"
)

type VehicleRequest struct {
	CurrencyID     int16  `json:"currencyId" validate:"required"`
	Make           string `json:"make" validate:"required,min=1,max=100"`
	Model          string `json:"model" validate:"required,min=1,max=100"`
	Year           int    `json:"year" validate:"required,min=1900,max=2100"`
	LicensePlate   string `json:"licensePlate" validate:"required,min=1,max=20"`
	InitialMileage int    `json:"initialMileage" validate:"min=0"`
}

type VehicleMetricsResponse struct {
	VehicleID      string          `json:"vehicleId"`
	CurrentMileage int             `json:"currentMileage"`
	TotalExpenses  decimal.Decimal `json:"totalExpenses"`
	TotalLogsCount int             `json:"totalLogsCount"`
}
