const express = require("express");
const router = express.Router();
const User = require("../models/bookModel");
const userController = require("../controller/bookController");

router.post("/reviews", async (req, res) => {
  try {
    const { email, isbn13, reviewText } = req.body;
    console.log("Received request to add review:", {
      email,
      isbn13,
      reviewText,
    });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = user.books.find((b) => b.isbn13 === isbn13);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existingReview = user.reviews.find(
      (r) => r.isbn13 === isbn13 && r.by === email
    );
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists" });
    }

    const newReview = {
      by: email,
      text: reviewText,
    };
    user.reviews.push(newReview);

    await user.save();
    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
});

router.get("/book-reviews/:isbn13", async (req, res) => {
  try {
    const { isbn13 } = req.params;
    console.log("Received request to fetch reviews for ISBN-13:", isbn13);

    const users = await User.find({ "added.isbn13": isbn13 });
    console.log("Users found with the specified ISBN-13:", users);

    const reviews = users.reduce((acc, user) => {
      const book = user.added.find((b) => b.isbn13 === isbn13);
      if (book && book.reviews) {
        acc.push(...book.reviews);
      }
      return acc;
    }, []);

    console.log("Aggregated reviews:", reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching book reviews:", error);
    res.status(500).json({ message: "Failed to fetch book reviews" });
  }
});

router.post("/signup", userController.signUpUser);
router.put("/update-book", userController.updateBook);
router.put("/added-update", userController.updateAddedBook);
router.delete("/added-delete", userController.deleteBook);
router.put("/users/:email", userController.updateBooks);
router.get("/users/:email", userController.getUserByEmail);
router.delete("/delete-book", userController.deleteBook);
router.post("/add-book", userController.addBook);

module.exports = router;
