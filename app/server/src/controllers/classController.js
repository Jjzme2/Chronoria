import classService from "../services/classService.js";

const classController = {
  /**
   * Returns a list of all the classes
    */
   async getAll(req, res) {
	try{
		res.json(await classService.list());
	}
	catch(error){
      console.error("getAll error:", error.message);
      res.status(500).json({ error: "Internal server error", message: error.message });	}
   },
};

export default classController;