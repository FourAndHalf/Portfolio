package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config holds all the configuration for the application
type Config struct {
	Port string
	Env  string

	// PostgreSQL
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	DBSslMode  string

	// MongoDB
	MongoURI string
	MongoDB  string

	// Auth & Security
	JWTSecret      string
	AllowedOrigins string
	OpenAIKey      string
}

// LoadConfig loads configuration from environment variables
func LoadConfig() (*Config, error) {
	// Load .env file if it exists (local development)
	_ = godotenv.Load()

	cfg := &Config{
		Port:       getEnv("PORT", "8080"),
		Env:        getEnv("ENV", "development"),
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5434"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "postgres"),
		DBName:     getEnv("DB_NAME", "portfolio"),
		DBSslMode:  getEnv("DB_SSLMODE", "disable"),
		MongoURI:   getEnv("MONGO_URI", "mongodb://admin:admin123@localhost:27017"),
		MongoDB:    getEnv("MONGO_DB", "portfolio_nosql"),
		JWTSecret:  getEnv("JWT_SECRET", "super-secret-key-change-me"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:3000"),
		OpenAIKey:  getEnv("OPENAI_API_KEY", ""),
	}

	// Validate critical variables for production-like environments
	if cfg.Env != "development" {
		if os.Getenv("DB_PASSWORD") == "" {
			return nil, fmt.Errorf("DB_PASSWORD environment variable is required in %s mode", cfg.Env)
		}
		if os.Getenv("MONGO_PASSWORD") != "" && os.Getenv("MONGO_URI") == "" {
			// This is just a conceptual check, often URI is provided as a whole
		}
	}

	return cfg, nil
}

// getEnv is a helper function to read an environment variable or return a default value
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
