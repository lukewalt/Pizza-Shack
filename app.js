require('dotenv').config();
const express = require('express');
const app = express();

//require defaults to looking for an index file (entry point file)
const routes = require('./routes/');

// configure pug our view engine
app.set('view engine', 'pug')


app.locals.company = '🍕 Pizza Shack';
app.locals.body = {}
app.locals.body.slogan = "We know how to make that pie right!"

//----------- MIDDLEWARE(s) --------------

app.use(express.static('public'))

// Routes

app.use(routes)

app.get('/contact', (req, res, next) => {
  res.render('contact', {page: "Contact"})
})

app.get('/login', (req, res, next) => {
  res.render('login', {page: "Login"})
})

app.get('/register', (req, res, next) => {

})
// end of Routes


app.use((req, res) => {
  res.render('404');
})

//--------- END MIDDLEWARE ----------------

const port = process.env.PORT || 3000;

//establishes
app.listen(port, () => {
  console.log(`YOU ARE LISTENING ON PORT ${port}`);
})
