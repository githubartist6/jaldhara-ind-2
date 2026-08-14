const express = require("express");

const router = express.Router();

const {
  saveDistributor,
  getAllDistributors,
} = require("../controllers/distributorController");

// Post distributor routes
router.post("/distributor", saveDistributor);

// Get distributor routes
router.get("/getdistributor", getAllDistributors);

module.exports = router;
