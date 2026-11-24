package vehiclescontracts

import (
	"github.com/eriickz/one-vehicle/api/internal/contracts"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	"github.com/uptrace/bun"
)

type Vehicle struct {
	bun.BaseModel `bun:"table:vehicles"`
	contracts.EntityTimestamps
	ID             string                     `bun:",pk,type:uuid" json:"id"`
	CurrencyID     int16                      `bun:",notnull" json:"currencyId"`
	Make           string                     `bun:",notnull" json:"make"`
	Model          string                     `bun:",notnull" json:"model"`
	Year           int                        `bun:",notnull" json:"year"`
	LicensePlate   string                     `bun:",notnull" json:"licensePlate"`
	InitialMileage int                        `bun:",notnull,default:0" json:"initialMileage"`
	IsActive       bool                       `bun:",notnull,default:false" json:"isActive"`
	Currency       *catalogcontracts.Currency `bun:"rel:has-one,join:currency_id=id" json:"currency"`
}
