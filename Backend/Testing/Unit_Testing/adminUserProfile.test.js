const bcrypt = require('bcryptjs');
const controller = require('../../controllers/adminUserProfileController');
const db = require('../../db');

jest.mock('../../db');

describe('Admin User Profile Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // CREATE USER
  test('should create a user successfully', async () => {
    const req = {
      body: {
        user_name: 'testuser',
        email: 'test@example.com',
        password: '123456',
        role: 'admin',
      },
    };

    db.execute.mockResolvedValueOnce(); // INSERT INTO users

    await controller.createUser(req, res);

    expect(db.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
  });

  test('should return 400 if any field is missing during user creation', async () => {
    const req = {
      body: {
        user_name: '',
        email: 'test@example.com',
        password: '',
        role: '',
      },
    };

    await controller.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  // GET ALL USERS
  test('should fetch all users', async () => {
    const req = {};
    const mockUsers = [{ user_id: 1, user_name: 'John', email: 'john@example.com', role: 'user' }];
    db.execute.mockResolvedValueOnce([mockUsers]);

    await controller.getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // GET SPECIFIC USER
  test('should fetch a specific user by ID', async () => {
    const req = { params: { id: '1' } };
    const mockUser = [{ user_id: 1, user_name: 'John', email: 'john@example.com', role: 'user' }];
    db.execute.mockResolvedValueOnce([mockUser]);

    await controller.getSpecificUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser[0]);
  });

  test('should return 404 if specific user not found', async () => {
    const req = { params: { id: '999' } };
    db.execute.mockResolvedValueOnce([[]]);

    await controller.getSpecificUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  // UPDATE USER
  test('should update a user with provided fields', async () => {
    const req = {
      params: { id: '1' },
      body: {
        user_name: 'UpdatedUser',
        email: 'updated@example.com',
        role: 'editor',
        password: 'newpassword',
      },
    };

    db.execute.mockResolvedValueOnce(); // UPDATE users

    await controller.updateUser(req, res);

    expect(db.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
  });

  test('should return 400 if no fields to update', async () => {
    const req = { params: { id: '1' }, body: {} };

    await controller.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'No fields to update' });
  });

  // DELETE USER
  test('should delete a user and associated data', async () => {
    const req = { params: { id: '1' } };
    db.execute
      .mockResolvedValueOnce() // wishlist
      .mockResolvedValueOnce() // order_tracking
      .mockResolvedValueOnce() // order_items
      .mockResolvedValueOnce() // orders
      .mockResolvedValueOnce([{ affectedRows: 1 }]); // users

    await controller.deleteUser(req, res);

    expect(db.execute).toHaveBeenCalledTimes(5);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  test('should return 404 if user to delete does not exist', async () => {
    const req = { params: { id: '999' } };
    db.execute
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockResolvedValueOnce([{ affectedRows: 0 }]);

    await controller.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found or already deleted' });
  });
});