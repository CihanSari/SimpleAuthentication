package main

import (
	"authlog"
	"log"
)

func main() {
	authlog.InitLogger()
	log.Print("An error occurred: ", "test")
}
