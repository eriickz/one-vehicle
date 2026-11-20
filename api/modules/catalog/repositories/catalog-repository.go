package catalogrepositories

import (
	"context"

	"github.com/eriickz/one-vehicle/api/internal/utils"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	"github.com/uptrace/bun"
)

type CatalogRepository struct {
	db *bun.DB
}

func NewCatalogRepository(db *bun.DB) *CatalogRepository {
	return &CatalogRepository{db: db}
}

var _ catalogcontracts.ICatalogRepository = (*CatalogRepository)(nil)

func (repo *CatalogRepository) GetCurrencies(ctx context.Context) ([]catalogcontracts.Currency, error) {
	var results []catalogcontracts.Currency
	err := repo.db.NewSelect().Model(&results).Where("active = true").Order("id ASC").Scan(ctx)
	return results, err
}

func (repo *CatalogRepository) ListCurrencies(ctx context.Context, filters utils.PaginationFilters) ([]catalogcontracts.Currency, int, error) {
	currencies := make([]catalogcontracts.Currency, 0)

	baseQuery := func() *bun.SelectQuery {
		q := repo.db.NewSelect().Model((*catalogcontracts.Currency)(nil))

		if filters.Search != "" {
			searchPattern := "%" + filters.Search + "%"
			q.Where("name ILIKE ? OR code ILIKE ? OR symbol ILIKE ?", searchPattern, searchPattern, searchPattern)
		}

		return q
	}

	total, err := baseQuery().Count(ctx)
	if err != nil {
		return nil, 0, err
	}

	err = baseQuery().
		Order("id ASC").
		Limit(int64(filters.PageSize)).
		Offset(int64(filters.Offset())).
		Scan(ctx, &currencies)
	if err != nil {
		return nil, 0, err
	}

	return currencies, int(total), nil
}

func (repo *CatalogRepository) GetCurrency(ctx context.Context, id int16) (*catalogcontracts.Currency, error) {
	currency := new(catalogcontracts.Currency)
	err := repo.db.NewSelect().Model(currency).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return currency, nil
}

func (repo *CatalogRepository) CreateCurrency(ctx context.Context, req catalogcontracts.CurrencyRequest) (*catalogcontracts.Currency, error) {
	active := true
	if req.Active != nil {
		active = *req.Active
	}

	currency := &catalogcontracts.Currency{
		Name:   req.Name,
		Code:   req.Code,
		Symbol: req.Symbol,
		Active: active,
	}

	_, err := repo.db.NewInsert().Model(currency).Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return currency, nil
}

func (repo *CatalogRepository) UpdateCurrency(ctx context.Context, id int16, req catalogcontracts.CurrencyRequest) (*catalogcontracts.Currency, error) {
	currency, err := repo.GetCurrency(ctx, id)
	if err != nil {
		return nil, err
	}

	currency.Name = req.Name
	currency.Code = req.Code
	currency.Symbol = req.Symbol
	if req.Active != nil {
		currency.Active = *req.Active
	}

	_, err = repo.db.NewUpdate().Model(currency).WherePK().Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return currency, nil
}

func (repo *CatalogRepository) DeleteCurrency(ctx context.Context, id int16) error {
	_, err := repo.db.NewDelete().Model((*catalogcontracts.Currency)(nil)).Where("id = ?", id).Exec(ctx)
	return err
}

func (repo *CatalogRepository) GetCategories(ctx context.Context) ([]catalogcontracts.Category, error) {
	var results []catalogcontracts.Category
	err := repo.db.NewSelect().Model(&results).Order("name ASC").Scan(ctx)
	return results, err
}

func (repo *CatalogRepository) ListCategories(ctx context.Context, filters utils.PaginationFilters) ([]catalogcontracts.Category, int, error) {
	categories := make([]catalogcontracts.Category, 0)

	baseQuery := func() *bun.SelectQuery {
		q := repo.db.NewSelect().Model((*catalogcontracts.Category)(nil))

		if filters.Search != "" {
			searchPattern := "%" + filters.Search + "%"
			q.Where("name ILIKE ?", searchPattern)
		}

		return q
	}

	total, err := baseQuery().Count(ctx)
	if err != nil {
		return nil, 0, err
	}

	err = baseQuery().
		Order("id ASC").
		Limit(int64(filters.PageSize)).
		Offset(int64(filters.Offset())).
		Scan(ctx, &categories)
	if err != nil {
		return nil, 0, err
	}

	return categories, int(total), nil
}

func (repo *CatalogRepository) GetCategory(ctx context.Context, id int16) (*catalogcontracts.Category, error) {
	category := new(catalogcontracts.Category)
	err := repo.db.NewSelect().Model(category).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (repo *CatalogRepository) CreateCategory(ctx context.Context, req catalogcontracts.CategoryRequest) (*catalogcontracts.Category, error) {
	category := &catalogcontracts.Category{
		Name: req.Name,
	}

	_, err := repo.db.NewInsert().Model(category).Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (repo *CatalogRepository) UpdateCategory(ctx context.Context, id int16, req catalogcontracts.CategoryRequest) (*catalogcontracts.Category, error) {
	category, err := repo.GetCategory(ctx, id)
	if err != nil {
		return nil, err
	}

	category.Name = req.Name

	_, err = repo.db.NewUpdate().Model(category).WherePK().Returning("*").Exec(ctx)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (repo *CatalogRepository) DeleteCategory(ctx context.Context, id int16) error {
	_, err := repo.db.NewDelete().Model((*catalogcontracts.Category)(nil)).Where("id = ?", id).Exec(ctx)
	return err
}
