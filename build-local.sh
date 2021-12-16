#!/bin/bash

export KEYCLOAK_CONFIG="{\"realm\":\"AnnetteDemo\",\"url\":\"https://kc.apps.cloud4.ambergate.ru/auth/\",\"clientId\":\"annette-console\"}"
export API_TARGET="https://annette.apps.cloud4.ambergate.ru/"
quasar build -m pwa
docker build . -f docker/Dockerfile -t default-route-openshift-image-registry.apps.cloud4.ambergate.ru/annette/annette-frontend:latest
docker push default-route-openshift-image-registry.apps.cloud4.ambergate.ru/annette/annette-frontend:latest

