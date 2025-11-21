# k8s-docker-demo

## Run locally with Docker

```bash
docker compose up --build
# frontend on http://localhost:8082
# backend on http://localhost:3000
```

DB is persisted in named volume `db-data`.

## Build images (optional)

```bash
docker build -t yourrepo/sample-app/myapp-backend ./backend
docker build -t yourrepo/sample-app/myapp-frontend ./frontend
```

## Deploy to Kubernetes with Helm

```bash
helm install -n default  my-app ./helm/my-app
```
