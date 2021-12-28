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
	defer log.Print("Application shutdown")
	authdata.InitDB()
	defer authdata.CloseDB()
	authserver.RunHttp()
}
