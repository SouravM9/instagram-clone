const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');

/* Middleware in NodeJS demo codes

const customMiddleware = (req, res, next) => {
    console.log("Middleware executed !!");
    next();
}

// app.use(customMiddleware);

app.get('/', (req, res) => {  // app.get('/home' - http://localhost:5000/home
    console.log("Home");
    res.send("Hello World!!");
})

app.get('/about', customMiddleware, (req, res) => {  // http://localhost:5000/about
    console.log("About");
    res.send("About Page");
})

*/

// Connecting  to MongoDB
mongoose.connect(MONGO_URI, {   
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Error", err);
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
})