package utils

import (
	"github.com/eriickz/one-vehicle/api/internal/contracts"
)

type PaginationFilters struct {
	Page     int    `query:"page" json:"page"`
	PageSize int    `query:"pageSize" json:"pageSize"`
	Search   string `query:"search" json:"search"`
}

func (p *PaginationFilters) Normalize() {
	if p.Page <= 0 {
		p.Page = 1
	}

	if p.PageSize <= 0 {
		p.PageSize = contracts.DEFAULT_PAGE_SIZE
	}
}

func (p *PaginationFilters) Offset() int {
	return (p.Page - 1) * p.PageSize
}

func NewPaginationFilters(pageStr, pageSizeStr, search string) PaginationFilters {
	filters := PaginationFilters{
		Page:     1,
		PageSize: contracts.DEFAULT_PAGE_SIZE,
		Search:   search,
	}

	if pageStr != "" {
		if p, err := ParsePositiveInt(pageStr); err == nil {
			filters.Page = p
		}
	}

	if pageSizeStr != "" {
		if ps, err := ParsePositiveInt(pageSizeStr); err == nil {
			filters.PageSize = ps
		}
	}

	filters.Normalize()

	return filters
}
