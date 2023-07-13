const { generateError } = require("../helpers");

const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      generateError("Acceso denegado", 401);
    }
  };
};

module.exports = checkRole;
