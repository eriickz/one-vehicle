package maintenancecontracts

import (
	"time"

	"github.com/eriickz/one-vehicle/api/internal/contracts"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/shopspring/decimal"
	"github.com/uptrace/bun"
)

type MaintenanceLog struct {
	bun.BaseModel `bun:"table:maintenance_logs"`
	contracts.EntityTimestamps
	ID         string                     `bun:",pk,type:uuid" json:"id"`
	VehicleID  string                     `bun:",notnull,type:uuid" json:"vehicleId"`
	CategoryID *int16                     `bun:",nullzero" json:"categoryId"`
	Date       time.Time                  `bun:",notnull" json:"date"`
	Mileage    int                        `bun:",notnull" json:"mileage"`
	Title      string                     `bun:",notnull" json:"title"`
	Cost       decimal.Decimal            `bun:",notnull,type:numeric(12,2)" json:"cost"`
	Notes      *string                    `bun:",nullzero" json:"notes"`
	Vehicle    *vehiclescontracts.Vehicle `bun:"rel:has-one,join:vehicle_id=id" json:"vehicle"`
	Category   *catalogcontracts.Category `bun:"rel:has-one,join:category_id=id" json:"category"`
}
