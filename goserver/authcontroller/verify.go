package authcontroller

import (
	"authconfig"
	"errors"

	"gopkg.in/dgrijalva/jwt-go.v3"
)

// Main verify entry
func Verify(jwtFromHeader string) (UserRoles, error) {
	if token, err := jwt.ParseWithClaims(
		jwtFromHeader,
		&LoggedInUserClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(authconfig.AuthSecret), nil
		},
	); err != nil {
		return UserRoles{}, errors.New("failed to parse JWT: " + err.Error())
	} else {
		if claims, ok := token.Claims.(*LoggedInUserClaims); !ok {
			return UserRoles{}, errors.New("wrong JWT")
		} else {
			return claims.Roles, nil
		}
	}
}
