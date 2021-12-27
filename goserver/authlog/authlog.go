package authlog

import (
	"authconfig"
	"io"
	"log"
	"os"
	"path/filepath"

	"gopkg.in/natefinch/lumberjack.v2"
)

func InitLogger() {
	serverConfig := authconfig.GetServerConfig()
	multi := io.MultiWriter(&lumberjack.Logger{
		Filename:   filepath.Join(serverConfig.LogPath, "logs.txt"),
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28,   //days
		Compress:   true, // disabled by default
	}, os.Stdout)
	log.SetOutput(multi)
}
