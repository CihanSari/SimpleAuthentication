package authdata

import (
	"authconfig"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v4/stdlib"
)

var dbConnection *sql.DB

func InitDB() {
	databaseConfig := authconfig.GetDatabaseConfig()
	databaseURL := fmt.Sprintf("postgres://%v@%v:%v/%v", databaseConfig.User, databaseConfig.Host, databaseConfig.Port, databaseConfig.Name)
	conn, err := sql.Open("pgx", databaseURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	dbConnection = conn
	if _, err := dbConnection.Exec(
		`DROP TABLE IF EXISTS "users";`); err != nil {
		log.Fatalf("Failed to execute: %v\n", err.Error())
	}
	if _, err := dbConnection.Exec(
		`CREATE TABLE IF NOT EXISTS "users"(
		"id" SERIAL,
		"email" varchar(50) NOT NULL,
		"password" varchar(255) NOT NULL,
		"roles" varchar(255) NOT NULL
	   );`); err != nil {
		log.Fatalf("Failed to execute: %v\n", err.Error())
	}
}

func CloseDB() {
	dbConnection.Close()
}

func GetUserIdByEmail(email string) (int64, error) {
	var id int64
	if err := dbConnection.QueryRow(
		"SELECT id FROM users WHERE email=$1", email).Scan(&id); err != nil {
		log.Printf("Query failed: %v\n", err.Error())
		return 0, err
	} else {
		log.Printf("Query returned: %v\n", id)
		return id, nil
	}
}

type UserModelBase struct {
	Email    string
	Password string
	Roles    string
}

func InsertUser(user UserModelBase) error {
	if res, err := dbConnection.Exec(
		`INSERT INTO "users" ("email", "password", "roles") VALUES ($1, $2, $3)`,
		user.Email, user.Password, user.Roles); err != nil {
		log.Printf("Query failed: %v\n", err.Error())
		return err
	} else {
		log.Printf("Query returned: %v\n", res)
		return nil
	}
}

type UserModel struct {
	UserModelBase
	Id int64
}

func GetUserByEmail(email string) (UserModel, error) {
	var user UserModel
	if err := dbConnection.QueryRow(
		"SELECT id, password, roles FROM users WHERE email=$1", email).Scan(&user.Id, &user.Password, &user.Roles); err != nil {
		log.Printf("Query failed: %v\n", err.Error())
		return user, err
	} else {
		user.Email = email
		log.Printf("Query returned: %v\n", user)
		return user, nil
	}
}
