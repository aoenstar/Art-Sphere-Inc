# Art-Sphere-Inc

## Setup
* Install the Prisma VSCODE extension

## Database
* Using Microsoft Azure SQL Database (MSSQL) because it's free
* Using Prisma ORM because it has MSSQL support and stable

### Why SQL Over NOSQL?
* 

### Viewing Database Entries
* Download Azure Data Studio to view

* Need a Shadow database to update schema
### Run Shadow Database on Docker:
Creating:

```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hack4Impact!" -p 1433:1433 -d --name sql_server mcr.microsoft.com/mssql/server:2022-latest
ace6a5ef80433263a4c89f87cc061dace538c869b8add6c75df60db337d0f60a
``` 
