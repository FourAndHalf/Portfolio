package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/portfolio/backend/database"
	"github.com/portfolio/backend/models"
)

type FinanceHandler struct{}

func (h *FinanceHandler) GetAssets(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var assets []models.FinancialAsset
	if err := database.DB.Where("user_id = ?", userID).Find(&assets).Error; err != nil {
		http.Error(w, "Failed to fetch assets", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(assets)
}

func (h *FinanceHandler) AddAsset(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var asset models.FinancialAsset
	if err := json.NewDecoder(r.Body).Decode(&asset); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}
	asset.UserID = userID
	if err := database.DB.Create(&asset).Error; err != nil {
		http.Error(w, "Failed to create asset", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(asset)
}

func (h *FinanceHandler) GetGoals(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var goals []models.FinancialGoal
	if err := database.DB.Where("user_id = ?", userID).Find(&goals).Error; err != nil {
		http.Error(w, "Failed to fetch goals", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(goals)
}

func (h *FinanceHandler) AddGoal(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var goal models.FinancialGoal
	if err := json.NewDecoder(r.Body).Decode(&goal); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}
	goal.UserID = userID
	if err := database.DB.Create(&goal).Error; err != nil {
		http.Error(w, "Failed to create goal", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(goal)
}
