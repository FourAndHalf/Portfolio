package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/portfolio/backend/database"
	"github.com/portfolio/backend/models"
)

type CRMHandler struct{}

func (h *CRMHandler) GetContacts(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var contacts []models.Contact
	if err := database.DB.Where("user_id = ?", userID).Find(&contacts).Error; err != nil {
		http.Error(w, "Failed to fetch contacts", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(contacts)
}

func (h *CRMHandler) AddContact(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var contact models.Contact
	if err := json.NewDecoder(r.Body).Decode(&contact); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}
	contact.UserID = userID
	if err := database.DB.Create(&contact).Error; err != nil {
		http.Error(w, "Failed to create contact", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(contact)
}
