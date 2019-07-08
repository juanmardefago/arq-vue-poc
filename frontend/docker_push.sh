#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t arq1-frontend .
docker tag arq1-frontend:latest juanmardefago/arq1-frontend
docker push juanmardefago/arq1-frontend
