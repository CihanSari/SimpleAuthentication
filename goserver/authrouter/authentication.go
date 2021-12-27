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
		var b authcontroller.RegisterUser
		if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		defer func() {
			if r := recover(); r != nil {
				log.Println("Internal error in register", r)
				w.Write([]byte("Failed! Internal error!"))
				w.WriteHeader(http.StatusInternalServerError)
			}
		}()
		log.Printf("Registering user: %v...\n", b.Email)
		// Handle if e-mail is already in use
		if _, err := b.Register(); err != nil {
			res := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(res))
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		w.Write([]byte("User was registered successfully!"))
		w.WriteHeader(http.StatusOK)
	}
}
