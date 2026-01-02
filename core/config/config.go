package config

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Config struct {
	ENV               string
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
		ENV:               os.Getenv("ENV"),
		DATABASE_HOST:     os.Getenv("DATABASE_HOST"),
		DATABASE_PORT:     os.Getenv("DATABASE_PORT"),
		DATABASE_USER:     os.Getenv("DATABASE_USER"),
		DATABASE_PASSWORD: os.Getenv("DATABASE_PASSWORD"),
		DATABASE_NAME:     os.Getenv("DATABASE_NAME"),
		PORT:              os.Getenv("PORT"),
	}

	return config, nil
}

func MustLoadConfig() *Config {
	cfg, err := Load()

	if err != nil {
		log.Fatal("Failed to load configuration:", err)
	}

	return cfg
}

func SetGinMode(env string) {
	switch env {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "staging":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}
}
