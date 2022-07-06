#!/bin/sh
docker exec -it mongo1 mongo -u admin -p fullstack

# docker exec -it db-split-app-mongo-1 mongosh -u admin -p fullstack