# ---- build environment ----
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
# manually change below to match react scripts version to package.json
RUN npm install react-scripts@1.1.5 -g --silent

COPY . /usr/src/app
RUN npm run build

# ---- production environment ----
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# Fix for react-routers - the routes not working when you refresh the particular page.
COPY nginx.conf /etc/nginx/conf.d/default.conf
# make nginx run as www-data
RUN usermod -u 1000 www-data

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY ./.env .

# Make our shell script executable
RUN chmod +x env.sh

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
