# Authentication Example

This repository contains authentication example with jwt tokens.

## Details

- User can register and login with email and password.
- Tokens are valid for 5 minutes (can be modified upon specification)
- Client-side logout can be performed by removing the token. If really required, another lookup table (e.g. on redis or on cockroach) can be issued to blacklist tokens.
- Server can be started by 'docker-compose up -d'
- Endpoint documentation is provided in openapi3 specification using swagger. Accessible at: http://localhost:8080/api/docs
- JSON file for endpoints can be accessed by http://localhost:8080/api/swagger.json. If required, https://editor.swagger.io/ can be used to convert it to YAML format.

## Known issues

- We have no automation tests. In the future upon request one could automate registration / login and consecutive accesses. 
- We have no protection against denial of service attacks. I assume this will be handled prior to the server connection.
- Anyone can register.
- There are no help on database restoration.
- Couldn't test on different development environments (tested on WSL only). 

## Final thoughts

If there are any questions, issues or errors, please feel free to get in touch.