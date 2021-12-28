package main

import (
	"authdata"
	"authlog"
	"authserver"
	"log"
)

func main() {
	authlog.InitLogger()
	log.Print("Application started")
	authdata.InitDB()
	defer authdata.CloseDB()
	authserver.RunHttp()
}
