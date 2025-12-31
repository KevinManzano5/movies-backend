package repository

import (
	"context"
	"movies-backend/core/models"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func CreateReview(pool *pgxpool.Pool, movie string, title string, rating int, reviewText string) (*models.Review, error) {
	var ctx context.Context
	var cancel context.CancelFunc

	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	var query string = `
			INSERT INTO reviews (movie, title, rating, review)
			VALUES ($1, $2, $3, $4)
			RETURNING id, movie, title, rating, review, created_at, updated_at
	`

	var review models.Review

	var err error = pool.QueryRow(ctx, query, movie, title, rating, reviewText).Scan(
		&review.Id,
		&review.Movie,
		&review.Title,
		&review.Rating,
		&review.Review,
		&review.CreatedAt,
		&review.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &review, nil
}

func GetReviews(pool *pgxpool.Pool) ([]models.Review, error) {
	var ctx context.Context
	var cancel context.CancelFunc

	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	var query string = `
		SELECT id, movie, title, rating, review, created_at, updated_at
		FROM reviews
		ORDER BY created_at DESC
	`

	var rows, err = pool.Query(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var reviews []models.Review = []models.Review{}

	for rows.Next() {
		var review models.Review

		err := rows.Scan(
			&review.Id,
			&review.Movie,
			&review.Title,
			&review.Rating,
			&review.Review,
			&review.CreatedAt,
			&review.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		reviews = append(reviews, review)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return reviews, nil
}
