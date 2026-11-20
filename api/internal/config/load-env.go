package config

import (
	"os"

	"github.com/caarlos0/env/v11"
	"github.com/eriickz/one-vehicle/api/internal/contracts"
	"github.com/joho/godotenv"
)

func LoadEnv() (contracts.Environment, error) {
	var envVars contracts.Environment

	if os.Getenv("APP_ENV") == "dev" || os.Getenv("APP_ENV") == "" {
		_ = godotenv.Load()
	}

	if err := env.Parse(&envVars); err != nil {
		return contracts.Environment{}, err
	}

	return envVars, nil
}
