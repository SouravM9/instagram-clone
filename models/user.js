const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dji1pwzqq/image/upload/v1667645101/318381621277201_n00vja.jpg"
    }
});

mongoose.model("User", userSchema);