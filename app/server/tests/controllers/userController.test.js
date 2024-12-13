import userController from '../../controllers/userController.js';
import userService from '../../services/userService.js';

jest.mock('../../services/userService.js');

describe('userController', () => {
  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
          email: 'testuser@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.createUser.mockResolvedValue({
        id: 1,
        username: 'Testuser',
        email: 'testuser@example.com',
      });

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        username: 'Testuser',
        email: 'testuser@example.com',
      });
    });

    it('should handle errors correctly', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
          email: 'testuser@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.createUser.mockRejectedValue(new Error('Failed to create user'));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create user',
        message: 'Failed to create user',
      });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.findByUsername.mockResolvedValue({
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        active: true,
      });
      userService.verifyPassword.mockResolvedValue(true);
      userService.generateUserToken.mockReturnValue('token');

      await userController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should handle errors correctly', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.findByUsername.mockRejectedValue(new Error('Internal server error'));

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Internal server error',
        message: 'Internal server error',
      });
    });
  });
});
