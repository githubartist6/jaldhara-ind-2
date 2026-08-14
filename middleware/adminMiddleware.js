const adminOnly = (req, res, next) => {
  if (!req.admin.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  next();
};

module.exports = adminOnly;