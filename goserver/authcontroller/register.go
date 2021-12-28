package authcontroller

import (
	"authdata"
	"errors"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type RegisterUser struct {
	Password string
	Email    string
	Roles    []string
}

// Main register entry
func (u RegisterUser) Register() (bool, error) {
	if !u.verifyEmailAvailable() {
		return false, errors.New("email is already in use")
	}
	if hashedPass, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost); err != nil {
		return false, errors.New("failed to encrypt password")
	} else {
		authdata.InsertUser(authdata.UserModelBase{
			Email:    u.Email,
			Password: string(hashedPass),
			Roles:    strings.Join([]string(u.Roles), ","),
		})
		return true, nil
	}
}

// Returns true if the e-mail is NOT registered
func (u RegisterUser) verifyEmailAvailable() bool {
	if _, err := authdata.GetUserIdByEmail(u.Email); err != nil {
		// User not found
		return true
	}
	// E-mail is already in use
	return false
}
