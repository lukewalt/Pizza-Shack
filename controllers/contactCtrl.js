"use strict;"

// require our Contact model exported from module
const Contact = require('../models/contacts');

module.exports.show = (req, res) => {
  res.render('contact', {page: 'Contact'})
};

// take body from request object
module.exports.addContact = ({body}, res, err) => {
  Contact.forge(body)
  .save()
  .then(() => {
    //once the response comes back, direct user back home with redirect on express
    res.redirect('/')
  })
  .catch(err)
}
