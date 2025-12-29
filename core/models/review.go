package models

import (
	"time"

	"github.com/google/uuid"
)

type Review struct {
	Id        uuid.UUID `json:"id" db:"id"`
	Movie     string    `json:"movie" db:"movie"`
	Title     string    `json:"title" db:"title"`
	Rating    int       `json:"rating" db:"rating"`
	Review    string    `json:"review" db:"review"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}
