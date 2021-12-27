package authrouter

import (
	"authcontroller"
	"fmt"
	"net/http"
)

func roleContains(roles authcontroller.UserRoles, desiredRole authcontroller.UserRole) bool {
	for _, role := range roles {
		if role == desiredRole {
			return true
		}
	}
	return false
}

func guestAccessHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			notFound(w, r)
			return
		}
		w.Write([]byte("Guest"))
		w.WriteHeader(http.StatusOK)
	}
}

func userAccessHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			notFound(w, r)
			return
		}
		token := r.Header.Get("x-access-token")
		if roles, err := authcontroller.Verify(token); err != nil {
			res := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(res))
			w.WriteHeader(http.StatusBadRequest)
		} else if roleContains(roles, authcontroller.UserLevel) {
			w.Write([]byte("User"))
			w.WriteHeader(http.StatusOK)
		} else {
			w.Write([]byte("Access denied"))
			w.WriteHeader(http.StatusForbidden)
		}
	}
}

func modAccessHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			notFound(w, r)
			return
		}
		token := r.Header.Get("x-access-token")
		if roles, err := authcontroller.Verify(token); err != nil {
			res := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(res))
			w.WriteHeader(http.StatusBadRequest)
		} else if roleContains(roles, authcontroller.ModeratorLevel) {
			w.Write([]byte("Moderator"))
			w.WriteHeader(http.StatusOK)
		} else {
			w.Write([]byte("Access denied"))
			w.WriteHeader(http.StatusForbidden)
		}
	}
}

func adminAccessHandle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			notFound(w, r)
			return
		}
		token := r.Header.Get("x-access-token")
		if roles, err := authcontroller.Verify(token); err != nil {
			res := fmt.Sprintf("Failed: %v", err.Error())
			w.Write([]byte(res))
			w.WriteHeader(http.StatusBadRequest)
		} else if roleContains(roles, authcontroller.AdministratorLevel) {
			w.Write([]byte("Administrator"))
			w.WriteHeader(http.StatusOK)
		} else {
			w.Write([]byte("Access denied"))
			w.WriteHeader(http.StatusForbidden)
		}
	}
}
