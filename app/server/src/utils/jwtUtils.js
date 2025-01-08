import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to encode in the token
 * @param {String} [expiresIn='1h'] - Token expiration time
 * @returns {String} - JWT token
 */
const generateToken = (payload, expiresIn = "5s") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Generate a Refresh Token
 * @param {Object} payload - The payload to encode in the token
 * @param {String} [expiresIn='7d'] - Token expiration time
 * @returns {String} - Refresh token
  */
const generateRefreshToken = (payload, expiresIn = "7d") => {
	  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

/**
 * Verify a Refresh Token
 * @param {String} token - The token to verify
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If the token is invalid or expired
  */
  const verifyRefreshToken = (token) => {
    try {
      // You should use a different secret or key for refresh token verification
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  };

/**
 * Verify a JWT token
 * @param {String} token - The token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Decode a JWT token
 * @param {String} token - The token to decode
 * @returns {Object} - Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  decodeToken
};