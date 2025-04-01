jest.mock("../../db", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

const authController = require("../../controllers/authController");
const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

describe("User Signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // User should register successfully (positive flow)
  test("should register a new user successfully", async () => {
    db.query.mockResolvedValue([[]]);
    const hashedPassword = "$2a$08$/mCfRcBoL/ucBc19AXzQ4.tIpsI0REGCbCWJbxvQAQATNWMYQejUG"; 
    bcrypt.hash.mockResolvedValue(hashedPassword);

    jwt.sign.mockReturnValue("jwtToken"); 

    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      token: "jwtToken",
      role: "user",
    });

    expect(db.query).toHaveBeenCalledTimes(2);
    expect(db.query).toHaveBeenCalledWith('SELECT email FROM users WHERE email = ?', ["ashminabishaj@gmail.com"]);

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO users (user_name, email, password, role, approval_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      expect.arrayContaining([
        "Ashmin", 
        "ashminabishaj@gmail.com", 
        expect.stringMatching(/^\$2[ayb]\$.{56}$/), 
        "user",
        null
      ]) 
    );
  });

  // Email already exists test scenario
  test("should not register a user if email already exists", async () => {
    db.query.mockResolvedValue([[{ email: "ashminabishaj@gmail.com" }]]);

    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already registered. Please login" });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith('SELECT email FROM users WHERE email = ?', ["ashminabishaj@gmail.com"]);
  });

  //password do not match scenario
  test("should return an error if passwords do not match", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1234", 
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Passwords do not match" });
  
    expect(db.query).not.toHaveBeenCalled(); 
  });

  //password is too weak scenario
  test("should return an error if the password is too weak", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "12345", 
        password_confirmation: "12345",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character." });
  
    expect(db.query).not.toHaveBeenCalled(); 
  });
  
  //field is missing scenario
  test("should return an error if required fields are missing", async () => {
    const req = {
      body: {
        username: "",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  
    expect(db.query).not.toHaveBeenCalled(); // No database interaction
  });
  
  //invalid email format
  test("should return an error if email format is invalid", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "invalid-email",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email format" });
  
    expect(db.query).not.toHaveBeenCalled(); 
  });

  //database error
  test("should return a 500 error if there is a database error", async () => {
    db.query.mockRejectedValue(new Error("Database connection failed"));
  
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong. Please try again later." });
  
    expect(db.query).toHaveBeenCalledTimes(1);
  });
  
  //user name already exist
  test("should not register a user if username already exists", async () => {
    db.query.mockResolvedValue([[{ username: "Ashmin" }]]); 
  
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await authController.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Username already taken" });
  
    expect(db.query).toHaveBeenCalledTimes(1);
  });
  
  
});

