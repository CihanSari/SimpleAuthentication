package authconfig

import (
	"log"
	"os"
	"strconv"
)

type ServerConfig struct {
	PORT     int
	URL      string
	LOG_PATH string
}

var defaultPort int = 4000
var defaultURL string = "localhost:4000"
var defaultLogPath string = "volumes/server/log"

var serverConfig ServerConfig

func GetServerConfig() *ServerConfig {
	// Check if the port value is set to determine initialization
	if serverConfig.PORT == 0 {
		// Lookup & set PORT
		if val, present := os.LookupEnv("PORT"); present {
			portStr, err := strconv.Atoi(val)
			if err != nil {
				serverConfig.PORT = portStr
			} else {
				log.Printf("Failed to parse PORT environmental variable into integer: %v. Using default value %d.\n", err, defaultPort)
				serverConfig.PORT = defaultPort
			}
		} else {
			serverConfig.PORT = defaultPort
		}

		// Lookup & set URL
		if val, present := os.LookupEnv("URL"); present {
			serverConfig.URL = val
		} else {
			serverConfig.URL = defaultURL
		}

		// Lookup & set URL
		if val, present := os.LookupEnv("LOG_PATH"); present {
			serverConfig.LOG_PATH = val
		} else {
			serverConfig.LOG_PATH = defaultLogPath
		}
	}
	return &serverConfig
}
