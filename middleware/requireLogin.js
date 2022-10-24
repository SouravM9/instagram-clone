const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in first" });
    }
    //const token = authorization.replace("Bearer", "");  // authorization === Bearer snmdb732jh287d(token) 
    const token = authorization.split(' ')[1]; // Source - https://stackoverflow.com/questions/51849010/json-web-token-verify-return-jwt-malformed
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in first" });
        }

        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        });
        
    });
}