// DEPENDANCIES
const { response } = require("express");
const express = require("express");
const router = express.Router();

const User = require("../models/User"); // User schema model
const seedUsers = require("../seed data/seedUsers") // seed data

// ROUTES
// seed route
router.get("/seed", async (req, res) => {
    await User.deleteMany();
    const users = await User.insertMany(seedUsers);

    res.json(users);
});

// login route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();

        if (user.length === 0) {
            res.status(400).json({ error: "No user found"})
        } else {
            if (user.password === req.body.password) {
                req.session.userID = user._id;
                res.json({ userInfo: user });
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

// create new user route
router.post("/signup", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email }).exec();

        if (user.length !== 0) {
            res.status(409).json({ error: "Account with this email already exists. Please log in or use an alternative email" })
        } else if (user.length === 0) {
            const newUser = await User.create(req.body);
            res.status(201).json({ userInfo: newUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

// EXPORT
module.exports = router;