package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/portfolio/backend/database"
)

// HealthResponse represents the API health status
type HealthResponse struct {
	Status   string `json:"status"`
	Postgres string `json:"postgres"`
	MongoDB  string `json:"mongodb"`
}

// HealthCheck handler returns the status of the API and its dependencies
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	pgStatus := "up"
	if database.DB == nil {
		pgStatus = "down"
	} else {
		sqlDB, err := database.DB.DB()
		if err != nil || sqlDB.Ping() != nil {
			pgStatus = "down"
		}
	}

	mongoStatus := "up"
	if database.MongoClient == nil {
		mongoStatus = "down"
	} else {
		if database.MongoClient.Ping(r.Context(), nil) != nil {
			mongoStatus = "down"
		}
	}

	overallStatus := "ok"
	if pgStatus == "down" || mongoStatus == "down" {
		overallStatus = "degraded"
		w.WriteHeader(http.StatusServiceUnavailable)
	} else {
		w.WriteHeader(http.StatusOK)
	}

	resp := HealthResponse{
		Status:   overallStatus,
		Postgres: pgStatus,
		MongoDB:  mongoStatus,
	}

	json.NewEncoder(w).Encode(resp)
}
