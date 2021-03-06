const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model("image", imageSchema)