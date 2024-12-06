import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to encode in the token
 * @param {String} [expiresIn='1h'] - Token expiration time
 * @returns {String} - JWT token
 */
export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param {String} token - The token to verify
 * @returns {Object} - Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
