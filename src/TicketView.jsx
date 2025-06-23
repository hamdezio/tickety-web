import React, { useState, useEffect } from 'react';

// Mock tickets database
const mockTickets = [
  {
    id: 101,
    title: 'Login Issue',
    description: 'Cannot log into my account with correct password.',
    status: 'Open',
    priority: 'High',
    ownerEmail: 'client@example.com',
  },
  {
    id: 102,
    title: 'Email Sync Failure',
    description: 'My emails are not syncing properly on mobile.',
    status: 'Pending',
    priority: 'Medium',
    ownerEmail: 'client@example.com',
  },
];

// Possible statuses and priorities
const STATUS_OPTIONS = ['Open', 'Pending', 'Resolved', 'Closed'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export default function TicketView({ ticketId, user }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    // Simulate fetching ticket by ID
    const found = mockTickets.find(t => t.id === Number(ticketId));
    if (!found) {
      setError('Ticket not found.');
      setLoading(false);
      return;
    }
    setTicket(found);
    setEditStatus(found.status);
    setEditPriority(found.priority);
    setLoading(false);
  }, [ticketId]);

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!ticket) return null; // should not happen but safety

  const isAdmin = user?.role === 'admin';
  const isOwner = user?.email === ticket.ownerEmail;

  // Only admins can edit status and priority
  const canEdit = isAdmin;

  const handleSave = () => {
    setSaveMsg('');
    setError('');
    // Simulate API call to save updates
    setTimeout(() => {
      setTicket(prev => ({
        ...prev,
        status: editStatus,
        priority: editPriority,
      }));
      setSaveMsg('Ticket updated successfully!');
    }, 700);
  };

  return (
    <div style={styles.container}>
      <h1>Ticket #{ticket.id}</h1>
      <h2>{ticket.title}</h2>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Submitted by:</strong> {ticket.ownerEmail}</p>

      <div style={styles.field}>
        <strong>Status:</strong>{' '}
        {canEdit ? (
          <select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}
            style={styles.select}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <span>{ticket.status}</span>
        )}
      </div>

      <div style={styles.field}>
        <strong>Priority:</strong>{' '}
        {canEdit ? (
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            style={styles.select}
          >
            {PRIORITY_OPTIONS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        ) : (
          <span>{ticket.priority}</span>
        )}
      </div>

      {canEdit && (
        <>
          <button onClick={handleSave} style={styles.saveButton}>
            Save Changes
          </button>
          {saveMsg && <p style={{ color: 'green' }}>{saveMsg}</p>}
        </>
      )}

      {!canEdit && !isOwner && (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>
          You do not have permission to modify this ticket.
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  field: {
    marginTop: '1rem',
  },
  select: {
    fontSize: '1rem',
    padding: '0.3rem 0.5rem',
  },
  saveButton: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
