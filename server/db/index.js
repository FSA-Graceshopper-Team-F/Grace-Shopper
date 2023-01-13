//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require('./models/Order')

//associations could go here!
Order.belongsTo(User, {
  foreignKey: "userId"
})

module.exports = {
	db,
	User,
	Product,
};
