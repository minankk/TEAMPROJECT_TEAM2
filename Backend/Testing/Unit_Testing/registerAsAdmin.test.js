require("dotenv").config();

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

describe("Admin Signup", () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });

  //register as admin -positive flow
  test("should register a new admin successfully", async () => {
      db.query.mockResolvedValue([[]]);
      const hashedPassword = "$2a$08$/mCfRcBoL/ucBc19AXzQ4.tIpsI0REGCbCWJbxvQAQATNWMYQejUG";
      bcrypt.hash.mockResolvedValue(hashedPassword);
      jwt.sign.mockReturnValue("jwtToken");

      const req = {
          body: {
              username: "Ashmin",
              email: "admin@example.com",
              password: "Admin@1234",
              password_confirmation: "Admin@1234",
              adminSecretKey: process.env.ADMIN_SECRET_KEY,
          },
      };

      const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };

      await authController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
          message: "Admin registration request sent for approval",
          token: "jwtToken",
          role: "admin",
      });
      console.log(db.query.mock.calls);

      expect(db.query).toHaveBeenCalledTimes(3);
      expect(db.query).toHaveBeenCalledWith("SELECT email FROM users WHERE email = ?", ["admin@example.com"]);

      expect(db.query).toHaveBeenCalledWith(
          "INSERT INTO users (user_name, email, password, role, approval_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
          expect.arrayContaining([
              "Ashmin",
              "admin@example.com",
              expect.stringMatching(/^\$2[ayb]\$.{56}$/),
              "admin",
              "pending",
          ])
      );
  });

  //admin secret key missing
  test("should return an error if adminSecretKey is missing", async () => {
    const req = {
        body: {
            username: "Ashmin",
            email: "admin@example.com",
            password: "Admin@1234",
            password_confirmation: "Admin@1234",
            role: "admin",
        },
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin secret key is required for admin registration" });
    expect(db.query).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
});

//admin secret key is invalid
test("should return an error if adminSecretKey is incorrect", async () => {
  const req = {
      body: {
          username: "Ashmin",
          email: "admin@example.com",
          password: "Admin@1234",
          password_confirmation: "Admin@1234",
          adminSecretKey: "incorrectSecretKey",
      },
  };

  const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  await authController.signup(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.json).toHaveBeenCalledWith({ message: "Invalid admin secret key" });
  expect(db.query).not.toHaveBeenCalled();
  expect(bcrypt.hash).not.toHaveBeenCalled();
});

//email already exist
test("should return an error if email already exists", async () => {
  db.query.mockResolvedValue([[{ email: "admin@example.com" }]]);

  const req = {
      body: {
          username: "Ashmin",
          email: "admin@example.com",
          password: "Admin@1234",
          password_confirmation: "Admin@1234",
          adminSecretKey: process.env.ADMIN_SECRET_KEY,
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

});