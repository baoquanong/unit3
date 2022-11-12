// DEPENDANCIES
const { response } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User"); // User schema model
const seedUsers = require("../seed data/seedUsers") // seed data

const saltRounds = 10;

// ROUTES
// seed route
router.get("/seed", async (req, res) => {
    await User.deleteMany();
    const encryptedUsers = seedUsers.map((user) => (
        {
            ...user,
            password: bcrypt.hashSync(user.password, saltRounds)
        }
    ));
    const users = await User.insertMany(encryptedUsers);

    res.json(users);
});

// login route
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({email: req.body.email}).exec();

        if (user.length === 0) {
            res.status(400).json({ error: "No user found" })
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, user.password);
            if (loginPass) {
                req.session.userID = user._id;
                res.json(user);
            } else {
                res.status(400).json({ error: "Please enter correct password" });
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
            const newUser = await User.create({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            });
            res.status(201).json({ userInfo: newUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

// update preferences after initial creation
router.put("/preferences/:id", async (req, res) => {
    if ("userID" in req.session) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            ).exec();
    
            if (user.length === 0) {
                res.status(400).json({ error: "Unable to update user" });
            } else {
                res.status(200).json(user);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(500).json({ error: "No user logged in"})
    }

});

// update profile info
router.put("/update/:id", async (req, res) => {
    console.log("req.body:", req.body);
    
    if ("userID" in req.session) {
        try {
            const userCheck = await User.find({ email: req.body.email }).exec();
            if (userCheck.length !== 0 && userCheck[0]._id != req.params.id) {
                res.status(400).json({ error: "This email is already linked to another account" });
            } else {
                const user = await User.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true },
                ).exec();
    
                if (user.length !== 0) {
                    res.json(user);
                } else {
                    res.status(400).json({ error: "Unable to update this user" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(500).json({ error: "No user logged in"})
    }
});



// EXPORT
module.exports = router;