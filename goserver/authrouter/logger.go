package authrouter

import (
	"log"
	"net/http"
	"time"
)

//routeLogger is a middleware handler that does request logging
type routeLogger struct {
	handler http.Handler
}

//ServeHTTP handles the request by passing it to the real
//handler and logging the request details
func (l *routeLogger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	l.handler.ServeHTTP(w, r)
	log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
}

//NewLogger constructs a new Logger middleware handler
func newLogger(handlerToWrap http.Handler) *routeLogger {
	return &routeLogger{handlerToWrap}
}
