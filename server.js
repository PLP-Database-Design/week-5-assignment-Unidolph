// const express = require("express")
// const app = express()
// const mysql = require('mysql2');
// const dotenv = require('dotenv')

// // configure evvironment variables
// dotenv.config();

// // create a connection object
// const db = mysql.createConnection({
//     host: Process.env.DB_host,
//     user: Process.env.DB_USERNAME,
//     password: Process.env.DB_PASSWORD,
//     database: Process.env.DB_NAME
// })

// // test connection
// db.connect((err) => {
//     // iff the connection is not successful
//      iff(err) {
//     return console.log("error connecting to the database: ",err)
// }

//    // connection is successful
//    console.log("succesfully connected to mysql", db.threadid)
// })

// // retrieve all patients
// app.get('', (req, res) => {
//     const getPatients = "SELECT * FROM patients"
//     db.query(getPatients, (err, data) => {
        
//     })
// })

// // start and listen to the server
// app.listen(3300, () => {
//     console.log(`server is running on port 3300...`)
// })


const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// 1. Retrieve all patients
app.get('/patients', (req, res) => {
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 3. Filter patients by First Name
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  db.query('SELECT * FROM patients WHERE first_name = ?', [first_name], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/filter', (req, res) => {
  const { specialty } = req.query;
  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Listen to the server
 app.listen(3306, () => {
    console.log(`server is running on port 3300...`)
});