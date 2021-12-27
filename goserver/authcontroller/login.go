package authcontroller

import (
	"authconfig"
	"errors"
	"time"

	"gopkg.in/dgrijalva/jwt-go.v3"
)

type LoginUser struct {
	Email    string
	Password string
}

type LoggedInUser struct {
	Id    string
	Email string
	Roles UserRoles
}

type LoggedInUserWithToken struct {
	LoggedInUser
	AccessToken string
}
type LoggedInUserClaims struct {
	LoggedInUser
	jwt.StandardClaims
}

// Main login entry
func (u LoginUser) Login() (LoggedInUserWithToken, error) {
	if u.Password == "" || u.Email == "" {
		return LoggedInUserWithToken{}, errors.New("missing email or password")
	}
	loggedInUser := LoggedInUser{
		Id:    "0",
		Email: u.Email,
		Roles: UserRoles{UserLevel, ModeratorLevel, AdministratorLevel},
	}
	issueTime := time.Now().Unix()
	expireTime := time.Now().Add(time.Minute * 5).Unix()
	loggedInUserClaims := LoggedInUserClaims{
		LoggedInUser: loggedInUser,
		StandardClaims: jwt.StandardClaims{
			IssuedAt:  issueTime,
			ExpiresAt: expireTime,
			Issuer:    "auth-example",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, loggedInUserClaims)
	if signedToken, err := token.SignedString([]byte(authconfig.AuthSecret)); err != nil {
		return LoggedInUserWithToken{}, errors.New("failed to create JWT")
	} else {
		return LoggedInUserWithToken{
			LoggedInUser: loggedInUser,
			AccessToken:  signedToken,
		}, nil
	}
}
