const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/adminAuthController");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Dashboard Statistics
router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
