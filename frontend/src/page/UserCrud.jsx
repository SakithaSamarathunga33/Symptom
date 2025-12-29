import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Create or Update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(API_URL, formData);
            }
            setFormData({ name: '', email: '', role: 'user' });
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    // Edit user
    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email, role: user.role });
        setEditingId(user._id);
    };

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="crud-container">
            <h2 className="crud-title">User Management</h2>

            <form onSubmit={handleSubmit} className="crud-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">
                    {editingId ? 'Update User' : 'Add User'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                            setEditingId(null);
                            setFormData({ name: '', email: '', role: 'user' });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="user-list">
                {loading ? (
                    <p className="loading-text">Loading users...</p>
                ) : users.length === 0 ? (
                    <p className="no-users-text">No users found. Add one above!</p>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                                <span className={`user-role role-${user.role}`}>{user.role}</span>
                            </div>
                            <div className="user-actions">
                                <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .crud-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          color: var(--text-main);
        }
        .crud-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          background: linear-gradient(to right, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .crud-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 12px;
          display: grid;
          gap: 1rem;
          margin-bottom: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .form-input, .form-select {
          width: 100%;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
        }
        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: var(--primary);
        }
        .submit-btn {
          background: var(--primary);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .submit-btn:hover {
          opacity: 0.9;
        }
        .cancel-btn {
          background: #dc3545;
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
        }
        .user-list {
          display: grid;
          gap: 1rem;
        }
        .user-card {
          background: rgba(255, 255, 255, 0.03);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s;
        }
        .user-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.05);
        }
        .user-info h3 {
          margin-bottom: 0.25rem;
          font-size: 1.2rem;
        }
        .user-email {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .user-role {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .role-admin { background: rgba(220, 53, 69, 0.2); color: #ff6b6b; }
        .role-editor { background: rgba(255, 193, 7, 0.2); color: #ffd43b; }
        .role-user { background: rgba(88, 166, 255, 0.2); color: #79c0ff; }
        
        .user-actions {
          display: flex;
          gap: 0.5rem;
        }
        .edit-btn, .delete-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .edit-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .delete-btn {
          background: rgba(220, 53, 69, 0.1);
          color: #ff6b6b;
        }
        .edit-btn:hover { background: rgba(255, 255, 255, 0.2); }
        .delete-btn:hover { background: rgba(220, 53, 69, 0.2); }
      `}</style>
        </div>
    );
};

export default UserCrud;
