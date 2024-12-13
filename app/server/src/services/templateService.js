import { pool } from "../utils/dbUtil.js";
import logger from "../utils/logger.js";

const placeholderService = {
  /**
   * Create a new placeholder
   * @param {Object} placeholderData - The placeholder data
   * @param {string} placeholderData.name
   * @param {string} placeholderData.description
   * @returns {Object} - The created placeholder
   */
  async createPlaceholder({ name, description }) {
    try {
      const result = await pool.query(
        `
        INSERT INTO placeholders (name, description)
        VALUES ($1, $2)
        RETURNING id, name, description, created_at, updated_at
        `,
        [name, description]
      );

      return result.rows[0];
    } catch (error) {
      logger.error("Error creating placeholder:", error);
      throw error;
    }
  },

  /**
   * Fetch a placeholder by ID
   * @param {string} id - The placeholder ID
   * @returns {Object|null} - The placeholder object or null if not found
   */
  async findById(id) {
    try {
      const result = await pool.query(
        `
        SELECT id, name, description, created_at, updated_at
        FROM placeholders
        WHERE id = $1
        `,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error("Error fetching placeholder by ID:", error);
      throw error;
    }
  },

  /**
   * Update a placeholder
   * @param {string} id - The placeholder ID
   * @param {Object} updates - The fields to update
   * @returns {Object} - The updated placeholder
   */
  async updatePlaceholder(id, updates) {
    const { name, description } = updates;

    try {
      // Build the dynamic query
      const fields = [];
      const values = [];
      let index = 1;

      if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
      }
      if (description) {
        fields.push(`description = $${index++}`);
        values.push(description);
      }

      values.push(id); // Add the ID as the last parameter
      const query = `
        UPDATE placeholders
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING id, name, description, created_at, updated_at
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      logger.error("Error updating placeholder:", error);
      throw error;
    }
  },

  /**
   * Delete a placeholder
   * @param {string} id - The placeholder ID
   * @returns {boolean} - True if the placeholder was deleted, false otherwise
   */
  async deletePlaceholder(id) {
    try {
      const result = await pool.query(`DELETE FROM placeholders WHERE id = $1 RETURNING id`, [id]);
      return result.rowCount > 0;
    } catch (error) {
      logger.error("Error deleting placeholder:", error);
      throw error;
    }
  },
};

export default placeholderService;
