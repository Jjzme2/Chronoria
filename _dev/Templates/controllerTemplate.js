import CHANGETHISService from "../services/CHANGETHISService.js";

const CHANGETHISController = {
  /**
   * Returns a list of all the CHANGETHISs
   */
  async getAll(req, res) {
    try {
      res.json(await CHANGETHISService.list());
    } catch (error) {
      console.error("getAll error:", error.message);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  },
};

export default CHANGETHISController;
