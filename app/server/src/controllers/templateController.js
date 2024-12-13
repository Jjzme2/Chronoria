import placeholderService from "../services/placeholderService.js";
import logger from "../utils/logger.js";

const placeholderController = {
  /**
   * Create a new placeholder
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async createPlaceholder(req, res) {
    const { name, description } = req.body;

    try {
      const newPlaceholder = await placeholderService.createPlaceholder({
        name,
        description,
      });
      res.status(201).json(newPlaceholder);
    } catch (error) {
      logger.error("Placeholder creation error:", error.message);
      res.status(500).json({ error: "Failed to create placeholder", message: error.message });
    }
  },

  /**
   * Fetch placeholder by ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async getPlaceholderById(req, res) {
    const { id } = req.params;

    try {
      const placeholder = await placeholderService.findById(id);
      if (!placeholder) {
        return res.status(404).json({ error: "Placeholder not found" });
      }
      res.json(placeholder);
    } catch (error) {
      logger.error("Error fetching placeholder:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a placeholder
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async updatePlaceholder(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedPlaceholder = await placeholderService.updatePlaceholder(id, updates);
      if (!updatedPlaceholder) {
        return res.status(404).json({ error: "Placeholder not found" });
      }
      res.json(updatedPlaceholder);
    } catch (error) {
      logger.error("Error updating placeholder:", error.message);
      res.status(500).json({ error: "Failed to update placeholder" });
    }
  },

  /**
   * Delete a placeholder
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async deletePlaceholder(req, res) {
    const { id } = req.params;

    try {
      const isDeleted = await placeholderService.deletePlaceholder(id);
      if (!isDeleted) {
        return res.status(404).json({ error: "Placeholder not found" });
      }
      res.json({ message: "Placeholder deleted successfully" });
    } catch (error) {
      logger.error("Error deleting placeholder:", error.message);
      res.status(500).json({ error: "Failed to delete placeholder" });
    }
  },
};

export default placeholderController;
