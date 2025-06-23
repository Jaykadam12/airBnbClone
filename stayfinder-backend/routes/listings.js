const express = require("express");
const Listing = require("../models/Listing");
const router = express.Router();
const upload = multer({ storage: cloudinaryStorage });
const path = require("path");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const mongoose = require("mongoose");
const cloudinaryStorage = require("../cloudinaryStorage");
const storage = require("../cloudinaryStorage");

//TO GET all home
router.get("/", async (req, res) => {
  const Listings = await Listing.find().populate("hostId", "name email");
  res.json(Listings);
});

// GET /api/listings/host/:hostId TO get homes of host
router.get('/host/:hostId', async (req, res) => {
  const hostId = req.params.hostId;

  try {
    const listings = await Listing.find({ hostId: hostId }).populate('hostId', 'name email');

    if (!listings || listings.length === 0) {
      return res.status(404).json({ error: 'No listings found for this host' });
    }

    res.json(listings);
  } catch (error) {
    console.error('Error fetching host listings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


//TO GET single home by id
router.get("/:id", async (req, res) => {  
  const { id } = req.params;

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
    if (error.kind === "ObjectId") {
      // Invalid ObjectId format
      return res.status(400).json({ error: "Invalid listing ID" });
    }
    res.status(500).json({ error: "Server error" });
  }
});


//TO POST Home and save in database
router.post("/", verifyToken, upload.array("images"), async (req, res) => {
  try {
    const { title, description, price, location, features } = req.body;
    const featuresArray = features ? features.trim().split(/\s+/) : [];
    
    // Use Cloudinary image URLs
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
    console.error("Error creating listing:", error);
    res.status(400).json({ error: "Invalid data or server error" });
  }
});


//TO EDIT home data
router.put("/:id", verifyToken, upload.array("images"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, features } = req.body;

    const featuresArray = features ? features.trim().split(/\s+/) : [];

    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    // Fetch the existing listing
    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Optional: check if current user owns this listing
    if (existingListing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update fields
    existingListing.title = title;
    existingListing.description = description;
    existingListing.price = price;
    existingListing.location = location;
    existingListing.features = featuresArray;

    // Only replace images if new ones are uploaded
    if (images.length > 0) {
      existingListing.images = images;
    }

    const updatedListing = await existingListing.save();
    res.json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Server error while updating listing" });
  }
});



//TO delete home
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;

    // Find the listing first
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.hostId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this listing" });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(listingId);

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Server error while deleting listing" });
  }
});


module.exports = router;
