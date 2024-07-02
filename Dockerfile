#base image
FROM nginx:alpine

# set working dir for nginx server
WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf ./*

COPY /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
