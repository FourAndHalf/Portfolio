package models

import (
	"time"

	"gorm.io/gorm"
)

type AssetType string

const (
	AssetCash      AssetType = "CASH"
	AssetStock     AssetType = "STOCK"
	AssetCrypto    AssetType = "CRYPTO"
	AssetRealEstate AssetType = "REAL_ESTATE"
)

type FinancialAsset struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	UserID    uint           `gorm:"not null" json:"userId"`
	Name      string         `gorm:"not null" json:"name"`
	Type      AssetType      `gorm:"not null" json:"type"`
	Value     float64        `gorm:"not null" json:"value"`
	Currency  string         `gorm:"not null;default:'USD'" json:"currency"`
}

type FinancialGoal struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	UserID      uint           `gorm:"not null" json:"userId"`
	Title       string         `gorm:"not null" json:"title"`
	TargetValue float64        `gorm:"not null" json:"targetValue"`
	CurrentValue float64       `gorm:"not null;default:0" json:"currentValue"`
	Deadline    time.Time      `json:"deadline"`
}
