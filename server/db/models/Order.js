const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
    order: {
        type:Sequelize.JSONB,
        defaultValue:[]
    }
})

module.exports = Order
