package authcontroller

type UserRole string

const (
	UserLevel          UserRole = "User"
	ModeratorLevel     UserRole = "Moderator"
	AdministratorLevel UserRole = "Administrator"
)

type UserRoles []UserRole
