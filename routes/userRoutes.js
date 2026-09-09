
const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../controllers/userController");

// ========================================
// GET ALL USERS
// GET /api/users
// ========================================
router.get("/users", getAllUsers);

// ========================================
// GET SINGLE USER
// GET /api/users/:id
// ========================================
router.get("/users/:id", getSingleUser);

// ========================================
// UPDATE USER
// PATCH /api/users/:id
// ========================================
router.patch("/users/:id", updateUser);

module.exports = router;
