const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://airbnbclone-y56h.onrender.com", // replace with your real deployed frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // allow cookies, tokens in headers
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
