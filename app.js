const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');
//const uri = process.env.MONGO_URI;

require('./models/user');
require('./models/post');

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


app.use(express.json()); // Parse the Json request - middleware
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
})