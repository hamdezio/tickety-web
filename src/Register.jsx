import React, { useState } from 'react';

export default function Register({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validateEmail = (email) => {
    // Simple email regex for basic validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name || !email || !password || !role) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // TODO: Replace with real API call
    try {
      // Example mock response delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate success
      setSuccessMsg('Registration successful! You can now log in.');
      onRegisterSuccess && onRegisterSuccess();

      // Optionally clear form:
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={styles.input}
            required
          />
        </label>

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

        <label style={styles.label}>
          Role:
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select role</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error && <div style={styles.error}>{error}</div>}
        {successMsg && <div style={styles.success}>{successMsg}</div>}

        <button type="submit" style={styles.button}>Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login here</a>
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
  success: {
    color: 'green',
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
  },
};
