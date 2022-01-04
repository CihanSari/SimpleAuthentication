package authrouter

import (
	"net/http"

	"github.com/rs/cors"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", indexPage())
	mux.HandleFunc("/api/auth/register", registerHandle())
	mux.HandleFunc("/api/auth/login", loginHandle())
	mux.HandleFunc("/api/test/guest", guestAccessHandle())
	mux.HandleFunc("/api/test/user", userAccessHandle())
	mux.HandleFunc("/api/test/moderator", modAccessHandle())
	mux.HandleFunc("/api/test/admin", adminAccessHandle())
	loggerWrappedMux := newLogger(mux)
	handler := cors.Default().Handler(loggerWrappedMux)
	return handler
}

func indexPage() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Serve '/' on get requests
		if r.URL.Path != "/" || r.Method != http.MethodGet {
			notFound(w, r)
			return
		}
		w.Write([]byte("Application is running."))
		w.WriteHeader(http.StatusOK)
	}
}
