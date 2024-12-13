import { pool } from "../utils/dbUtil.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils.js";
import logger from "../utils/logger.js";

const userService = {
  /**
   * Returns an empty user object
   * @returns {Object} - The empty user object
   */
  emptyUser() {
    return {
      id: 0,
      username: "",
      email: "",
      password: "",
      applicationRoleId: "12a3bdaa-7880-4705-a59d-c06a7dade9af",
      createdAt: "",
      updatedAt: "",
      active: false,
    };
  },

  /**
   * Fetch a user by username
   * @param {string} username - The username to search for
   * @returns {Object|null} - The user object or null if not found
   */
  async findByUsername(username) {
    try {
      const result = await pool.query(
        `
        SELECT u.*, ar.name AS application_role
        FROM users u
        LEFT JOIN application_roles ar ON u.application_role = ar.id
        WHERE u.username = $1
        `,
        [username]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error("Error fetching user by username:", error);
      throw error;
    }
  },

  /**
   * Fetch a user by ID
   * @param {string} id - The user ID
   * @returns {Object|null} - The user object or null if not found
   */
  async findById(id) {
    try {
      const result = await pool.query(
        `
        SELECT u.*, ar.name AS application_role
        FROM users u
        LEFT JOIN application_roles ar ON u.application_role_id = ar.id
        WHERE u.id = $1
        `,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new user
   * @param {Object} userData - The user data
   * @param {string} userData.username
   * @param {string} userData.password - Plaintext password
   * @param {string} userData.email
   * @returns {Object} - The created user
   */
  async createUser({ username, password, email }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Default application role is 'user'
      const applicationRoleId = await this.getApplicationRoleIdByName("User");

      const result = await pool.query(
        `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, application_role_id, created_at, active
        `,
        [username, hashedPassword, email]
      );

      return result.rows[0];
    } catch (error) {
      logger.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Update a user
   * @param {string} id - The user ID
   * @param {Object} updates - The fields to update
   * @returns {Object} - The updated user
   */
  async updateUser(id, updates) {
    const { username, password, email, active } = updates;

    try {
      // Build the dynamic query
      const fields = [];
      const values = [];
      let index = 1;

      if (username) {
        fields.push(`username = $${index++}`);
        values.push(username);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${index++}`);
        values.push(hashedPassword);
      }
      if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
      }
      if (typeof active !== "undefined") {
        fields.push(`active = $${index++}`);
        values.push(active);
      }

      values.push(id); // Add the ID as the last parameter
      const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING id, username, email, application_role_id, created_at, updated_at, active
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      logger.error("Error updating user:", error);
      throw error;
    }
  },

  /**
   * Delete a user
   * @param {string} id - The user ID
   * @returns {boolean} - True if the user was deleted, false otherwise
   */
  async deleteUser(id) {
    try {
      const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
      return result.rowCount > 0;
    } catch (error) {
      logger.error("Error deleting user:", error);
      throw error;
    }
  },

  /**
   * Get the application role ID by name
   * @param {string} roleName - The role name
   * @returns {string|null} - The application role ID
   */
  async getApplicationRoleIdByName(roleName) {
    try {
      const result = await pool.query(`SELECT id FROM application_roles WHERE name = $1`, [
        roleName,
      ]);
      return result.rows[0]?.id || null;
    } catch (error) {
      logger.error("Error fetching application role ID:", error);
      throw error;
    }
  },

  /**
   * Generate a JWT for a user
   * @param {Object} user - The user object
   * @returns {string} - The JWT
   */
  generateUserToken(user) {
    return generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      application_role: user.application_role_id,
    });
  },
};

export default userService;
