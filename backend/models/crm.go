package models

import (
	"time"

	"gorm.io/gorm"
)

type Contact struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	UserID    uint           `gorm:"not null" json:"userId"`
	Name      string         `gorm:"not null" json:"name"`
	Title     string         `json:"title"`
	Company   string         `json:"company"`
	Email     string         `json:"email"`
	Phone     string         `json:"phone"`
	Context   string         `gorm:"type:text" json:"context"` // How we met, why they are important
	LastMet   time.Time      `json:"lastMet"`
}

type Interaction struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	ContactID uint           `gorm:"not null" json:"contactId"`
	Type      string         `json:"type"` // e.g., "MEETING", "CALL", "EMAIL"
	Summary   string         `gorm:"type:text" json:"summary"`
}
