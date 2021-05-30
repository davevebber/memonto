const mongoose = require('mongoose'); 

const { Schema, model } = mongoose; 

const orderSchema = new Schema({
    amount:
        {
            type: Number
        }
}); 


const Order = model('Order', orderSchema);

module.exports = Order