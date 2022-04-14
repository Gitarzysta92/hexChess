FROM node:17-alpine3.14 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.6-alpine as prod
COPY --from=build app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
