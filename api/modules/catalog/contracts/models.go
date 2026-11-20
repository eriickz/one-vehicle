package catalogcontracts

import (
	"github.com/eriickz/one-vehicle/api/internal/contracts"
	"github.com/uptrace/bun"
)

type Currency struct {
	bun.BaseModel `bun:"table:currencies"`
	contracts.EntityTimestamps
	ID     int16  `bun:",pk,autoincrement" json:"id"`
	Code   string `bun:",notnull,unique" json:"code"`
	Name   string `bun:",notnull" json:"name"`
	Symbol string `bun:",notnull" json:"symbol"`
	Active bool   `bun:",notnull,default:true" json:"active"`
}

type Category struct {
	bun.BaseModel `bun:"table:categories"`
	contracts.EntityTimestamps
	ID   int16  `bun:",pk,autoincrement" json:"id"`
	Name string `bun:",notnull,unique" json:"name"`
}
