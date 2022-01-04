# syntax=docker/dockerfile:1

FROM golang:1.16-alpine AS build

WORKDIR /app

COPY goserver ./
RUN go mod download


RUN go build -o /docker-goauthserver

##
## Deploy
##
FROM alpine

WORKDIR /

COPY --from=build /docker-goauthserver /tmp/docker-goauthserver

EXPOSE 4000

ENTRYPOINT ["/tmp/docker-goauthserver"]
