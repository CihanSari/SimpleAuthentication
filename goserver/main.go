package main

import (
	"authlog"
	"authserver"
	"log"
)

func main() {
	authlog.InitLogger()
	log.Print("Application started")
	authserver.RunHttp()
}
