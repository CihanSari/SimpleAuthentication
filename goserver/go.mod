module example.com/m/v2

go 1.17

require (
	authdata v0.0.0-00010101000000-000000000000
	authlog v0.0.0-00010101000000-000000000000
	authserver v0.0.0-00010101000000-000000000000
)

require (
	authconfig v0.0.0-00010101000000-000000000000 // indirect
	authcontroller v0.0.0-00010101000000-000000000000 // indirect
	authrouter v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/jackc/chunkreader/v2 v2.0.1 // indirect
	github.com/jackc/pgconn v1.10.1 // indirect
	github.com/jackc/pgio v1.0.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgproto3/v2 v2.2.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20200714003250-2b9c44734f2b // indirect
	github.com/jackc/pgtype v1.9.1 // indirect
	github.com/jackc/pgx/v4 v4.14.1 // indirect
	github.com/rs/cors v1.8.2 // indirect
	golang.org/x/crypto v0.0.0-20211215153901-e495a2d5b3d3 // indirect
	golang.org/x/text v0.3.6 // indirect
	gopkg.in/dgrijalva/jwt-go.v3 v3.2.0 // indirect
	gopkg.in/natefinch/lumberjack.v2 v2.0.0 // indirect
)

replace authconfig => ./authconfig

replace authlog => ./authlog

replace authserver => ./authserver

replace authrouter => ./authrouter

replace authcontroller => ./authcontroller

replace authdata => ./authdata
