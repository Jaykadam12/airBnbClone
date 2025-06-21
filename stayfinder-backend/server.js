const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://airbnbclone-y56h.onrender.com",
    ],
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/listings", require("./routes/listings"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/uploads", express.static("uploads"));
app.use("/api/host", require("./routes/hostRoutes"));



mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("🚀 Server running on port 5000"))
  )
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
