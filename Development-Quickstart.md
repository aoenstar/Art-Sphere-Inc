# Development Quickstart

* This is a guide on how to get your environment started without worrying about deployment

## Installation
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Open a terminal and run the following:
```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hack4Impact" -p 1433:1433 -d --name sql_server mcr.microsoft.com/mssql/server:2022-latest
```
3. Download [Azure Data Studio](https://azure.microsoft.com/en-us/products/data-studio) to view db
4. Install the Prisma VSCODE extension (helpful if changing database schema but not necessary)
5. Run `yarn install`
6. Create .env file and ask us for what values to put in
```
DATABASE_URL=
SHADOW_DATABASE_URL=
```
7. Create a database named ArtSphereInc locally by connecting to the docker database on Azure, create a new request, then running the command:
```
CREATE DATABASE ArtSphereInc;
```

8. To start server run `yarn dev`

## Viewing Database
1. Open Azure Data Studio
2. Click new connection
3. Put following info in
```
server = artsphere-inc-server.database.windows.net
authentication type = SQL login
username = backenduser
password = Hack4Impact223
```
4. Then click connect
5. All the data under the ArtSphereInc database
6. To view table you can right click table you want then click Select Top 1000

## IMPORTANT: Running Docker Database
* Make sure the docker database is always running when you are developing or else can get errors
* Can open Docker Desktop to start and stop docker database

## Updating Database Schema
To update the schema, run the following and replace `message` with a message of what you changed
```
npx prisma pull
npx prisma migrate dev --name message
npx prisma generate
```

## Request Validation
* Using [express-validator](https://express-validator.github.io/docs) to authenticate api requests

## Potential Problems
* Docker not working for MAC
* Go to Settings, General, Use Rosetta for x86_64/amd
