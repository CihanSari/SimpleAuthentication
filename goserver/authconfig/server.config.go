package authconfig

import (
	"os"
)

type ServerConfig struct {
	Port    string
	Host    string
	LogPath string
}

const defaultPort string = "4000"
const defaultHost string = ""
const defaultLogPath string = "volumes/server/log"

var serverConfig ServerConfig

func GetServerConfig() *ServerConfig {
	// Check if the port value is set to determine initialization
	if serverConfig.Port == "" {
		// Lookup & set PORT
		if val, present := os.LookupEnv("PORT"); present {
			serverConfig.Port = val
		} else {
			serverConfig.Port = defaultPort
		}

		// Lookup & set HOST
		if val, present := os.LookupEnv("HOST"); present {
			serverConfig.Host = val
		} else {
			serverConfig.Host = defaultHost
		}

		// Lookup & set LOG_PATH
		if val, present := os.LookupEnv("LOG_PATH"); present {
			serverConfig.LogPath = val
		} else {
			serverConfig.LogPath = defaultLogPath
		}
	}
	return &serverConfig
}
