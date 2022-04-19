npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-dat
npx sequelize-cli db:seed:undo:all