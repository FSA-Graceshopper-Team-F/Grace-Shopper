const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
    order: {
        type:Sequelize.JSONB,
        defaultValue:[]
    },
    address: {
        type:Sequelize.JSONB,
        defaultValue:{}
    },
    guest: {
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

module.exports = Order
