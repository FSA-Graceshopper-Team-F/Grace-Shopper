const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
  name:{
    type:Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'placeholder'
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    
  },

});

module.exports = Product; 
