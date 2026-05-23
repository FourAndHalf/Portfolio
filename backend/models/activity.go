package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Activity struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID    uint               `bson:"user_id" json:"userId"`
	Title     string             `bson:"title" json:"title"`
	Content   string             `bson:"content" json:"content"`
	Type      string             `bson:"type" json:"type"` // e.g., "JOURNAL", "LOG", "TASK"
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	Tags      []string           `bson:"tags" json:"tags"`
}
