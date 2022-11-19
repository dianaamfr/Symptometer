#!/bin/sh
docker-compose up &
sleep 30
curl --location --request POST 'http://localhost:3030/ontology/data' --header 'Content-Type: multipart/form-data' --form 'data=@ontology/doid-merged.owl'