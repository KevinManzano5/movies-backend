package database

import (
	"context"
	"log"
	"movies-backend/core/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DatabaseCredentials struct {
	DATABASE_HOST     string
	DATABASE_PORT     string
	DATABASE_USER     string
	DATABASE_PASSWORD string
	DATABASE_NAME     string
}

func Connect(databaseCredentials DatabaseCredentials) (*pgxpool.Pool, error) {
	var ctx context.Context = context.Background()

	var config *pgxpool.Config
	var err error

	var connString string = "postgres://" +
		databaseCredentials.DATABASE_USER + ":" +
		databaseCredentials.DATABASE_PASSWORD + "@" +
		databaseCredentials.DATABASE_HOST + ":" +
		databaseCredentials.DATABASE_PORT + "/" +
		databaseCredentials.DATABASE_NAME + "?sslmode=disable"

	config, err = pgxpool.ParseConfig(connString)

	if err != nil {
		log.Printf("Unable to parse database credentials: %v", err)

		return nil, err
	}

	var pool *pgxpool.Pool

	pool, err = pgxpool.NewWithConfig(ctx, config)

	if err != nil {
		log.Printf("Unable to create connection pool: %v", err)

		return nil, err
	}

	err = pool.Ping(ctx)

	if err != nil {
		log.Printf("Unable to ping database: %v", err)

		pool.Close()

		return nil, err
	}

	log.Println("Successfully connected to PostgreSQL database")

	return pool, nil
}

func MustConnectDatabase(cfg *config.Config) *pgxpool.Pool {
	pool, err := Connect(DatabaseCredentials{
		DATABASE_HOST:     cfg.DATABASE_HOST,
		DATABASE_PORT:     cfg.DATABASE_PORT,
		DATABASE_USER:     cfg.DATABASE_USER,
		DATABASE_PASSWORD: cfg.DATABASE_PASSWORD,
		DATABASE_NAME:     cfg.DATABASE_NAME,
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	return pool
}
