package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/portfolio/backend/database"
	"github.com/portfolio/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ActivityHandler struct{}

func (h *ActivityHandler) GetActivities(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	collection := database.MongoDB.Collection("activities")

	filter := bson.M{"user_id": userID}
	cursor, err := collection.Find(r.Context(), filter)
	if err != nil {
		http.Error(w, "Failed to fetch activities", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(r.Context())

	var activities []models.Activity
	if err := cursor.All(r.Context(), &activities); err != nil {
		http.Error(w, "Failed to decode activities", http.StatusInternalServerError)
		return
	}

	if activities == nil {
		activities = []models.Activity{}
	}

	json.NewEncoder(w).Encode(activities)
}

func (h *ActivityHandler) AddActivity(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	collection := database.MongoDB.Collection("activities")

	var activity models.Activity
	if err := json.NewDecoder(r.Body).Decode(&activity); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	activity.ID = primitive.NewObjectID()
	activity.UserID = userID
	activity.CreatedAt = time.Now()

	_, err := collection.InsertOne(r.Context(), activity)
	if err != nil {
		http.Error(w, "Failed to create activity", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(activity)
}
