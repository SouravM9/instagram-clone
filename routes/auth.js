const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

// router.get('/', (req, res) => {
//     res.send("Hello!");
// });

router.get('/protected', requireLogin, (req, res) => {  // Lets assume this as protected resource
    res.send("Hello User");
})
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please fill up all fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already exists" });
            }
            bcrypt.hash(password, 12) //encrypt the password
                .then(hashedpassword => {
                    const user = new User({
                        email: email,
                        password: hashedpassword,
                        name: name
                    });

                    user.save()
                        .then(user => {
                            res.json({ message: "Email registered successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })

        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Please fill up the email and password" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" });
            }
            bcrypt.compare(password, savedUser.password)  //Compare the password provided with db one
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: "Successfully signed in" });
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET); // Generate a Json Web Token so that user can access protected resource using that token
                        const { _id, name, email } = savedUser;
                        res.json({ token: token, user: { _id, name, email } });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

module.exports = router;