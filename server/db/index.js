//this is the access point for all things database related!

const db = require('./db')

const { User, Product } = require('./models/User')

//associations could go here!

module.exports = {
  db,
    User,
    Product,
  }
