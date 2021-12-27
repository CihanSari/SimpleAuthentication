module example.com/m/v2

go 1.17

require (
	authlog v0.0.0-00010101000000-000000000000
	authserver v0.0.0-00010101000000-000000000000
)

require (
	authconfig v0.0.0-00010101000000-000000000000 // indirect
	authcontroller v0.0.0-00010101000000-000000000000 // indirect
	authrouter v0.0.0-00010101000000-000000000000 // indirect
	gopkg.in/natefinch/lumberjack.v2 v2.0.0 // indirect
)

replace authconfig => ./authconfig

replace authlog => ./authlog

replace authserver => ./authserver

replace authrouter => ./authrouter

replace authcontroller => ./authcontroller
