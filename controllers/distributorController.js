const Distributor = require("../models/Distributor");

const saveDistributor = async (req, res) => {
  try {
    const { name, mobile, email, city, investment } = req.body;

    if (!name || !mobile || !email || !city || !investment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const distributor = await Distributor.create({
      name,
      mobile,
      email,
      city,
      investment,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry Sent Successfully",
      data: distributor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDistributors = async (req, res) => {
  try {
    const data = await Distributor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveDistributor,
  getAllDistributors,
};
