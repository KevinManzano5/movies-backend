package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GIN_MODE          string
	DATABASE_URL      string
	DATABASE_HOST     string
	DATABASE_PORT     string
	DATABASE_USER     string
	DATABASE_PASSWORD string
	DATABASE_NAME     string
	PORT              string
}

func Load() (*Config, error) {
	if os.Getenv("ENV") != "production" {
		var err error = godotenv.Load()

		if err != nil {
			log.Println("Warning: .env file not found, using environment variables")
		}
	}

	var config *Config = &Config{
		GIN_MODE:          os.Getenv("GIN_MODE"),
		DATABASE_URL:      os.Getenv("DATABASE_URL"),
		DATABASE_HOST:     os.Getenv("DATABASE_HOST"),
		DATABASE_PORT:     os.Getenv("DATABASE_PORT"),
		DATABASE_USER:     os.Getenv("DATABASE_USER"),
		DATABASE_PASSWORD: os.Getenv("DATABASE_PASSWORD"),
		DATABASE_NAME:     os.Getenv("DATABASE_NAME"),
		PORT:              os.Getenv("PORT"),
	}

	return config, nil
}
