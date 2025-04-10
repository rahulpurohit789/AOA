import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    category: 'all',
    status: 'all',
    assignedTo: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs/')
      .then(response => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteJob = (id) => {
    axios.delete('http://localhost:5000/api/jobs/'+id)
      .then(response => { console.log(response.data)});

    setJobs(jobs.filter(el => el._id !== id));
  };

  const updateProgress = (id, progress) => {
    axios.post('http://localhost:5000/api/jobs/update/'+id, { progress })
      .then(response => {
        setJobs(jobs.map(job => 
          job._id === id ? { ...job, progress } : job
        ));
      });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = filter.category === 'all' || job.category === filter.category;
    const matchesStatus = filter.status === 'all' || job.status === filter.status;
    const matchesAssignedTo = filter.assignedTo === 'all' || job.assignedTo === filter.assignedTo;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesStatus && matchesAssignedTo && matchesSearch;
  });

  return (
    <div className="container">
      <h3>Jobs</h3>
      
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="meeting">Meeting</option>
            <option value="deadline">Deadline</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={filter.assignedTo}
            onChange={(e) => setFilter({...filter, assignedTo: e.target.value})}
          >
            <option value="all">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {/* Add more options based on your users */}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Progress</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job._id}>
                <td>
                  <div>{job.title}</div>
                  <small className="text-muted">{job.description}</small>
                </td>
                <td>{job.category}</td>
                <td>{job.priority}</td>
                <td>{new Date(job.deadline).toLocaleDateString()}</td>
                <td>{job.duration} minutes</td>
                <td>{job.status}</td>
                <td>{job.assignedTo}</td>
                <td>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{width: `${job.progress}%`}}
                      aria-valuenow={job.progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {job.progress}%
                    </div>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    value={job.progress}
                    onChange={(e) => updateProgress(job._id, Number(e.target.value))}
                  />
                </td>
                <td>
                  {job.tags.map((tag, index) => (
                    <span key={index} className="badge bg-info me-1">{tag}</span>
                  ))}
                </td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList; 