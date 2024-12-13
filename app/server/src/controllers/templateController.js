import templateService from "../services/templateService.js";

const templateController = {
  /**
   * Create a new template
   */
  async createTemplate(req, res) {
    const { name, description } = req.body;

    try {
      const newTemplate = await templateService.createTemplate({
        name,
        description,
      });
      res.status(201).json(newTemplate);
    } catch (error) {
      console.error("Template creation error:", error.message);
      res.status(500).json({ error: "Failed to create template", message: error.message });
    }
  },

  /**
   * Fetch template by ID
   */
  async getTemplateById(req, res) {
    const { id } = req.params;

    try {
      const template = await templateService.findById(id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a template
   */
  async updateTemplate(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedTemplate = await templateService.updateTemplate(id, updates);
      if (!updatedTemplate) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(updatedTemplate);
    } catch (error) {
      console.error("Error updating template:", error.message);
      res.status(500).json({ error: "Failed to update template" });
    }
  },

  /**
   * Delete a template
   */
  async deleteTemplate(req, res) {
    const { id } = req.params;

    try {
      const isDeleted = await templateService.deleteTemplate(id);
      if (!isDeleted) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json({ message: "Template deleted successfully" });
    } catch (error) {
      console.error("Error deleting template:", error.message);
      res.status(500).json({ error: "Failed to delete template" });
    }
  },
};

export default templateController;
