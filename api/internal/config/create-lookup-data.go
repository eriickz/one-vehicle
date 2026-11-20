package config

import (
	"context"

	"github.com/eriickz/one-vehicle/api/internal/contracts"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	"github.com/uptrace/bun"
)

func SeedLookupData(ctx context.Context, dbClient *bun.DB) error {
	return seedCurrencies(ctx, dbClient)
}

func seedCurrencies(ctx context.Context, dbClient *bun.DB) error {
	exists, err := dbClient.NewSelect().
		Model((*catalogcontracts.Currency)(nil)).
		Exists(ctx)
	if err != nil || exists {
		return err
	}

	currencies := []*catalogcontracts.Currency{
		{
			Code:   contracts.CURRENCY_USD,
			Name:   "US Dollar",
			Symbol: "$",
			Active: true,
		},
		{
			Code:   contracts.CURRENCY_EUR,
			Name:   "Euro",
			Symbol: "€",
			Active: true,
		},
		{
			Code:   contracts.CURRENCY_GBP,
			Name:   "British Pound",
			Symbol: "£",
			Active: true,
		},
		{
			Code:   contracts.CURRENCY_CAD,
			Name:   "Canadian Dollar",
			Symbol: "CA$",
			Active: true,
		},
		{
			Code:   contracts.CURRENCY_DOP,
			Name:   "Dominican Peso",
			Symbol: "RD$",
			Active: true,
		},
	}

	_, err = dbClient.NewInsert().Model(&currencies).Exec(ctx)
	return err
}
