import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig';

export default function Login({ onLoginSuccess, goToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Login to get token
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Login failed');
      }

      const { token } = await res.json();
      localStorage.setItem('token', token);

      // 2. Fetch /me endpoint to get user info including role
      const meRes = await fetch(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!meRes.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await meRes.json();

      // 3. Pass user info (username + role) up to App
      onLoginSuccess(userInfo);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        No account?{' '}
        <button onClick={goToRegister} type="button">
          Register here
        </button>
      </p>
    </div>
  );
}
