package authcontroller

type UserRole string

const (
	UserLevel          UserRole = "user"
	ModeratorLevel     UserRole = "moderator"
	AdministratorLevel UserRole = "admin"
)

type UserRoles []UserRole
