const express = require("express");

const router = express.Router();

const {
  createAdmin,
  loginAdmin,
  getAdminProfile,
} = require("../controllers/adminAuthController");

const { protect } = require("../middleware/authMiddleware");

// Create First Admin
router.post("/create", createAdmin);

// Admin Login
router.post("/login", loginAdmin);

// Get Admin Profile (Protected)
router.get("/profile", protect, getAdminProfile);

module.exports = router;
