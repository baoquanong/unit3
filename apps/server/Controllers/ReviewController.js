const express = require("express");
const router = express.Router();

const Review =  require("../models/Review");
const seedReviews = require("../seed data/seedReviews");

// ROUTES
// seed route
router.get("/seed", async (req, res) => {
    await Review.deleteMany();
    const reviews = await Review.insertMany(seedReviews);

    res.json(reviews);
});

// get all reviews for a user
router.get("/:user", async (req, res) => {
    const { user } = req.params;

    if ("userID" in req.session) {
        try {
            const reviews = await Review.find({ postedFor: user }).populate("job").exec();
            if (reviews.length === 0) {
                res.status(400).json({ error: "No reviews found for this user" });
            } else {
                res.status(200).json(reviews);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(500).json({ error: "No user logged in"});
    }
});

// get all posted reviews for a user
router.get("/posted/:user", async (req, res) => {
    const { user } = req.params;

    if ("userID" in req.session) {
        try {
            const reviews = await Review.find({ postedBy: user }).populate("job").exec();
            if (reviews.length === 0) {
                res.status(400).json({ error: "No reviews found for this user" });
            } else {
                res.status(200).json(reviews);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(500).json({ error: "No user logged in"});
    }
});

// post a new review
router.post("/new", async (req, res) => {
    if ("userID" in req.session) {
        if (!req.body.rating) {
            res.status(400).json({ error: "Please input rating" });
        } else {
            try {
                const newReview = await Review.create(req.body);
                if (!newReview) {
                    res.status(400).json({ error: "Unable to add new review" });
                } else {
                    res.status(201).json(newReview);
                }
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        }
    } else {
        res.status(500).json({ error: "No user logged in"});
    }
});

module.exports = router;