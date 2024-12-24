import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

/**
 * Hash a password
 * @param {String} password - The password to hash
 * @returns {String} - The hashed password
 */
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a password with a hash
 * @param {String} password - The password to compare
 * @param {String} hash - The hash to compare with
 * @returns {Boolean} - True if the password matches the hash, false otherwise
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
