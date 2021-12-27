package authrouter

import (
	"authcontroller"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func registerHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			notFound(w, r)
			return
		}
		var u authcontroller.RegisterUser
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		defer internalErrorHandler(w)
		log.Printf("Registering user: %v...\n", u.Email)
		if _, err := u.Register(); err != nil {
			res := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(res))
			w.WriteHeader(http.StatusBadRequest)
		} else {
			w.Write([]byte("User was registered successfully!"))
			w.WriteHeader(http.StatusOK)
		}
	}
}

func loginHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			notFound(w, r)
			return
		}
		var u authcontroller.LoginUser
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		defer internalErrorHandler(w)
		log.Printf("Logging in user: %v...\n", u.Email)
		if res, err := u.Login(); err != nil {
			errMsg := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(errMsg))
			w.WriteHeader(http.StatusBadRequest)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(res)
		}
	}
}
