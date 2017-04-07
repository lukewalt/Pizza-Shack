"use strict;"

const Order = require('../models/order');
const { knex } = require('../db/database');

const Size = () => knex('sizes')
const Topping = () => knex('toppings')

const getToppings = () =>
  Topping().select()
  .then((rows) => rows )
  .catch( error => {
    throw error
  });


const getSizes = () =>
  Size().select()
  .then((rows) => rows )
  .catch( error => {
    throw error
  });

module.exports.show = (req, res, err) =>
  Promise.all([ getToppings(), getSizes() ])
  .then(([toppings, sizes]) => {
    res.render('order', { page: 'Order', sizes, toppings })
  })
  .catch(err)


// definition create order to use in model
module.exports.create = (req, res, err) => {
  //instanciate order model to make order
  Order.forge(req.body)
  //save it to database
  .save()
  .then((orderObj) => {
    req.flash('orderMsg', { orderMsg: "Thanks for your order!" });
    res.redirect('/')
  })
  .catch( err  => {
    Promise.all([
      Promise.resolve(err),
      getSizes(),
      getToppings()
    ])
    .then(([errors, sizes, toppings]) =>
      //resolves all the promises
      res.render('order', { page: 'Order', sizes, toppings, errors, body})
    )
  })
  .catch(err)
}
