import React, { useState } from 'react';

export default function SubmitTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title.trim() || !description.trim() || !priority) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // TODO: Replace with real API call, e.g.:
      // await fetch('/api/tickets', { method: 'POST', body: JSON.stringify({ title, description, priority }) })

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSuccessMsg('Ticket submitted successfully!');
      setTitle('');
      setDescription('');
      setPriority('Medium');
    } catch (err) {
      setError('Failed to submit ticket. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Submit a New Ticket</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ ...styles.input, height: '100px' }}
            required
          />
        </label>

        <label style={styles.label}>
          Priority:
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={styles.input}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        {error && <div style={styles.error}>{error}</div>}
        {successMsg && <div style={styles.success}>{successMsg}</div>}

        <button type="submit" style={styles.button}>Submit Ticket</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1rem',
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

