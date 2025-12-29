package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GIN_MODE     string
	DATABASE_URL string
	PORT         string
}

func Load() (*Config, error) {
	var err error = godotenv.Load()

	if err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	var config *Config = &Config{
		GIN_MODE:     os.Getenv("GIN_MODE"),
		DATABASE_URL: os.Getenv("DATABASE_URL"),
		PORT:         os.Getenv("PORT"),
	}

	return config, nil
}
