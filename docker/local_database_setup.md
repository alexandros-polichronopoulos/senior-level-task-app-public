# Database

Start up PostgreSQL docker with data mounted on persistent volume

```bash
docker compose up -d
```

Shut it down

```bash
docker compose down
```

Shut down and erase volume data (be careful)

```bash
docker compose down -v
```