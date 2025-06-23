import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import SubmitTicket from './SubmitTicket';
import TicketView from './TicketView';

export default function App() {
  // App state
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login'); // 'login', 'register', 'dashboard', 'submit', 'ticketview'
  const [viewTicketId, setViewTicketId] = useState(null);

  // Handlers for login & logout
  function handleLoginSuccess(userData) {
    setUser(userData);
    setPage('dashboard');
  }

  function handleLogout() {
    setUser(null);
    setPage('login');
  }

  // Handlers to switch pages
  function goToRegister() {
    setPage('register');
  }
  function goToLogin() {
    setPage('login');
  }
  function goToDashboard() {
    setPage('dashboard');
  }
  function goToSubmit() {
    setPage('submit');
  }
  function goToTicketView(id) {
    setViewTicketId(id);
    setPage('ticketview');
  }

  // Pass navigation props down so children can trigger page changes
  const navProps = {
    goToRegister,
    goToLogin,
    goToDashboard,
    goToSubmit,
    goToTicketView,
  };

  // Render according to current page
  if (!user) {
    if (page === 'register') {
      return <Register onRegisterSuccess={() => setPage('login')} {...navProps} />;
    }
    // default login page
    return <Login onLoginSuccess={handleLoginSuccess} {...navProps} />;
  }

  // User is logged in
  switch (page) {
    case 'dashboard':
      return (
        <>
          <Header user={user} onLogout={handleLogout} goToSubmit={goToSubmit} />
          <Dashboard user={user} goToTicketView={goToTicketView} />
        </>
      );
    case 'submit':
      return (
        <>
          <Header user={user} onLogout={handleLogout} goToDashboard={goToDashboard} />
          <SubmitTicket goToDashboard={goToDashboard} />
        </>
      );
    case 'ticketview':
      return (
        <>
          <Header user={user} onLogout={handleLogout} goToDashboard={goToDashboard} />
          <TicketView ticketId={viewTicketId} user={user} />
        </>
      );
    default:
      return (
        <>
          <Header user={user} onLogout={handleLogout} goToDashboard={goToDashboard} />
          <Dashboard user={user} goToTicketView={goToTicketView} />
        </>
      );
  }
}

// Simple header with navigation buttons
function Header({ user, onLogout, goToDashboard, goToSubmit }) {
  return (
    <header style={headerStyles.container}>
      <div>
        <strong>Logged in as:</strong> {user.email} ({user.role})
      </div>
      <nav style={headerStyles.nav}>
        <button onClick={goToDashboard} style={headerStyles.button}>Dashboard</button>
        {goToSubmit && <button onClick={goToSubmit} style={headerStyles.button}>Submit Ticket</button>}
        <button onClick={onLogout} style={headerStyles.button}>Logout</button>
      </nav>
    </header>
  );
}

const headerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#2563eb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
