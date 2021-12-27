package authrouter

import (
	"log"
	"net/http"
)

func internalErrorHandler(w http.ResponseWriter) {
	if r := recover(); r != nil {
		log.Println("Internal error", r)
		w.Write([]byte("Failed! Internal error!"))
		w.WriteHeader(http.StatusInternalServerError)
	}
}

var notFound = func() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Not found"))
		w.WriteHeader(http.StatusNotFound)
	})
}()
