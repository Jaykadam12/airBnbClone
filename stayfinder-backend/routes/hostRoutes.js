const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken); // Protect all routes starting with /host

router.get("/dashboard", (req, res) => {
  res.json({ message: "Host dashboard data" });
});

module.exports = router;
