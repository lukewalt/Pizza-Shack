require('dotenv').config();
const express = require('express');
const app = express();

// configure pug our view engine
app.set('view engine', 'pug')

// MIDDLEWARE(s)

app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.render('index')
})

const port = process.env.PORT || 3000;

//establishes
app.listen(port, () => {
  console.log(`YOU ARE LISTENING ON PORT ${port}`);
})
