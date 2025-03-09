# senior-level-task-app

# Database

For local development (and demo purposes) you can use the docker PostgreSQL defined
in [docker-compose.yml](docker/docker-compose.yml).  
Follow the steps on [local_database_setup.md](docker/local_database_setup.md).

_Tool requirements: `docker`_

# Backend

To run the backend service, use:
```bash
cd backend
mvn clean install -Dmaven.test.skip=true
mvn spring-boot:run
```

_Tool requirements: `maven`, `java 17`_

# Frontend

To run the frontend service, use:
```bash
cd frontend && npm install && npm start
```

_Tool requirements: `node`, `npm`_