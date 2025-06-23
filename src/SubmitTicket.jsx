import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig';

export default function SubmitTicket({ user, goToDashboard }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create ticket');
      }

      setSuccessMsg('Ticket created successfully!');
      setTitle('');
      setDescription('');
      setPriority('low');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create New Ticket</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Submit Ticket</button>
      </form>
      <button onClick={goToDashboard}>Back to Dashboard</button>
    </div>
  );
}
