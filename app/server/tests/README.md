# Testing Guide

## Introduction to Testing

Testing is a crucial part of software development. It ensures that your code works as expected and helps to identify and fix bugs early in the development process. There are different types of testing, including unit tests and integration tests.

### Unit Tests

Unit tests are used to test individual units or components of a software application. The goal is to validate that each unit of the software performs as expected. Unit tests are typically written and run by developers.

### Integration Tests

Integration tests are used to test the integration of different modules or components of a software application. The goal is to ensure that the integrated components work together as expected. Integration tests are typically more complex than unit tests and may involve multiple components or systems.

## Writing Tests with Jest

Jest is a popular JavaScript testing framework that is used to write and run tests. It provides a simple and powerful API for writing tests and includes features like mocking, snapshot testing, and code coverage.

### Example: Writing Unit Tests with Jest

Here is an example of how to write unit tests using Jest:

```javascript
// Import the function to be tested
import { capitalize } from '../utils/stringUtil.js';

describe('capitalize', () => {
  it('should capitalize the first letter of each word in a string', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello world';
    expect(capitalize(input)).toBe(expectedOutput);
  });

  it('should handle empty strings correctly', () => {
    const input = '';
    const expectedOutput = '';
    expect(capitalize(input)).toBe(expectedOutput);
  });

  it('should handle strings with special characters correctly', () => {
    const input = 'hello-world';
    const expectedOutput = 'Hello-world';
    expect(capitalize(input)).toBe(expectedOutput);
  });
});
```

### Example: Writing Integration Tests with Jest

Here is an example of how to write integration tests using Jest:

```javascript
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
```

## References and Further Reading

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing JavaScript Applications](https://www.oreilly.com/library/view/testing-javascript-applications/9781491952696/)
- [Unit Testing Best Practices](https://martinfowler.com/bliki/UnitTest.html)
