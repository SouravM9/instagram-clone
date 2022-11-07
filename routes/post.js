const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all fields" });
    }
    // console.log(req.user);
    // res.send("Ok");
    req.user.password = undefined;

    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });

    post.save().then(result => {
        res.json({ post: result });
    })
        .catch(err => {
            console.log(err);
        });
})

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .sort('-createdAt')  // TODO: Sort by created date
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name")    // Added to populate the commented person name
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .sort('-createdAt')
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost });
        })
        .catch(err => {
            console.log(err);
        })
})

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {   // findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg
        $push: { likes: req.user._id }     // The $push operator appends a user's id who liked to an array
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }   // The $pull operator removes from an existing array 
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id              // Userid of person who commented
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")    // populate() method is used to replace the user ObjectId field with the whole document consisting of all the user data

        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            // Checks if the person who posted & the person who is trying to delete is same or not
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
})


module.exports = router;