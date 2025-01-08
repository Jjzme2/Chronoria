import characterService from "../services/characterService.js";

const characterController = {
  /**
   * Returns a list of all the characters
   */
  async getAll(req, res) {
    try {
      res.json(await characterService.list());
    } catch (error) {
      console.error("getAll error:", error.message);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  },
};

export default characterController;
