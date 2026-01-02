package main

import (
	"context"
	"log"
	"movies-backend/core/config"
	"movies-backend/core/database"
	"movies-backend/core/router"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	cfg := config.MustLoadConfig()

	config.SetGinMode(cfg.ENV)

	pool := database.MustConnectDatabase(cfg)

	defer pool.Close()

	router := router.SetupRouter(pool)

	server := &http.Server{
		Addr:    ":" + cfg.PORT,
		Handler: router,
	}

	go func() {
		log.Printf("🚀 Server running on port %s\n", cfg.PORT)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server error:", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit
	log.Println("🛑 Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("✅ Server exited cleanly")

}
