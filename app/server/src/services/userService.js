import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";

const userService = {
  /**
   * Login a user and generate a JWT token
   */
  async login(username, password) {
    const user = await User.findByUsername(username);
    if (!user) {
      const error = new Error("Invalid username or password");
      error.status = 401;
      throw error;
    }

    // Check if the account is active
    if (!user.active) {
      const error = new Error("Account is inactive");
      error.status = 403;
      throw error;
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid username or password");
      error.status = 401;
      throw error;
    }

    // Check role permissions
    if (user.application_role !== "developer") {
      const error = new Error("Access denied");
      error.status = 403;
      throw error;
    }

    // Generate JWT
    return generateToken({
      id: user.id,
      username: user.username,
      application_role: user.application_role,
    });
  },

  /**
   * Create a new user
   */
  async createUser({ username, password, applicationRole, communityRole }) {
    return await User.create({ username, password, applicationRole, communityRole });
  },
};

export default userService;
