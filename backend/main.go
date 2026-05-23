package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/portfolio/backend/config"
	"github.com/portfolio/backend/database"
	"github.com/portfolio/backend/handlers"
	customMiddleware "github.com/portfolio/backend/middleware"
)

func main() {
	// Load Configuration - Centralized source of truth
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Critical Error: Could not load configuration: %v", err)
	}

	// Connect to PostgreSQL using config
	if err := database.ConnectPostgres(cfg); err != nil {
		log.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}

	// Connect to MongoDB using config
	if err := database.ConnectMongo(cfg); err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer database.DisconnectMongo(context.Background())

	// Handlers
	authHandler := &handlers.AuthHandler{Cfg: cfg}
	financeHandler := &handlers.FinanceHandler{}
	activityHandler := &handlers.ActivityHandler{}
	crmHandler := &handlers.CRMHandler{}
	assistantHandler := &handlers.AssistantHandler{Cfg: cfg}

	// Set up Chi Router
	r := chi.NewRouter()

	// Rate Limiter: 10 requests per second, burst of 20
	limiter := customMiddleware.NewRateLimiter(10, 20)

	// Middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(customMiddleware.CORS(cfg))
	r.Use(customMiddleware.SecureHeaders)
	r.Use(limiter.Limit)

	// Routes
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the Portfolio API"))
	})
	r.Get("/health", handlers.HealthCheck)

	// API Group
	r.Route("/api", func(r chi.Router) {
		r.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("pong"))
		})

		// Auth Routes
		r.Route("/auth", func(r chi.Router) {
			r.Post("/register", authHandler.Register)
			r.Post("/login", authHandler.Login)
			r.Post("/logout", authHandler.Logout)
			r.Get("/verify", authHandler.Verify)
		})

		// Protected Routes Group
		r.Group(func(r chi.Router) {
			r.Use(customMiddleware.AuthRequired(cfg))
			r.Get("/me", authHandler.Verify)

			// Finance Routes
			r.Route("/finance", func(r chi.Router) {
				r.Get("/assets", financeHandler.GetAssets)
				r.Post("/assets", financeHandler.AddAsset)
				r.Get("/goals", financeHandler.GetGoals)
				r.Post("/goals", financeHandler.AddGoal)
			})

			// Activity Routes
			r.Route("/activities", func(r chi.Router) {
				r.Get("/", activityHandler.GetActivities)
				r.Post("/", activityHandler.AddActivity)
			})

			// CRM Routes
			r.Route("/crm", func(r chi.Router) {
				r.Get("/contacts", crmHandler.GetContacts)
				r.Post("/contacts", crmHandler.AddContact)
			})

			// Assistant Routes
			r.Post("/assistant/ask", assistantHandler.Ask)
		})
	})

	// Server configuration
	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: r,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Starting server on port %s in %s mode", cfg.Port, cfg.Env)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Listen: %s\n", err)
		}
	}()

	// Graceful Shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
