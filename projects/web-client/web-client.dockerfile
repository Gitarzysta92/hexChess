FROM node:12-alpine

RUN apk update && apk add bash
COPY . ./web-client
RUN chmod -R 777 ./web-client
COPY --from=hex-chess_shared-container . .
RUN apk update && apk add vim
RUN vim /wait-for-it.sh -c "set ff=unix" -c ":wq"
RUN chmod +x ./wait-for-it.sh
RUN mv ./wait-for-it.sh ./web-client 
WORKDIR /web-client 
RUN npm install


CMD [ "executable" ] ["npm run start"]
