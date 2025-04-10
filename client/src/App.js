import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import CreateJob from './components/CreateJob';
import Schedule from './components/Schedule';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="text-center my-4">
          <img 
            src="/logo.png" 
            alt="AI Job Scheduler Logo" 
            className="logo-img mb-4"
            style={{ width: '150px', height: 'auto' }}
          />
          <h1 className="display-4 mb-4">AI Job Scheduler</h1>
          <p className="lead text-muted">
            Intelligent job scheduling using greedy algorithms for optimal task management
          </p>
        </div>
        <Routes>
          <Route path="/" element={<JobList/>} />
          <Route path="/create" element={<CreateJob/>} />
          <Route path="/schedule" element={<Schedule/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
