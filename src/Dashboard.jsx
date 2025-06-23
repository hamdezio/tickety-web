import React from 'react';

// Sample mock ticket data
const mockTickets = [
  { id: 101, title: 'Login Issue', status: 'Open', priority: 'High', ownerEmail: 'client@example.com' },
  { id: 102, title: 'Email Sync Failure', status: 'Pending', priority: 'Medium', ownerEmail: 'client@example.com' },
  { id: 103, title: 'Page not loading', status: 'Resolved', priority: 'Low', ownerEmail: 'otherclient@example.com' },
  { id: 104, title: 'Feature request', status: 'Open', priority: 'Low', ownerEmail: 'client@example.com' },
];

// Utility: counts tickets by status
function countByStatus(tickets) {
  return tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
}

// Utility: counts tickets by priority
function countByPriority(tickets) {
  return tickets.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {});
}

export default function Dashboard({ user }) {
  if (!user) {
    return <p>Please log in to view the dashboard.</p>;
  }

  const isAdmin = user.role === 'admin';

  // Filter tickets by owner for clients
  const userTickets = isAdmin ? mockTickets : mockTickets.filter(t => t.ownerEmail === user.email);

  // For admin: summary stats
  const statusCounts = countByStatus(mockTickets);
  const priorityCounts = countByPriority(mockTickets);

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <h3>Welcome, {user.email} ({user.role})</h3>

      {isAdmin ? (
        <>
          <section style={styles.section}>
            <h2>Ticket Summary</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statBox}>
                <h3>Total Tickets</h3>
                <p>{mockTickets.length}</p>
              </div>
              <div style={styles.statBox}>
                <h3>By Status</h3>
                <ul>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <li key={status}>{status}: {count}</li>
                  ))}
                </ul>
              </div>
              <div style={styles.statBox}>
                <h3>By Priority</h3>
                <ul>
                  {Object.entries(priorityCounts).map(([priority, count]) => (
                    <li key={priority}>{priority}: {count}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a href="/tickets.html" style={styles.linkButton}>View All Tickets</a>
          </section>
        </>
      ) : (
        <>
          <section style={styles.section}>
            <h2>My Tickets</h2>
            {userTickets.length === 0 ? (
              <p>You have no submitted tickets.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th><th>Title</th><th>Status</th><th>Priority</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.title}</td>
                      <td>{ticket.status}</td>
                      <td>{ticket.priority}</td>
                      <td><a href={`/ticket.html?id=${ticket.id}`}>View</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <a href="/submit.html" style={styles.linkButton}>Submit New Ticket</a>
          </section>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'flex',
    gap: '1rem',
  },
  statBox: {
    flex: 1,
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#f9fafb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  linkButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};
