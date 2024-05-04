# Deployment Guide

## Database
* [How to setup Database](https://www.youtube.com/watch?v=6joGkZMVX4o)

* In your local environment, set DATABASE_URL to your production database then run:
```
npx prisma migrate deploy
```
### .Env File
* Don't need to create SHADOW_DATABASE_URL env variable for production
```
DATABASE_URL=sqlserver://{server name}:1433;database={database};initialCatalog=ArtSphereInc;integratedSecurity=false;user={user};password={password};encrypt=true
```
* server name is in the format servername.database.windows.net

## Server
* [How to Deploy Server](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode) (scroll to Deploy on Azure Section)
