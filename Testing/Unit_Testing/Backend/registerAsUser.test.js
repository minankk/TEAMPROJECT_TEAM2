const authController = require("../controllers/authController"); 
const db = require("../db");
const bcrypt = require("bcryptjs");

// Mock the `db.execute` method to avoid real DB calls
jest.mock("../db");

describe("User Signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //user to register successfully - positive flow
  test("should register a new user successfully", async () => {
    db.execute.mockResolvedValue([[]]);
    jest.spyOn(bcrypt, "hash").mockResolvedValue("Ashmin@1311");

    const userData = {
      user_name: "Ashmin",
      email: "ashminabishaj@gmail.com",
      password: "Ashmin@1311",
      role: "user",
    };

    const result = await authController.signupUser(userData); 
    expect(result).toEqual({ message: "User registered successfully" });
    expect(db.execute).toHaveBeenCalledTimes(2);  
  });

  //Email already exist test scenario
  test("should not register a user if email already exists", async () => {
    db.execute.mockResolvedValue([[{ email: "ashminabishaj@gmail.com" }]]);

    const userData = {
      user_name: "Ashmin",
      email: "ashminabishaj@gmail.com",
      password: "Ashmin@1311",
      role: "user",
    };

    await expect(authController.signupUser(userData)).rejects.toThrow("Email already exists");
    expect(db.execute).toHaveBeenCalledTimes(1);
  });
});
