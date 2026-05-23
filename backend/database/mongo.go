package database

import (
	"context"
	"log"
	"time"

	"github.com/portfolio/backend/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var MongoClient *mongo.Client
var MongoDB *mongo.Database

// ConnectMongo establishes a connection to the MongoDB database using the provided config
func ConnectMongo(cfg *config.Config) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.MongoURI))
	if err != nil {
		return err
	}

	// Ping the database
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return err
	}

	log.Printf("Successfully connected to MongoDB (%s)", cfg.MongoDB)
	MongoClient = client
	MongoDB = client.Database(cfg.MongoDB)

	return nil
}

// GetMongo returns the MongoDB database instance
func GetMongo() *mongo.Database {
	return MongoDB
}

// DisconnectMongo safely disconnects from MongoDB
func DisconnectMongo(ctx context.Context) error {
	if MongoClient != nil {
		return MongoClient.Disconnect(ctx)
	}
	return nil
}
