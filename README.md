# senior-level-task-app

# Database

For local development (and demo purposes) you can use the docker PostgreSQL defined
in [docker-compose.yml](docker/docker-compose.yml). Follow the steps
on [local_database_setup.md](docker/local_database_setup.md).

_Tool requirements: `docker`_

# Backend

### Run the backend service locally

```bash
cd backend
mvn clean package -Dmaven.test.skip=true
mvn spring-boot:run
```

_Tool requirements: `maven`, `java 17`_

### Use a docker image for backend

Build the image

```bash
cd backend
docker rmi -f task-manager-backend
docker build -t task-manager-backend . 
````

Add any extra environment variables to a `.env.local` file e.g.:

```bash
SPRING_DATASOURCE_URL="jdbc:postgresql://xxxxxxx.com/taskmanager_db_rzpp"
SPRING_DATASOURCE_USERNAME="admin"
SPRING_DATASOURCE_PASSWORD="{put password here}"
CORS_ALLOWED_ORIGINS="https://xxxx.github.io/projectname"
```

Run the image

```bash
cd backend
docker stop task-manager-backend || echo "Container was not running"
docker rm task-manager-backend || echo "Container was not present"
docker run --env-file .env.local -p 8080:8080 -d --name task-manager-backend task-manager-backend
```

# Frontend

### Run the frontend service locally

```bash
cd frontend && npm install && npm start
```

_Tool requirements: `node`, `npm`_

### Deploy frontend to github pages

```bash
cd frontend && npm run deploy
```

### Use a docker image for frontend

Build the image

```bash
cd frontend
docker rmi -f task-manager-frontend
docker build -t task-manager-frontend . 
````

Add any extra environment variables to a `.env.local` file e.g.:

```bash
BACKEND_API_URL=http://localhost:8080
```

Run the image

```bash
cd frontend
docker stop task-manager-frontend || echo "Container was not running"
docker rm task-manager-frontend || echo "Container was not present"
docker run --env-file .env.local -p 3000:3000 -d --name task-manager-frontend task-manager-frontend
```