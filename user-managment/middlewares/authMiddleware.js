import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const authenticateUser = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if token starts with "Bearer "
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Remove "Bearer " prefix from token
  const tokenString = token.substring(7);

  // Token Verification
  jwt.verify(tokenString, jwtSecret, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

