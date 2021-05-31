//IMPORT EXPRESS
const express = require('express');

//PORT DESIGNATION
const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//HANDLES USER REQUESTS THAT AREN'T SUPPORTED
app.use((req, res) => {
  res.status(404).end();
});




//STARTS EXPRESS SERVER ON PORT 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});