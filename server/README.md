# AdventureAuidt Server

AdventureAudit backend(server) using Node.js, Express.

# Getting Started

Create .env file:

```
cp .env.sample .env
```

Install dependencies:

```
npm install
```

Run the application:

```
npm run dev
```

## Running Using Docker

```
docker-compose up
```

# Database

## Create migrations

Install db-migrate:

```
npm install -g db-migrate
```

Create migration using migrate CLI. Here is an example.

```
db-migrate create ISSUE##-table-name --sql-file --config ./database.json
```

Once you run the command, you should have up/down files.

```
20230204232914-ISSUE##-table-name-up.sql
20230204232914-ISSUE##-table-name-down.sql
```

- 20230204232914-ISSUE##-table-name-up.sql` should contain instructions that you are trying to achieve.
- 20230204232914-ISSUE##-table-name-down.sql should contain instructions to remove whatever change is made in the `up`.

## Run migrations

```
db-migrate up
```

## Further reading:

- [db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#create)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [Migration file format](https://github.com/golang-migrate/migrate/blob/master/MIGRATIONS.md)
