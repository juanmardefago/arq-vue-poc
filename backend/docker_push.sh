#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t arq1-backend .
docker tag arq1-backend:latest juanmardefago/arq1-backend
docker push juanmardefago/arq1-backend
