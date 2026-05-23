package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/portfolio/backend/config"
	"github.com/portfolio/backend/database"
	"github.com/portfolio/backend/models"
)

type AssistantHandler struct {
	Cfg *config.Config
}

type AssistantRequest struct {
	Prompt string `json:"prompt"`
}

type AssistantResponse struct {
	Reply string `json:"reply"`
}

func (h *AssistantHandler) Ask(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	var req AssistantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	// 1. Gather Context
	var assets []models.FinancialAsset
	database.DB.Where("user_id = ?", userID).Find(&assets)
	
	var contacts []models.Contact
	database.DB.Where("user_id = ?", userID).Find(&contacts)

	contextStr := fmt.Sprintf("User Assets: %+v\nUser Contacts: %+v\n", assets, contacts)

	// 2. Call OpenAI (simplified)
	if h.Cfg.OpenAIKey == "" {
		json.NewEncoder(w).Encode(AssistantResponse{Reply: "Assistant is in offline mode (OpenAI Key missing). Here is what I know: " + contextStr})
		return
	}

	reply, err := h.callOpenAI(req.Prompt, contextStr)
	if err != nil {
		http.Error(w, "Failed to reach AI assistant", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AssistantResponse{Reply: reply})
}

func (h *AssistantHandler) callOpenAI(prompt, context string) (string, error) {
	apiURL := "https://api.openai.com/v1/chat/completions"
	
	messages := []map[string]string{
		{"role": "system", "content": "You are a personal command center assistant. Use the following context to answer: " + context},
		{"role": "user", "content": prompt},
	}

	payload := map[string]interface{}{
		"model":    "gpt-4o",
		"messages": messages,
	}

	payloadBytes, _ := json.Marshal(payload)
	req, _ := http.NewRequest("POST", apiURL, bytes.NewBuffer(payloadBytes))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+h.Cfg.OpenAIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)

	// Extracting response (very loose error handling for brevity)
	choices := result["choices"].([]interface{})
	firstChoice := choices[0].(map[string]interface{})
	message := firstChoice["message"].(map[string]interface{})
	return message["content"].(string), nil
}
