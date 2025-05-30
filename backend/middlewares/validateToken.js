const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = validateToken;
