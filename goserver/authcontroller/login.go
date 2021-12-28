package authcontroller

import (
	"authconfig"
	"authdata"
	"errors"
	"log"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
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
	var loggedInUser LoggedInUser
	if userData, err := authdata.GetUserByEmail(u.Email); err != nil {
		return LoggedInUserWithToken{}, errors.New("user not found")
	} else {
		if bcrypt.CompareHashAndPassword([]byte(userData.Password), []byte(u.Password)) != nil {
			return LoggedInUserWithToken{}, errors.New("wrong password")
		}
		roles := strings.Split(userData.Roles, ",")
		log.Printf("Roles: %v\n", roles)
		for _, role := range roles {
			loggedInUser.Roles = append(loggedInUser.Roles, UserRole(role))
		}
		loggedInUser.Id = strconv.FormatInt(userData.Id, 10)
		loggedInUser.Email = userData.Email
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
