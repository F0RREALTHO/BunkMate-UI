import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api.js';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      await api.post('/student', { name, password });
      navigate('/login', { state: { registered: true } }); // ✅ Pass success flag
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
