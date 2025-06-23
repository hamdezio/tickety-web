import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiConfig';

export default function Dashboard({ user, goToTicketView, goToSubmit, onLogout }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch(`${API_BASE_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch tickets');
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [token]);

  return (
    <div>
      <h2>Dashboard ({user.role})</h2>
      <button onClick={onLogout}>Logout</button>

      {user.role === 'client' && (
        <>
          <button onClick={goToSubmit}>Create New Ticket</button>
          <h3>Your Tickets</h3>
          {loading ? (
            <p>Loading...</p>
          ) : tickets.length === 0 ? (
            <p>No tickets submitted yet.</p>
          ) : (
            <ul>
              {tickets.map((t) => (
                <li key={t.ticket_id}>
                  <button onClick={() => goToTicketView(t.ticket_id)}>
                    {t.title} - {t.status}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {user.role === 'admin' && (
        <>
          <h3>All Tickets</h3>
          {loading ? (
            <p>Loading...</p>
          ) : tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <ul>
              {tickets.map((t) => (
                <li key={t.ticket_id}>
                  <button onClick={() => goToTicketView(t.ticket_id)}>
                    {t.title} - {t.status} (User: {t.user?.username || 'Unknown'})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
