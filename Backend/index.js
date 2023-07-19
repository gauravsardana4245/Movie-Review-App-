const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var cors = require('cors')
const connectToMongo = require("./db.js");

app.use(express.json());

app.use(cors())
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/reviews', require('./routes/reviews.js'))
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
})
connectToMongo();