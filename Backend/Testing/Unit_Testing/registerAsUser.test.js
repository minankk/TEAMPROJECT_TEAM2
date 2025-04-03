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

    expect(db.query).toHaveBeenCalledTimes(3);
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

  //email already exist scenario
  test("should return an error if email already exists", async () => {
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
    expect(res.json).toHaveBeenCalledWith({ message: "Email already registered. Please login" });
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //invalid email format scenario
  test("should return an error for invalid email format", async () => {
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
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid email format" });
    expect(db.query).not.toHaveBeenCalled();
  });

  //password do not match 
  test("should return an error if passwords do not match", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
        password_confirmation: "DifferentPassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Password does not match" });
    expect(db.query).not.toHaveBeenCalled(); 
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //password is too weak
  test("should return an error if password is too weak", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "weak",
        password_confirmation: "weak",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character",
      success: false,
    });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //password complexity requirement
  test("should return an error if password does not meet complexity requirements", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "password123",
        password_confirmation: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character",
      success: false,
    });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //user name field missing
  test("should return an error if username is missing", async () => {
    const req = {
      body: {
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
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //email field missing
  test("should return an error if email is missing", async () => {
    const req = {
      body: {
        username: "Ashmin",
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
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //password field missing
  test("should return an error if password is missing", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password_confirmation: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //password confirmation field missing
  test("should return an error if password_confirmation is missing", async () => {
    const req = {
      body: {
        username: "Ashmin",
        email: "ashminabishaj@gmail.com",
        password: "Ashmin@1311",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //all fields are missing
  test("should return an error if all fields are missing", async () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  //query fails
  test("should return a 500 error if the email check query fails", async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    db.query.mockRejectedValue(new Error("Database error"));
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
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).not.toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });
});