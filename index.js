require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const distributorRoutes = require("./routes/distributorRoutes");

// Admin
const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://sakjaldhara.netlify.app",
  }),
);

app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.use("/api", distributorRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminAuthRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server Running on Port ${PORT}`);
});
