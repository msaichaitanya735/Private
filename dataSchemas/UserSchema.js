const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var userSchema =  new Schema({
    username:String,
    password:String,
    email:String,
    phonenumber:String,
    addresses:String,
    orders:String,
    reviews:String,
    coupons:String,
    active:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('userTable',userSchema)