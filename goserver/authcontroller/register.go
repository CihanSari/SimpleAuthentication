package authcontroller

import (
	"errors"
)

type RegisterUser struct {
	Password string
	Email    string
	Roles    []string
}

// Main register entry
func (u RegisterUser) Register() (bool, error) {
	if !u.verifyEmail() {
		return false, errors.New("email is already in use")
	}
	return true, nil
}

// Returns true if the e-mail is NOT registered
func (u RegisterUser) verifyEmail() bool {
	// TODO Check DB for e-mail verification
	return u.Email != "cihansari86@gmail.com"
}
