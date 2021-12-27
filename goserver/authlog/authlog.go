package authlog

import (
	auth_config "authconfig"
	"log"
	"path/filepath"

	"gopkg.in/natefinch/lumberjack.v2"
)

func InitLogger() {
	serverConfig := auth_config.GetServerConfig()
	log.SetOutput(&lumberjack.Logger{
		Filename:   filepath.Join(serverConfig.LOG_PATH, "logs.txt"),
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28,   //days
		Compress:   true, // disabled by default
	})
}
