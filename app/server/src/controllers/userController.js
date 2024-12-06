import userService from "../services/userService.js";

const userController = {
  /**
   * Handle user login
   */
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Delegate login logic to the service
      const user = await userService.findByUsername(username);
      if (!user || !(await userService.verifyPassword(password, user.password))) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      if (!user.active) {
        return res.status(403).json({ error: "Account is inactive" });
      }

      const token = userService.generateUserToken(user);
      res.json({ token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  },

  /**
   * Create a new user
   */
  async createUser(req, res) {
    const { username, password, email } = req.body;

    try {
      // Delegate user creation to the service
      const newUser = await userService.createUser({
        username,
        password,
		email,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("User creation error:", error.message);
      res.status(500).json({ error: "Failed to create user", message: error.message });
    }
  },

  /**
   * Fetch user by ID
   */
  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await userService.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a user
   */
  async updateUser(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedUser = await userService.updateUser(id, updates);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.message);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  /**
   * Delete a user
   */
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const isDeleted = await userService.deleteUser(id);
      if (!isDeleted) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },

  /**
   * Handle user logout
   */
  async logout(req, res) {
    try {
      // Example logout logic: clear the session or token
      req.session = null; // Adjust this if you’re not using sessions
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ error: "Failed to logout" });
    }
  },
};

export default userController;
