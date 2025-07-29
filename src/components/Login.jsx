import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { registered } = location.state || {}; // ✅ Read success flag

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(name, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1>Welcome Back!</h1>
      {registered && <p className="success">Account created successfully. Please log in.</p>}
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
