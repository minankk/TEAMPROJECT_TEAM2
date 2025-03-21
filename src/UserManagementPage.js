import React, { useState, useEffect } from 'react';
import './UserMessagesPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        user_name: '',
        email: '',
        password: '',
        role: 'user', // Default role
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        user_name: '',
        email: '',
        role: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token'); // Get the token

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5001/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleInputChange = (e, userType) => {
        const { name, value } = e.target;
        if (userType === 'new') {
            setNewUser({ ...newUser, [name]: value });
        } else if (userType === 'update') {
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };

    const createUser = async () => {
        try {
            const response = await fetch('http://localhost:5001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser),
            });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                fetchUsers();
                setNewUser({ user_name: '', email: '', password: '', role: 'user' }); // Reset form
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const selectUserForUpdate = (user) => {
        setSelectedUser(user);
        setUpdatedUser({
            user_name: user.user_name,
            email: user.email,
            role: user.role,
            password: '',
        });
    };

    const updateUser = async () => {
        try {
            const response = await fetch(`http://localhost:5001/users/${selectedUser.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUser),
            });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                fetchUsers();
                setSelectedUser(null);
                setUpdatedUser({ user_name: '', email: '', role: '', password: '' });
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            {message && <p>{message}</p>}

            {/* Create User Form */}
            <div>
                <h3>Create User</h3>
                <input type="text" name="user_name" placeholder="Username" value={newUser.user_name} onChange={(e) => handleInputChange(e, 'new')} />
                <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={(e) => handleInputChange(e, 'new')} />
                <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={(e) => handleInputChange(e, 'new')} />
                <select name="role" value={newUser.role} onChange={(e) => handleInputChange(e, 'new')}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={createUser}>Create User</button>
            </div>

            {/* User List */}
            <div>
                <h3>User List</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.user_id}>
                            {user.user_name} - {user.email} - {user.role}
                            <button onClick={() => selectUserForUpdate(user)}>Update</button>
                            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Update User Form */}
            {selectedUser && (
                <div>
                    <h3>Update User</h3>
                    <input type="text" name="user_name" placeholder="Username" value={updatedUser.user_name} onChange={(e) => handleInputChange(e, 'update')} />
                    <input type="email" name="email" placeholder="Email" value={updatedUser.email} onChange={(e) => handleInputChange(e, 'update')} />
                    <select name="role" value={updatedUser.role} onChange={(e) => handleInputChange(e, 'update')}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type="password" name="password" placeholder="New Password" value={updatedUser.password} onChange={(e) => handleInputChange(e, 'update')} />
                    <button onClick={updateUser}>Update User</button>
                    <button onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;