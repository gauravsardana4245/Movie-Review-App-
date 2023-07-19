const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true

    },
    body: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        default: "general"

    },
    uname: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("reviews", ReviewsSchema)