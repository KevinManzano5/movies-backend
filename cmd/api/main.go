package main

import (
	"log"
	"movies-backend/core/config"
	"movies-backend/core/database"
	"movies-backend/core/handlers"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	var cfg *config.Config
	var err error
	cfg, err = config.Load()

	if err != nil {
		log.Fatal("Failed to load configuration: ", err)
	}

	var pool *pgxpool.Pool

	pool, err = database.Connect(database.DatabaseCredentials{
		DATABASE_HOST:     cfg.DATABASE_HOST,
		DATABASE_PORT:     cfg.DATABASE_PORT,
		DATABASE_USER:     cfg.DATABASE_USER,
		DATABASE_PASSWORD: cfg.DATABASE_PASSWORD,
		DATABASE_NAME:     cfg.DATABASE_NAME,
	})

	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	defer pool.Close()

	switch os.Getenv("ENV") {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "staging":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}

	var router *gin.Engine = gin.Default()

	router.SetTrustedProxies(nil)

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message":  "Todo API is running!",
			"status":   "success",
			"database": "connected",
		})
	})

	router.POST("/reviews", handlers.CreateReviewHandler(pool))
	router.GET("/reviews", handlers.GetReviewsHandler(pool))
	router.GET("/reviews/:id", handlers.GetReviewHandler(pool))
	router.PATCH("/reviews/:id", handlers.UpdateReviewHandler(pool))
	router.DELETE("/reviews/:id", handlers.DeleteReviewHandler(pool))

	router.Run(":" + cfg.PORT)
}
