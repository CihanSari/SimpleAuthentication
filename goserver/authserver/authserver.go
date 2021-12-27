package authserver

import (
	"authconfig"
	"log"
	"net"
	"net/http"
)

func RunHttp() {
	serverConfig := authconfig.GetServerConfig()
	listenAddr := net.JoinHostPort(serverConfig.Host, serverConfig.Port)
	s := http.Server{
		Addr:    listenAddr,
		Handler: nil,
		// Handler: router.NewRouter(),
	}
	log.Printf("Starting HTTP listener at %s\n", listenAddr)
	if err := s.ListenAndServe(); err != nil {
		log.Fatal(err)
	}

}
