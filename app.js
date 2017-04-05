require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//require defaults to looking for an index file (entry point file)
const routes = require('./routes/');

// configure pug our view engine
app.set('view engine', 'pug')


app.locals.company = '🍕 Pizza Shack';
app.locals.body = {}
app.locals.body.slogan = "We know how to make that pie right!"
app.locals.errors = {}


//----------- MIDDLEWARE(s) --------------

// instanciated before routes so the routes can use them
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.use(routes)

app.use((req, res) => {
  res.render('404');
})

//--------- END MIDDLEWARE ----------------

const port = process.env.PORT || 3000;

//establishes
app.listen(port, () => {
  console.log(`YOU ARE LISTENING ON PORT ${port}`);
})
