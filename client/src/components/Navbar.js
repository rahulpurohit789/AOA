import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">AI Job Scheduler</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">Create Job</Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link">Schedule</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 