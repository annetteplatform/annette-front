

#==================== Setting up stage ====================
# Create image based on the official nginx - Alpine image
FROM nginx
#FROM nginx:1.13.7-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist/pwa   /usr/share/nginx/html

COPY ./docker/nginx.conf           /etc/nginx/nginx.conf

RUN chmod -R 777 /var/log/nginx /var/cache/nginx /var/run \
     && chgrp -R 0 /etc/nginx \
     && chmod -R g+rwX /etc/nginx \
     && rm /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
#CMD ["nginx-debug", "-g", "daemon off;"]
