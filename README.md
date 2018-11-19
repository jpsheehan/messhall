# messhall server

## General Setup
Duplicate the `.env.skeleton` and rename it `.env`.
Enter a random sequence of characters as a value for `JWT_SECRET`. This is required for the server to be able to sign and verify tokens.

Set `DEFAULT_PORT` to a port number that you wish to run the server on.

Run `npm install` to install the required dependencies.

## Database setup
### Azure SQL Database
In the `.env` file, set the `DB_TYPE` to 'azure'. You will also need to set the other `DB_*` fields.

### Sqlite Database
In the `.env` file, set the `DB_TYPE` to 'sqlite'. This will create a database file in the root of the project called './data.db'.

## Building
Run `npm run build` to build the source code.

## Running
Run `npm run start` to start the server.

## API Documentation
Run `npm run docs` to build the API documentation. Access the documentation by opening `docs/index.html`