package authconfig

import (
	"os"
)

type DatabaseConfig struct {
	Port string
	Host string
	Name string
	User string
}

const defaultDBPort string = "26257"
const defaultDBHost string = "localhost"
const defaultDBName string = "auth"
const defaultDBUser string = "authUser"

var databaseConfig DatabaseConfig

func GetDatabaseConfig() *DatabaseConfig {
	// Check if the port value is set to determine initialization
	if databaseConfig.Port == "" {
		// Lookup & set PORT
		if val, present := os.LookupEnv("DB_PORT"); present {
			databaseConfig.Port = val
		} else {
			databaseConfig.Port = defaultDBPort
		}

		// Lookup & set HOST
		if val, present := os.LookupEnv("DB_HOST"); present {
			databaseConfig.Host = val
		} else {
			databaseConfig.Host = defaultDBHost
		}

		// Lookup & set Name
		if val, present := os.LookupEnv("DB_NAME"); present {
			databaseConfig.Name = val
		} else {
			databaseConfig.Name = defaultDBName
		}

		// Lookup & set User
		if val, present := os.LookupEnv("DB_User"); present {
			databaseConfig.User = val
		} else {
			databaseConfig.User = defaultDBUser
		}
	}
	return &databaseConfig
}
