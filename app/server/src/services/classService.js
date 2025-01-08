import { pool } from "../utils/dbUtil.js";
import Class from "../models/Class.js";

const classService = {
  /**
   * List all classes
   * @returns {Array} - List of class objects
   * @throws {Error} - Throws an error if the query fails
   */
  async list() {
    try {
      const result = await pool.query(`
        SELECT *
        FROM classes
      `);
      const arr = result.rows;
      let objArr = [];
      for (let item of arr) {
        objArr.push(new Class(item));
      }
      return objArr;
    } catch (error) {
      console.error("Error listing users:", error);
      throw error;
    }
  },
  /**
   * Fetch a class by name
   * @param {string} name - The class name to search for
   * @returns {Object|null} - The class object or null if not found
   * @throws {Error} - Throws an error if the query fails
   * @example const class = await classService.findByName("Warrior");
   */
  async findByName(name) {
    try {
      const result = await pool.query(
        `
        SELECT *
        FROM classes
        WHERE name = $1
        `,
        [name]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching class by name:", error);
      throw error;
    }
  },

  /**
   * Fetch a class by its ID
   * @param {string} id - The class ID
   * @returns {Object|null} - The class object or null if not found
   * @throws {Error} - Throws an error if the query fails
   */
  async findById(id) {
    try {
      const result = await pool.query(
        `
        SELECT *
        FROM classes
        WHERE id = $1
        `,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching class by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new class
   * @param {Object} classData - The class data
   * @returns {Object} - The created class
   * @throws {Error} - Throws an error if the query fails
   */
  async createClass(classData) {
    try {
      const result = await pool.query(
        `
        INSERT INTO classes (id, name)
        VALUES ($1, $2)
        RETURNING id, name
        `,
        [classData.id, classData.name]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  /**
   * Update a class
   * @param {Object} classData - The updated class data
   * @returns {Object} - The updated class
   * @throws {Error} - Throws an error if the query fails
   */
  async updateClass(classData) {
    try {
      const result = await pool.query(
        `
        UPDATE classes
        SET name = $2
        WHERE id = $1
        RETURNING id, name
        `,
        [classData.id, classData.name]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  },
};

export default classService;