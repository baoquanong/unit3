// DEPENDANCIES
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
    const { email, password } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please enter email" });
    } else if (!password) {
        res.status(400).json({ error: "Please enter password" });
    } else {
        try {
            const user = await User.findOne(email).exec();
            if (!user) {
                res.status(400).json({ error: "User not found" });
            } else {
                if (password === user.password) {
                    res.status(200).json({ msg: "Login ok"});
                } else {
                    res.status(400).json({ error: "Please enter correct password" })
                }
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
});

// create new user route
router.post("/signup", async (req, res) => {
    try {
        const user = await User.find({email: req.body.email});

        if (user) {
            res.status(400).json({ error: "Account with this email already exists. Please log in or use an alternative email" })
        } else if (!user) {
            const newUser = await User.create(req.body);
            res.status(202).json(newUser);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

// EXPORT
module.exports = router;