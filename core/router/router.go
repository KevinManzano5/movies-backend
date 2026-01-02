package router

import (
	"movies-backend/core/handlers"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupRouter(pool *pgxpool.Pool) *gin.Engine {
	router := gin.Default()

	router.SetTrustedProxies(nil)

	router.GET("/health", handlers.HealthHandler())

	reviews := router.Group("/reviews")

	{
		reviews.POST("/", handlers.CreateReviewHandler(pool))
		reviews.GET("/", handlers.GetReviewsHandler(pool))
		reviews.GET("/:id", handlers.GetReviewHandler(pool))
		reviews.PATCH("/:id", handlers.UpdateReviewHandler(pool))
		reviews.DELETE("/:id", handlers.DeleteReviewHandler(pool))
	}

	return router
}
