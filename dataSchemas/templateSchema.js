const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: String,
    html:String,
    content: String,
})

module.exports = mongoose.model("templateList", schema)