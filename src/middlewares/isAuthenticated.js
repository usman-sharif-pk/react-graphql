const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuthenticated = false;
    next();
    return;
  }

  console.log("authHeader", authHeader);

  const token = authHeader.split(" ")[1];

  if (!token) {
    req.isAuthenticated = false;
    next();
    return;
  }

  try {
    const { JWT_ACCESS_SECRET } = process.env;
    const verifiedToken = await jwt.verify(token, JWT_ACCESS_SECRET);
    if (!verifiedToken) {
      req.isAuthenticated = false;
      next();
      return;
    }
    // console.log("verifiedToken", verifiedToken);
    req.isAuthenticated = true;
    req.user_id = verifiedToken.id;
    next();
  } catch (error) {
    req.isAuthenticated = false;
    next();
  }
};
