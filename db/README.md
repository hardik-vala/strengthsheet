# DB

## Development

### Launch

```
docker compose --env-file .env up
```

### Mongo shell

```
docker exec -it strengthsheet_db mongosh mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017
```

## Production

[Droplet](https://cloud.digitalocean.com/droplets/420151561/graphs?i=4e171a&period=hour)

### Deployment

Deploy Mongodb on DigitalOcean:

1. Create a DigitalOcean Droplet:
   - Log in to your DigitalOcean account.
   - Click on the "Create" button and select "Droplets" from the dropdown menu.
   - Choose an image (Ubuntu), select a plan, and choose a datacenter region (SFO-3) for your Droplet.
   - Use SSH keys for secure access to the Droplet.
   - Click on the "Create Droplet" button to create the Droplet.

2. Connect to the Droplet via SSH:
   - Once the Droplet is created, open a terminal on your local machine and [connect to the Droplet using SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/):
     ```
     ssh root@<droplet-ip-address>
     ```

3. Install Docker on the Droplet:
   - Connecting to the Droplet via SSH, [update the package list and install Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

4. Copy files to the Droplet:
   - Copy the `docker-compose.yml` and `initdb.js` files from your local machine to the Droplet using `scp`:
     ```
     scp docker-compose.yml root@137.184.84.146:/root/docker-compose.yml
     scp initdb.js root@137.184.84.146:/root/initdb.js
     scp .env.prod root@137.184.84.146:/root/.env

5. Deploy MongoDB using Docker Compose:
   - In the same directory where the `docker-compose.yml` file is located, run the following command to start the MongoDB container:
     ```
     docker compose --env-file .env up -d
     ```
   - Docker Compose will pull the necessary MongoDB image and start the container based on the configuration in the `docker-compose.yml` file.

6. Verify the deployment:
   - You can check the status of the MongoDB container using the following command:
     ```
     docker compose logs -f
     ```
   - You should see the `strengthsheet_db` container logs.

7. Access MongoDB:
    - You can now access the MongoDB instance running on the Droplet using the Droplet's public IP address and the specified port (27017).
    - Use a MongoDB client or connect to the MongoDB instance programmatically using the appropriate connection string.