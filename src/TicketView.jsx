import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiConfig';

export default function TicketView({ ticketId, user, goToDashboard }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchTicket() {
      try {
        const res = await fetch(`/tickets/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Ticket not found or access denied');
        const data = await res.json();
        setTicket(data);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [ticketId, token]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!ticket) return <p>Ticket not found.</p>;

  const canEdit = user.role === 'admin' || user.username === ticket.user?.username;

  return (
    <div>
      <h2>Ticket: {ticket.title}</h2>
      <p>Description: {ticket.description}</p>
      <p>Priority: {ticket.priority}</p>
      <p>
        Status:{' '}
        {canEdit ? (
          <select value={status} onChange={handleStatusChange}>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        ) : (
          status
        )}
      </p>
      <button onClick={goToDashboard}>Back to Dashboard</button>
    </div>
  );
}
