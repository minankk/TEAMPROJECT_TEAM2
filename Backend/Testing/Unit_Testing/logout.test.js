require("dotenv").config();

const authController = require("../../controllers/authController");
const jwt = require('jsonwebtoken');
const db = require('../../db');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../../db', () => ({
  execute: jest.fn(),
}));

describe('Logout Function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //logout successfully
  test('should blacklist token and return 200 on successful logout', async () => {
    const token = 'validToken';
    const decoded = { exp: 1234567890 };
    req.header.mockReturnValue(`Bearer ${token}`);
    jwt.verify.mockReturnValue(decoded);
    db.execute.mockResolvedValue([]);

    await authController.logout(req, res); 

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET_KEY);
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO blacklisted_tokens (token, expires_at) VALUES (?, FROM_UNIXTIME(?))',
      [token, decoded.exp]
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful' });
  });

  //logout negative flow
  test('should return 400 if no token is provided', async () => {
    req.header.mockReturnValue(null);

    await authController.logout(req, res); 

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });

  //token invalid
  test('should return 400 if token is invalid', async () => {
    const token = 'invalidToken';
    req.header.mockReturnValue(`Bearer ${token}`);
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await authController.logout(req, res); 

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });
});