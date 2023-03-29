npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-dat
npx sequelize-cli db:seed:undo:all



### Local Development
If you want to use changes from this module across others instantaneously, you need to build package manually after particular change. For this purpose use:

npm run build