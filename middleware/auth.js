const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticate;
