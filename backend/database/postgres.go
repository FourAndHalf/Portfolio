package database

import (
	"fmt"
	"log"

	"github.com/portfolio/backend/config"
	"github.com/portfolio/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// ConnectPostgres establishes a connection to the PostgreSQL database using the provided config
func ConnectPostgres(cfg *config.Config) error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort, cfg.DBSslMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return err
	}

	log.Printf("Successfully connected to PostgreSQL at %s:%s", cfg.DBHost, cfg.DBPort)
	DB = db

	// Auto Migrate models
	if err := db.AutoMigrate(&models.User{}, &models.FinancialAsset{}, &models.FinancialGoal{}, &models.Contact{}, &models.Interaction{}); err != nil {
		return fmt.Errorf("failed to auto-migrate: %v", err)
	}

	return nil
}
