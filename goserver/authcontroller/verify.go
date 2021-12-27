package authcontroller

import "errors"

// Main verify entry
func Verify(token string) (UserRoles, error) {
	switch token {
	default:
		return UserRoles{}, errors.New("invalid access token")
	case "user":
		return UserRoles{UserLevel}, nil
	case "mod":
		return UserRoles{UserLevel, ModeratorLevel}, nil
	case "admin":
		return UserRoles{UserLevel, ModeratorLevel, AdministratorLevel}, nil
	}
}
