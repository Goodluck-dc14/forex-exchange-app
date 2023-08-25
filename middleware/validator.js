const { body, validationResult } = require("express-validator");

const validateCurrencyConversion = [
  body("from").isString().notEmpty(),
  body("to").isString().notEmpty(),
  body("amount").isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCurrencyConversion };
