## README

Install docker and docker compose from
https://docs.docker.com/docker-for-mac/install/

To start the app:

```
./dev-env
```

If first time please do the following step

```
./dev-env init
```

To check logs plese run

```
./dev-env logs
```

To build a new image

```
./dev-env build
```

To run existing migrations

```
./dev-env db-migrate
```

To run seeds

```
./dev-env seed
```

To create a new migration

```
./dev-env create-db-migration [[MIGRATION_NAME]]
```

To rollback

```
./dev-env db-rollback
```

To stop the containers

```
./dev-env stop
```

## To open psql console

```
./dev-env psql
```
