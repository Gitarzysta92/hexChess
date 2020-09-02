import express from 'express';
import { Sequelize } from 'sequelize'
// rest of the code remains same
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


// Server=localhost;Database=master;Trusted_Connection=True;
// mysql root password: 0000

const sequelize = new Sequelize('hex', 'root', '0000', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: (...msg) => console.log(msg),
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
  });


  
  