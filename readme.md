# Authentication Example

This repository contains authentication example with jwt tokens.

## Details

- User can register and login with email and password.
- Tokens are valid for 5 minutes (can be modified upon specification)
- Client-side logout can be performed by removing the token. If really required, another lookup table (e.g. on redis or on cockroach) can be issued to blacklist tokens.
- Server can be started by `docker build --tag docker-goauthserver .` followed by `docker-compose up`
- Endpoint documentation is provided in openapi3 specification using swagger. Accessible at: http://localhost:8080/api/docs
- JSON file for endpoints can be accessed by http://localhost:8080/api/swagger.json. If required, https://editor.swagger.io/ can be used to convert it to YAML format.

## Test

Register

```bash
curl -X 'POST' \
  'http://localhost:4000/api/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "example@mail.com",
  "password": "EH62zsK4qb~^.b/@",
  "roles": [
    "user",
    "moderator",
    "admin"
  ]
}'
```

Login

```bash
curl -X 'POST' \
  'http://localhost:4000/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "example@mail.com",
  "password": "EH62zsK4qb~^.b/@"
}'
```


Guest API (all access)

```bash
curl -X 'GET' \
  'http://localhost:4000/api/test/guest' \
  -H 'accept: text/plain'
```


User API **(IMPORTANT: update x-access-token from login response)**

```bash
curl -X 'GET' \
  'http://localhost:4000/api/test/user' \
  -H 'accept: text/plain' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjcyNDg5NzUwOTE5NzMxNjA5OSIsIkVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSIsIlJvbGVzIjpbInVzZXIiLCJtb2RlcmF0b3IiLCJhZG1pbiJdLCJleHAiOjE2NDEyOTI5ODUsImlhdCI6MTY0MTI5MjY4NSwiaXNzIjoiYXV0aC1leGFtcGxlIn0.ALyH30EZ-McTmfPxr0mymh-Si9pik1wpTIlMlZs6JAw'
```


Moderator API **(IMPORTANT: update x-access-token from login response)**

```bash
curl -X 'GET' \
  'http://localhost:4000/api/test/moderator' \
  -H 'accept: text/plain' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjcyNDg5NzUwOTE5NzMxNjA5OSIsIkVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSIsIlJvbGVzIjpbInVzZXIiLCJtb2RlcmF0b3IiLCJhZG1pbiJdLCJleHAiOjE2NDEyOTI5ODUsImlhdCI6MTY0MTI5MjY4NSwiaXNzIjoiYXV0aC1leGFtcGxlIn0.ALyH30EZ-McTmfPxr0mymh-Si9pik1wpTIlMlZs6JAw'
```

Admin API **(IMPORTANT: update x-access-token from login response)**

```bash
curl -X 'GET' \
  'http://localhost:4000/api/test/admin' \
  -H 'accept: text/plain' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjcyNDg5NzUwOTE5NzMxNjA5OSIsIkVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSIsIlJvbGVzIjpbInVzZXIiLCJtb2RlcmF0b3IiLCJhZG1pbiJdLCJleHAiOjE2NDEyOTI5ODUsImlhdCI6MTY0MTI5MjY4NSwiaXNzIjoiYXV0aC1leGFtcGxlIn0.ALyH30EZ-McTmfPxr0mymh-Si9pik1wpTIlMlZs6JAw'
```



## Known issues

- We have no automation tests. In the future upon request one could automate registration / login and consecutive accesses. 
- We have no protection against denial of service attacks. I assume this will be handled prior to the server connection.
- DB access differs between go and nodejs. Can't run concurrently.
- Anyone can register.
- There are no help on database restoration.
- Couldn't test on different development environments (tested on WSL only). 

## Final thoughts

If there are any questions, issues or errors, please feel free to get in touch.