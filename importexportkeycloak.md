docker run --rm\
    --name keycloak_exporter\
    -v /volumes/keycloak-export:/tmp/keycloak-export:Z\
    -e POSTGRES_DATABASE=keycloak\
    -e POSTGRES_PASSWORD=password\
    -e POSTGRES_USER=keycloak\
    -e DB_VENDOR=POSTGRES\
    -e DB_ADDR=localhost\
    -e DB_PORT: 5432 \
    jboss/keycloak \
    -Dkeycloak.migration.action=export\
    -Dkeycloak.migration.provider=dir\
    -Dkeycloak.migration.dir=/tmp/keycloak-export\
    -Dkeycloak.migration.usersExportStrategy=SAME_FILE\
    -Dkeycloak.migration.realmName=Demo-Realm

docker run --rm\
    --name keycloak_importer\
    -v /tmp:/tmp/keycloak-import:Z\
    -e POSTGRES_DATABASE=keycloak_dest\
    -e POSTGRES_PASSWORD=PASSOWRD_DEST_PLEASE\
    -e POSTGRES_USER=keycloak\
    -e DB_VENDOR=POSTGRES\
    -e POSTGRES_PORT_5432_TCP_ADDR=postgresql2.local\
    jboss/keycloak:3.4.3.Final\
    -Dkeycloak.migration.action=import\
    -Dkeycloak.migration.provider=dir\
    -Dkeycloak.migration.dir=/tmp/keycloak-import\
    -Dkeycloak.migration.strategy=IGNORE_EXISTING\
    -Dkeycloak.migration.usersExportStrategy=SAME_FILE\
    -Dkeycloak.migration.realmName=therealm