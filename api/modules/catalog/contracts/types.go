package catalogcontracts

type CurrencyRequest struct {
	Name   string `json:"name" validate:"required"`
	Code   string `json:"code" validate:"required"`
	Symbol string `json:"symbol" validate:"required"`
	Active *bool  `json:"active"`
}

type CategoryRequest struct {
	Name  string `json:"name" validate:"required,min=2,max=50"`
	Color string `json:"color"`
	Icon  string `json:"icon"`
}
