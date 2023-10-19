const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/status', (req, res) => res.send({ status: "I'm up and running" }));

app.listen(port, () => console.log(`Node.js Application is listening on port ${port}!`));

app.post('/insert', (req, res) => {
  const { username, email, age } = req.query;

  if (username && email && age) {
    console.log('Received an insert call');
    const insertQuery = 'INSERT INTO users (username, email, age) VALUES ($1, $2, $3)';
    const values = [username, email, age];

    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send({ username, email, age });
      }
    });
  } else {
    console.log('Something went wrong, Missing a parameter');
    res.status(400).send('Missing parameters');
  }
});

app.get('/list', (req, res) => {
  console.log('Received a list call');
  const selectQuery = 'SELECT * FROM users';

  pool.query(selectQuery, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.rows);
    }
  });
});
