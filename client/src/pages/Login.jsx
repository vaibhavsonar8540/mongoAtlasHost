import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3030/api/user/login", formData, {
                withCredentials: true,
            });

            // ✅ Save user & token to localStorage
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            alert(res.data.message);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#ff6600', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginForm;
