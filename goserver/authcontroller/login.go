package authcontroller

import "errors"

type LoginUser struct {
	Email    string
	Password string
}

type LoggedInUser struct {
	Id          string
	Email       string
	Roles       []string
	AccessToken string
}

// Main login entry
func (u LoginUser) Login() (LoggedInUser, error) {
	if u.Password == "" || u.Email == "" {
		return LoggedInUser{}, errors.New("missing email or password")
	}
	loggedInUser := LoggedInUser{
		Id:          "0",
		Email:       u.Email,
		Roles:       []string{"Admin"},
		AccessToken: "token",
	}
	return loggedInUser, nil
}
