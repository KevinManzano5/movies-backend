package handlers

import (
	"movies-backend/core/repository"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CreateReviewInput struct {
	Movie  string `json:"movie" binding:"required"`
	Title  string `json:"title" binding:"required"`
	Rating int    `json:"rating" binding:"required,min=1,max=5"`
	Review string `json:"review" binding:"required"`
}

type UpdateReviewInput struct {
	Movie  *string `json:"movie"`
	Title  *string `json:"title"`
	Rating *int    `json:"rating"`
	Review *string `json:"review"`
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

func GetReviewHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		idString := c.Param("id")

		id, err := uuid.Parse(idString)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Review id invalid",
			})

			return
		}

		review, err := repository.GetReview(pool, id)

		if err != nil {
			if err == pgx.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "Review not found",
				})

				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"review": review,
		})
	}
}

func UpdateReviewHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		idString := c.Param("id")

		id, err := uuid.Parse(idString)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid review id",
			})

			return
		}

		var input UpdateReviewInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if input.Movie == nil && input.Title == nil && input.Rating == nil && input.Review == nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "At least one field must be provided to update",
			})

			return
		}

		review, err := repository.UpdateReview(pool, id, input.Movie, input.Title, input.Rating, input.Review)

		if err != nil {
			if err == pgx.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "Review not found",
				})

				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"review": review,
		})
	}
}

func DeleteReviewHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		idString := c.Param("id")

		id, err := uuid.Parse(idString)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid review id",
			})

			return
		}

		err = repository.DeleteReview(pool, id)

		if err != nil {
			if err.Error() == "Review with id "+idString+" not found" {
				c.JSON(http.StatusNotFound, gin.H{
					"error": err.Error(),
				})

				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusNoContent, gin.H{})
	}
}
