const express = require("express");
const User = require("../models/User");
const seedUsers = require("../seed data/seedUsers")

const router = express.Router();

// ROUTES
router.get("/seed", async (req, res) => {
    await User.deleteMany();
    const users = await User.insertMany(seedUsers);

    res.json(users);
});

module.exports = router;
