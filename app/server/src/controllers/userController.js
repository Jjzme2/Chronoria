import userService from "../services/userService.js";
import jwtUtils from "../utils/jwtUtils.js";
import { setCookie } from "../utils/cookieUtils.js"; // New utility to handle cookie setting

const userController = {
  /**
   * Returns a list of all the users
   */
  async getAll(req, res) {
    try {
      res.json(await userService.list());
    } catch (error) {
      console.error("getAll error:", error.message);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  },

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

      // Generate access and refresh tokens
      const accessToken = userService.generateUserToken(user); // Short-lived token
      const refreshToken = userService.generateRefreshToken(user); // Long-lived refresh token

      // Set tokens in HttpOnly cookies (Ensure cookieUtils.js is implemented)
      setCookie(res, "accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000,
      }); // 15 minutes
      setCookie(res, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }); // 7 days

      // Decode the access token for the client-side
      const decoded = jwtUtils.decodeToken(accessToken);

      return res.json({
        message: "Login successful",
        decoded: decoded,
        accessToken: accessToken,
        redirectUrl: "/",
      });
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
      // Clear both access and refresh tokens from the cookies
      res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "Strict" });
      res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });

      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ error: "Failed to logout" });
    }
  },

  /**
   * Refresh the access token using the refresh token stored in cookies
   */
  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token is missing or expired" });
    }

    try {
      // Verify the refresh token and generate a new access token
      const decoded = jwtUtils.verifyRefreshToken(refreshToken);
      const user = await userService.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const newAccessToken = userService.generateUserToken(user);
      setCookie(res, "accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000,
      }); // 15 minutes

      return res.json({
        message: "Access token refreshed",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error.message);
      res.status(403).json({ error: "Invalid refresh token" });
    }
  },
};

export default userController;
