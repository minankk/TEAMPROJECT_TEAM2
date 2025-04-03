const authController = require("../../controllers/authController");
const db = require("../../db");

jest.mock("../../db", () => ({
  execute: jest.fn(),
}));

describe("Approve or Reject Admin Signup", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      query: { email: "admin@example.com" },
      body: { action: "approve" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //approve as admin successfully
  test("should approve an admin successfully", async () => {
    db.execute
      .mockResolvedValueOnce([[{ email: "admin@example.com", approval_status: "pending" }]]) 
      .mockResolvedValueOnce([]); 

    await authController.approveAdmin(req, res);

    expect(db.execute).toHaveBeenCalledTimes(2);
    expect(db.execute).toHaveBeenCalledWith("SELECT * FROM users WHERE email = ?", ["admin@example.com"]);
    expect(db.execute).toHaveBeenCalledWith("UPDATE users SET approval_status = ? WHERE email = ?", ["approved", "admin@example.com"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin approved successfully" });
  });

  //reject an admin successfully
  test("should reject an admin successfully", async () => {
    req.body.action = "reject";
    db.execute
      .mockResolvedValueOnce([[{ email: "admin@example.com", approval_status: "pending" }]])
      .mockResolvedValueOnce([]);

    await authController.approveAdmin(req, res);

    expect(db.execute).toHaveBeenCalledTimes(2);
    expect(db.execute).toHaveBeenCalledWith("UPDATE users SET approval_status = ? WHERE email = ?", ["rejected", "admin@example.com"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin rejected successfully" });
  });

  //invalid email action
  test("should return 400 if email or action is missing", async () => {
    req.query.email = ""; 
    req.body.action = "";

    await authController.approveAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid request" });
  });

  //user is not found
  test("should return 404 if user is not found", async () => {
    db.execute.mockResolvedValueOnce([[]]); 

    await authController.approveAdmin(req, res);

    expect(db.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  //to return 400 error for invalid request
  test("should return 400 if action is invalid", async () => {
    req.body.action = "invalidAction";
    db.execute.mockResolvedValueOnce([[{ email: "admin@example.com" }]]); 

    await authController.approveAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid action" });
  });

  //database error
  test("should return 500 on database error", async () => {
    db.execute.mockRejectedValue(new Error("Database error"));

    await authController.approveAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
