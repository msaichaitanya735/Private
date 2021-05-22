const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var mailschema =  new Schema({
    to:String,
    from :String,
    subject:String,
    mailcontent:String,
    reply:String
})
module.exports = mongoose.model('mailsTable',mailschema)