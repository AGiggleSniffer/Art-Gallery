# Backend server

## How to run backend in development?

> [!IMPORTANT]
> Rename .env.example file to .env and change configs to desired values

```
npm i
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
npm run start
```

## How does it work?

Using Express endpoints we take in json packets contaning DataURLs representing the picture data. We then are able to save this to a database with help from sequelize.

Uses bcryptjs to follow industry standards of properly salting hashing and storing user information in a database to validate API routes and sensitive info.

## Technologies used:

### Production

-   NodeJS
-   ExpressJS
-   Bcryptjs
-   Sequelize
-   Postgres

### Development

-   Nodemon
-   Sqlite3
