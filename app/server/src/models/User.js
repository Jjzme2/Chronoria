import { pool } from "../utils/dbUtil.js";
import bcrypt from "bcrypt";

class User {
  /**
   * Fetch a user by username
   * @param {string} username - The username to search for
   * @returns {Object|null} - The user object or null if not found
   */
  static async findByUsername(username) {
    try {
      const result = await pool.query(
        `
        SELECT u.id, u.username, u.password, u.active, ar.name AS application_role
        FROM users u
        LEFT JOIN application_roles ar ON u.application_role = ar.id
        WHERE u.username = $1
        `,
        [username]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - The user data
   * @param {string} userData.username - The username
   * @param {string} userData.password - The plaintext password
   * @param {string} userData.applicationRole - The application role ID
   * @param {string} userData.communityRole - The community role
   * @returns {Object} - The created user
   */
  static async create({ username, password, applicationRole, communityRole }) {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `
        INSERT INTO users (username, password, application_role, community_role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, application_role, community_role, created_at, active
        `,
        [username, hashedPassword, applicationRole, communityRole]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  /**
   * Verify a user's password
   * @param {string} plaintextPassword - The plaintext password
   * @param {string} hashedPassword - The hashed password from the database
   * @returns {boolean} - True if passwords match, false otherwise
   */
  static async verifyPassword(plaintextPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plaintextPassword, hashedPassword);
    } catch (error) {
      console.error("Error verifying password:", error);
      throw error;
    }
  }
}

export default User;
