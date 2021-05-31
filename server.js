//IMPORT MYSQL2
const mysql = require('mysql2');

//IMPORT EXPRESS
const express = require('express');

//PORT DESIGNATION
const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// FUNCTION TO CONNECT TO DB
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'election'
  },
  console.log('Connected to the election database.')
);



//HANDLES USER REQUESTS THAT AREN'T SUPPORTED
app.use((req, res) => {
  res.status(404).end();
});




//STARTS EXPRESS SERVER ON PORT 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});