const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Gaurav:blankspace@cluster0.xhef3ce.mongodb.net/MovieReview?retryWrites=true&w=majority&ssl=true";
mongoose.set('strictQuery', true);
const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongo successfully");
    })
}

module.exports = connectToMongo;