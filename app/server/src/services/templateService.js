import { pool } from "../utils/dbUtil.js";

const templateService = {
  /**
   * Create a new template
   * @param {Object} templateData - The template data
   * @param {string} templateData.name
   * @param {string} templateData.description
   * @returns {Object} - The created template
   */
  async createTemplate({ name, description }) {
    try {
      const result = await pool.query(
        `
        INSERT INTO templates (name, description)
        VALUES ($1, $2)
        RETURNING id, name, description, created_at, updated_at
        `,
        [name, description]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  },

  /**
   * Fetch a template by ID
   * @param {string} id - The template ID
   * @returns {Object|null} - The template object or null if not found
   */
  async findById(id) {
    try {
      const result = await pool.query(
        `
        SELECT id, name, description, created_at, updated_at
        FROM templates
        WHERE id = $1
        `,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching template by ID:", error);
      throw error;
    }
  },

  /**
   * Update a template
   * @param {string} id - The template ID
   * @param {Object} updates - The fields to update
   * @returns {Object} - The updated template
   */
  async updateTemplate(id, updates) {
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
        UPDATE templates
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING id, name, description, created_at, updated_at
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating template:", error);
      throw error;
    }
  },

  /**
   * Delete a template
   * @param {string} id - The template ID
   * @returns {boolean} - True if the template was deleted, false otherwise
   */
  async deleteTemplate(id) {
    try {
      const result = await pool.query(`DELETE FROM templates WHERE id = $1 RETURNING id`, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  },
};

export default templateService;
