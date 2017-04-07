"use strict;"

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');

const passport = require('passport');
const KnexSessionStore = require('connect-session-knex')(session);
const { knex } = require('./db/database');

const routes = require('./routes/');

// configure pug our view engine
app.set('view engine', 'pug')

app.locals.errors = {};
app.locals.company = '🍕 Pizza Shack';
app.locals.body = {}
app.locals.body.slogan = "We know how to make that pie right!"

//----------- MIDDLEWARE(s) --------------

app.use(cookieParser('secretpizza'));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'secretpizza', resave: true, saveUninitialized: false }));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions'
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'pizzashacksupersecret'
}))

require('./lib/passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

// set boolean to email which will correlate to pug template
app.use( (req, res, next) => {
  app.locals.email = req.user && req.user.email
  next()
})


app.use(express.static('public'));
app.use(routes)

app.use((req, res) => {
  res.render('404');
})

app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    // Send the stack trace as a response, for debugging purposes
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp = new Date()
  const statusCode = res.statusCode
  const statusMessage = res.statusMessage

  // console.error(
  //   `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  // )``
  // console.error("Oh, crud!!!!!", err.stack)
});

//--------- END MIDDLEWARE ----------------

const port = process.env.PORT || 3000;

//establishes
app.listen(port, () => {
  console.log(`YOU ARE LISTENING ON PORT ${port}`);
})
