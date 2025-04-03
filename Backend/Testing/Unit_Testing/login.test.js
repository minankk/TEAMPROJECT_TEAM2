require("dotenv").config();

const authController = require("../../controllers/authController");
const db = require("../../db");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

jest.mock("../../db", () => ({
  execute: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("User Login", () => {
  let req, res, mockUser, hashedPassword;

  beforeEach(async () => {
    req = {
      body: {
        username: "testuser",
        password: "correctpassword",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    hashedPassword = await bcrypt.hash("correctpassword", 10);

    mockUser = {
      user_id: 1,
      user_name: "testuser",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
    };

    db.execute.mockResolvedValue([[mockUser]]);

    jest.clearAllMocks();
  });

  test("should log in a user successfully", async () => {
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedJWTToken");
  
    await authController.login(req, res);
  
    console.log('res.status calls:', res.status.mock.calls);
    console.log('res.json calls:', res.json.mock.calls);
  
    expect(db.execute).toHaveBeenCalledWith("SELECT * FROM users WHERE user_name = ?", ["testuser"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "mockedJWTToken",
      user: {
        user_id: 1,
        username: "testuser",
        email: "test@example.com",
        role: "user",
      },
    });
  });
  test("should return an error if username or password is missing", async () => {
    req.body = { username: "", password: "" };

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "username and password are required",
    });
  });

  test("should return an error if user is not found", async () => {
    db.execute.mockResolvedValue([[]]);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please Sign Up" });
  });

  test("should return an error if password is incorrect", async () => {
    db.execute.mockResolvedValue([[mockUser]]);
    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Password do not match" });
    expect(bcrypt.compare).toHaveBeenCalledWith("correctpassword", mockUser.password);
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  test("should handle internal server errors", async () => {
    db.execute.mockRejectedValue(new Error("Database error"));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
