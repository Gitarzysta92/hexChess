FROM node:12-alpine

COPY . .
COPY --from=hex-chess_shared-container . .
RUN chmod +x /wait-for-it.sh
RUN apk update && apk add vim
RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make py3-pip
RUN vim /wait-for-it.sh -c "set ff=unix" -c ":wq"
RUN apk update && apk add bash
RUN npm install mysql2 bcrypt uuid
RUN npm install sequelize sequelize-cli -g
