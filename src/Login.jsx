import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Clear previous error
    setError('');

    try {
      // TODO: Replace with real API call
      // Example:
      // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })

      // Mock authentication logic
      if (email === 'admin@example.com' && password === 'admin123') {
        onLoginSuccess({ email, role: 'admin' });
      } else if (email === 'client@example.com' && password === 'client123') {
        onLoginSuccess({ email, role: 'client' });
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <h2>Login to Tickety</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button}>Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  input: {
    marginTop: '0.25rem',
    padding: '0.5rem',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};
