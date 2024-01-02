const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else {
    const errors = result.formatWith((error) => error.msg).array();
    return res.status(400).json({ success: false, errors });
  }
};
