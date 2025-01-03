const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const app = express();
//seceret / database credentials stored in .env file
dotenv.config();

//database connection setup
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to DB! ')
    }).catch(err => {
        console.log('error in connection to DB ', err)
    })

app.use(bodyParser.json());
//routes
require('./startup/routes.js')(app);

app.get("/", (req, res) => {
    res.send(` <h3> Quiz App Backend Platform </h3> `)
})

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
