import userService from "../services/userService.js";

const userController = {
  /**
   * Handle user login
   */
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const token = await userService.login(username, password);
      res.json({ token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  /**
   * Create a new user
   */
  async createUser(req, res) {
    const { username, password, applicationRole, communityRole } = req.body;

    try {
      const newUser = await userService.createUser({
        username,
        password,
        applicationRole,
        communityRole,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("User creation error:", error.message);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  /**
   * Handle user logout
   */
  async logout(req, res) {
    try {
      // Clear the user session or token
      req.session = null;
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ error: "Failed to logout" });
    }
  },
};

export default userController;
