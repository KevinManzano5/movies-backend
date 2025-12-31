package main

import (
	"log"
	"movies-backend/core/config"
	"movies-backend/core/database"
	"movies-backend/core/handlers"

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

	pool, err = database.Connect(cfg.DATABASE_URL)

	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	defer pool.Close()

	switch cfg.GIN_MODE {
	case "release":
		gin.SetMode(gin.ReleaseMode)
	case "test":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}

	var router *gin.Engine = gin.Default()

	router.SetTrustedProxies(nil)

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message":  "Todo API is running!",
			"status":   "success",
			"database": "connected",
		})
	})

	router.POST("/reviews", handlers.CreateReviewHandler(pool))
	router.GET("/reviews", handlers.GetReviewsHandler(pool))
	router.GET("/reviews/:id", handlers.GetReviewHandler(pool))

	router.Run(":" + cfg.PORT)
}
