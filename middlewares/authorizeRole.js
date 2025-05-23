// Middleware to check if user has specific role(s)
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Not authorized." });
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;
  