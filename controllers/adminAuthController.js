const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Distributor = require("../models/Distributor");
const Contact = require("../models/Contact");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
};

// ============================
// Create Admin
// ============================

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already exists",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      phone,
      password,
      isAdmin: false,
      isActive: false,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully. Waiting for admin approval.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        isAdmin: admin.isAdmin,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Create Admin Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Admin Login
// ============================

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Admin Approval
    // if (!admin.isActive) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Your account is waiting for admin approval.",
    //   });
    // }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        isAdmin: admin.isAdmin,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Admin Profile
// ============================

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Dashboard Statistics
// ============================

exports.getDashboardStats = async (req, res) => {
  try {
    const totalDistributors = await Distributor.countDocuments();
    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalDistributors,
        totalContacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
