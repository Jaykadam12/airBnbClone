const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const Listing = require("../models/Listing");
const verifyToken = require("../middleware/verifyToken");

router.post("/", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: "Invalid booking data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id; // ✅ fixed
  try {
    const bookings = await Booking.find({ user: id })
    res.json(bookings);
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.get("/host/bookings",verifyToken, async (req, res) => {
  try {
    const hostId = req.user.id;

    // Step 1: Find all listings of the host
    const listings = await Listing.find({ hostId });
    const listingIds = listings.map((listing) => listing._id);

    // Step 2: Find bookings for those listings
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("user", "email")
      .populate("listing", "title location");

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching host bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;