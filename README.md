# Art-Sphere-Inc

## Setup
* Install the Prisma VSCODE extension

## Database
* Using Microsoft Azure SQL Database (MSSQL) because it's free
* Using Prisma ORM because it has MSSQL support and stable

### Why SQL Over NOSQL?
* 

### Updating Schema
Run the following and replace `message` with a message of what you changed
```
npx prisma migrate dev --name message
npx prisma generate
```

### Viewing Database Entries
* Download Azure Data Studio to view db

* Need a Shadow database to update schema
### Run Shadow Database on Docker:
* Need Docker Desktop
Creating Shadow Database:
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```
Running Shadow Database:
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hack4Impact!" -p 1433:1433 -d --name sql_server mcr.microsoft.com/mssql/server:2022-latest
``` 

## Authentication
* Using firebase auth to avoid security risks
