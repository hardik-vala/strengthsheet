# DB

## Launch

```
docker compose --env-file .env up
```
## Mongo shell

```
docker exec -it strengthsheet_db mongosh mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017
```