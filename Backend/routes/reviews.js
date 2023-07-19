const express = require("express")
const router = express.Router();
const Review = require("../models/Review")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middlewares/fetchuser")

// Fetching all  reviews
router.get("/fetchallreviewsofuser", fetchuser, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id })

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/checkuser", fetchuser, async (req, res) => {
    let isSameUser = false;
    const { id } = req.body
    try {
        if (id == req.user.id) {
            isSameUser = true;
        }
        res.json({ isSameUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/fetchallreviews", async (req, res) => {
    try {
        const reviews = await Review.find()

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add a new Review 
router.post("/addreview", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('body', 'Body must be atleast 5 characters long').isLength({ min: 8 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let review = await Review.findOne({ title: req.body.title })
        if (review) {
            return res.status(400).json({ error: "Sorry a review with this title already exists" });
        }
        review = await Review.create({
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating,
            user: req.user.id,
            uname: req.user.uname
        })

        res.json({ review });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
}
)

// Update an existing review
router.put("/updatereview/:id", fetchuser, async (req, res) => {
    let { title, body, rating } = req.body;
    try {

        // Create a new review object
        const newReview = {};
        if (title) { newReview.title = title }
        if (body) { newReview.body = body }
        if (rating) { newReview.rating = rating }

        // Find the review to be updated and update it
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(400).send("Review not found");
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        review = await Review.findByIdAndUpdate(req.params.id, { $set: newReview }, { new: true })
        res.json({ review })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//Toggle Completed
router.patch("/togglecomplete/:id", fetchuser, async (req, res) => {
    let { isCompleted } = req.body;
    try {

        // Find the review to be updated and update it
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(400).send("Review not found");
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        review.isCompleted = isCompleted;
        await review.save();

        res.json({ review });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Delete a Review
router.delete("/deletereview/:id", fetchuser, async (req, res) => {
    try {

        // Find the review to be deleted and delete it
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(400).send("Review not found");
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        review = await Review.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Review has been deleted successfully", review: review })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})




module.exports = router