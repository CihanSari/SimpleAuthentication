package authrouter

import (
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", indexPage())
	mux.HandleFunc("/api/auth/register", registerHandle())
	mux.HandleFunc("/api/auth/login", loginHandle())
	loggerWrappedMux := newLogger(mux)
	return loggerWrappedMux
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

var notFound = func() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Not found"))
		w.WriteHeader(http.StatusNotFound)
	})
}()
