package contracts

import "time"

type APIResponse[T any] struct {
	Message    string `json:"message,omitempty"`
	Data       T      `json:"data"`
	Page       int    `json:"page,omitempty"`
	PageSize   int    `json:"pageSize,omitempty"`
	TotalCount int    `json:"totalCount,omitempty"`
}

type EntityTimestamps struct {
	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"createdAt"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"updatedAt"`
}

type Environment struct {
	BunDebug  string `env:"BUN_DEBUG" envDefault:"0"`
	AppOrigin string `env:"APP_ORIGIN,required"`
	AppPort   string `env:"APP_PORT" envDefault:"5000"`
	AppEnv    string `env:"APP_ENV" envDefault:"prod"`
	DBURL     string `env:"DB_URL,required"`
}
