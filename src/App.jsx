import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import SubmitTicket from './SubmitTicket';
import TicketView from './TicketView';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setPage('login');
  };

  const goToTicketView = (ticketId) => {
    setSelectedTicketId(ticketId);
    setPage('ticketview');
  };

  const goToSubmit = () => setPage('submit');
  const goToLogin = () => setPage('login');
  const goToRegister = () => setPage('register');
  const goToDashboard = () => setPage('dashboard');

  return (
    <div>
      {page === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} goToRegister={goToRegister} />
      )}
      {page === 'register' && <Register goToLogin={goToLogin} />}
      {page === 'dashboard' && user && (
        <Dashboard
          user={user}
          goToTicketView={goToTicketView}
          goToSubmit={goToSubmit}
          onLogout={handleLogout}
        />
      )}
      {page === 'submit' && user && (
        <SubmitTicket user={user} goToDashboard={goToDashboard} />
      )}
      {page === 'ticketview' && selectedTicketId && user && (
        <TicketView ticketId={selectedTicketId} user={user} goToDashboard={goToDashboard} />
      )}
    </div>
  );
}
