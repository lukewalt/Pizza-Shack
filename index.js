require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

//establishes 
app.listen(port, () => {
  console.log(`YOU ARE LISTENING ON PORT ${port}`);
})
