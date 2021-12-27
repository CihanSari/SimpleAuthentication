package authcontroller

import "errors"

type LoginUser struct {
	Email    string
	Password string
}

type LoggedInUser struct {
	Id          string
	Email       string
	Roles       UserRoles
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
		Roles:       UserRoles{UserLevel, ModeratorLevel, AdministratorLevel},
		AccessToken: "token",
	}
	return loggedInUser, nil
}
