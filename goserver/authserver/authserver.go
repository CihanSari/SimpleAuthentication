package authserver

import (
	"authconfig"
	"authrouter"
	"log"
	"net"
	"net/http"
)

// Main entry point for HTTP server backend
func RunHttp() {
	serverConfig := authconfig.GetServerConfig()
	listenAddr := net.JoinHostPort(serverConfig.Host, serverConfig.Port)
	s := http.Server{
		Addr:    listenAddr,
		Handler: authrouter.NewRouter(),
	}
	log.Printf("Starting HTTP listener at %s\n", listenAddr)
	if err := s.ListenAndServe(); err != nil {
		log.Fatal(err)
	}

}
