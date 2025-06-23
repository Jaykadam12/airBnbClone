const express = require("express");
const Listing = require("../models/Listing");
const multer = require("multer");
const cloudinaryStorage = require("../cloudinaryStorage");
const router = express.Router();
const upload = multer({ storage: cloudinaryStorage });
const verifyToken = require("../middleware/verifyToken");

//  GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("hostId", "name email");
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET listings of a specific host
router.get("/host/:hostId", async (req, res) => {
  try {
    const hostId = req.params.hostId;
    const listings = await Listing.find({ hostId }).populate(
      "hostId",
      "name email"
    );

    if (!listings || listings.length === 0) {
      return res.status(404).json({ error: "No listings found for this host" });
    }

    res.json(listings);
  } catch (error) {
    console.error("Error fetching host listings:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//  GET single listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "hostId",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//  POST new listing (upload to Cloudinary)
router.post("/", verifyToken, upload.array("images"), async (req, res) => {
  try {
    const { title, description, price, location, features } = req.body;
    const featuresArray = features ? features.trim().split(/\s+/) : [];
    const images = req.files.map((file) => file.path); 

    const newListing = await Listing.create({
      title,
      description,
      price,
      location,
      features: featuresArray,
      images,
      hostId: req.user.id,
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error.message, error.stack);
    res.status(400).json({ error: "Invalid data or server error" });
  }
});

//  PUT (Update) listing
router.put("/:id", verifyToken, upload.array("images"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, features } = req.body;
    const featuresArray = features ? features.trim().split(/\s+/) : [];
    const images = req.files?.map((file) => file.path) || []; 

    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update listing" });
    }

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.features = featuresArray;
    if (images.length > 0) listing.images = images;

    const updated = await listing.save();
    res.json(updated);
  } catch (error) {
    console.error("Error updating listing:", error.message, error.stack);
    res.status(500).json({ error: "Server error while updating listing" });
  }
});

//  DELETE listing
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error.message, error.stack);
    res.status(500).json({ error: "Server error while deleting listing" });
  }
});

module.exports = router;
