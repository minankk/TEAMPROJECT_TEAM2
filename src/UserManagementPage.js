import React, { useState, useEffect } from 'react';
import "./UserManagementPage.css";

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
    const [showVIPSection, setShowVIPSection] = useState(false);
const [vipMembers, setVipMembers] = useState([]);
const [vipPayments, setVipPayments] = useState([]);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5001/admin/users/viewall-users', {
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
            const response = await fetch('http://localhost:5001/admin/users/create-users', {
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
            const response = await fetch(`http://localhost:5001/admin/users/update-users/${selectedUser.user_id}`, {
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
            const response = await fetch(`http://localhost:5001/admin/users/delete-users/${id}`, {
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
    const toggleVIPSection = async () => {
        setShowVIPSection(!showVIPSection);
        if (!showVIPSection) {
            try {
                const [membersRes, paymentsRes] = await Promise.all([
                    fetch("http://localhost:5001/admin/membership/vip-members", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch("http://localhost:5001/admin/membership/vip-members/payment", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);
                const members = await membersRes.json();
                const payments = await paymentsRes.json();
                setVipMembers(members);
                setVipPayments(payments);
            } catch (err) {
                setMessage("Failed to load VIP data");
            }
        }
    };
    const cancelVIP = async (user_id) => {
        try {
            const response = await fetch("http://localhost:5001/admin/membership/cancel-vip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ user_id })
            });
            const data = await response.json();
            setMessage(data.message);
            toggleVIPSection(); // refresh VIP list
        } catch (err) {
            setMessage("Failed to cancel VIP");
        }
    };
    

    return (
        <div className="user-management-page">
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
            <button className="create-user-btn" onClick={createUser}>Create User</button>
          </div>
      
          {/* User List */}
          <div>
            <h3>User List</h3>
            <ul>
              {users.map((user) => (
                <li key={user.user_id}>
                  <span>{user.user_name} - {user.email} - {user.role}</span>
                  <div className="button-group">
                    <button className="update-btn" onClick={() => selectUserForUpdate(user)}>Update</button>
                    <button className="delete-btn" onClick={() => deleteUser(user.user_id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      
          {/* Update User Form */}
          {selectedUser && (
            <div className="update-form">
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
      
          {/* ✅ VIP Section Starts Here */}
          <button className="vip-toggle-btn" onClick={toggleVIPSection}>
            {showVIPSection ? "Hide VIP Management" : "Show VIP Management"}
          </button>
      
          {showVIPSection && (
            <div className="vip-section">
              <h3>VIP Members</h3>
              <ul>
                {vipMembers.map((vip) => (
                  <li key={vip.user_id}>
                    <span>{vip.user_name} - {vip.email}</span>
                    <button className="delete-btn" onClick={() => cancelVIP(vip.user_id)}>Cancel VIP</button>
                  </li>
                ))}
              </ul>
      
              <h3>VIP Payment History</h3>
              <ul>
                {vipPayments.map((payment) => (
                  <li key={payment.membership_payment_id}>
                    {payment.user_name} - £{payment.amount} on {payment.payment_date} (Status: {payment.payment_status})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };      
export default UserManagementPage;