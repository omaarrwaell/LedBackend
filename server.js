// Import required packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Create the express app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
// For JSON payloads
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

// Connect to MongoDB Atlas (Cloud)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });

app.get("/users", async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.use("/pdfs", express.static("pdfs"));

app.use("/module", require("./Routes/module_routes"));
app.use("/auth", require("./Routes/auth_routes"));
app.use("/controller", require("./Routes/controller_routes"));
app.use("/screen", require("./Routes/screen_routes"));
app.use("/receivingCard", require("./Routes/receivingCard_routes"));
app.use("/powerSupply", require("./Routes/powerSupply_routes"));
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
