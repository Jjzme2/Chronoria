import { pool } from "../utils/dbUtil.js";
import model from "../models/Character.js";

const tableName = "characters"

const CharacterService = {
  /**
   * List all records
   * @returns {Array} - List of objects
   * @throws {Error} - Throws an error if the query fails
   */
  async list() {
    try {
      const result = await pool.query(`
   		SELECT ch.*, cl.name AS class_name
		FROM ${tableName} ch
		LEFT JOIN classes cl ON char.class_id = c.id
      `);
	  console.log(result.rows);
      return result.rows.map((row) => new model(row));
    } catch (error) {
      console.error(`Error listing ${tableName}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a record by name
   * @param {string} name - The name to search for
   * @returns {Object|null} - The object or null if not found
   * @throws {Error} - Throws an error if the query fails
   */
  async findByName(name) {
    try {
      const result = await pool.query(
        `
        SELECT *
        FROM ${tableName}
        WHERE name = $1
        `,
        [name]
      );
      return result.rows[0] ? new model(result.rows[0]) : null;
    } catch (error) {
      console.error(`Error fetching ${tableName} by name:`, error);
      throw error;
    }
  },

  /**
   * Fetch a record by its ID
   * @param {string} id - The ID
   * @returns {Object|null} - The object or null if not found
   * @throws {Error} - Throws an error if the query fails
   */
  async findById(id) {
    try {
      const result = await pool.query(
        `
        SELECT *
        FROM ${tableName}
        WHERE id = $1
        `,
        [id]
      );
      return result.rows[0] ? new model(result.rows[0]) : null;
    } catch (error) {
      console.error(`Error fetching ${tableName} by ID:`, error);
      throw error;
    }
  },

  /**
   * Create a new record
   * @param {Object} data - The data
   * @returns {Object} - The created object
   * @throws {Error} - Throws an error if the query fails
   */
  async create(data) {
    try {
      const result = await pool.query(
        `
        INSERT INTO ${tableName} (${Object.keys(data).join(", ")})
        VALUES (${Object.keys(data)
          .map((_, i) => `$${i + 1}`)
          .join(", ")})
        RETURNING *
        `,
        Object.values(data)
      );
      return new model(result.rows[0]);
    } catch (error) {
      console.error(`Error creating ${tableName}:`, error);
      throw error;
    }
  },

  /**
   * Update a record
   * @param {Object} data - The updated data
   * @returns {Object} - The updated object
   * @throws {Error} - Throws an error if the query fails
   */
  async update(data) {
    try {
      const result = await pool.query(
        `
        UPDATE ${tableName}
        SET ${Object.keys(data)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(", ")}
        WHERE id = $${Object.keys(data).length + 1}
        RETURNING *
        `,
        [...Object.values(data), data.id]
      );
      return new model(result.rows[0]);
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }
  },
};

export default CharacterService;
