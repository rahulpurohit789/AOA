import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-calendar-check me-2 fs-4"></i>
          <span className="fw-bold" style={{ 
            background: 'linear-gradient(45deg, #6b48ff, #00d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem'
          }}>
            AI Job Scheduler
          </span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-list-task me-1"></i>
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                <i className="bi bi-plus-circle me-1"></i>
                Create Job
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link">
                <i className="bi bi-calendar-week me-1"></i>
                Schedule
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 