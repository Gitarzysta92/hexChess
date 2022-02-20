FROM node:12-alpine

RUN apk update && apk add bash
COPY . ./web-service
RUN chmod -R 777 ./web-service
COPY --from=hex-chess_shared-container . .
RUN chmod +x ./wait-for-it.sh
RUN apk update && apk add vim
RUN vim /wait-for-it.sh -c "set ff=unix" -c ":wq"
RUN mv ./wait-for-it.sh ./web-service
WORKDIR /web-service
RUN npm install

ENTRYPOINT ["npm run start"]
