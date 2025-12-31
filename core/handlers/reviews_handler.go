package handlers

import (
	"movies-backend/core/repository"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CreateReviewInput struct {
	Movie  string `json:"movie" binding:"required"`
	Title  string `json:"title" binding:"required"`
	Rating int    `json:"rating" binding:"required,min=1,max=5"`
	Review string `json:"review" binding:"required"`
}

func CreateReviewHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input CreateReviewInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		review, err := repository.CreateReview(pool, input.Movie, input.Title, input.Rating, input.Review)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusCreated, review)
	}
}

func GetReviewsHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		reviews, err := repository.GetReviews(pool)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, reviews)
	}
}
