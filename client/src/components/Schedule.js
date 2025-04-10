import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Schedule() {
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchScheduledJobs();
  }, []);

  const fetchScheduledJobs = () => {
    axios.get('http://localhost:5000/api/jobs/schedule')
      .then(response => {
        // Sort jobs considering dependencies
        const sortedJobs = sortJobsWithDependencies(response.data);
        setScheduledJobs(sortedJobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortJobsWithDependencies = (jobs) => {
    const jobMap = new Map(jobs.map(job => [job._id, job]));
    const sorted = [];
    const visited = new Set();

    const visit = (jobId) => {
      if (visited.has(jobId)) return;
      visited.add(jobId);

      const job = jobMap.get(jobId);
      if (job.dependencies && job.dependencies.length > 0) {
        job.dependencies.forEach(depId => visit(depId));
      }

      sorted.push(job);
    };

    jobs.forEach(job => visit(job._id));
    return sorted;
  };

  const updateStatus = (id, status) => {
    axios.post('http://localhost:5000/api/jobs/update/'+id, { 
      status,
      completedAt: status === 'completed' ? new Date() : undefined
    })
      .then(response => {
        console.log(response.data);
        fetchScheduledJobs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProgress = (id, progress) => {
    axios.post('http://localhost:5000/api/jobs/update/'+id, { progress })
      .then(response => {
        fetchScheduledJobs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Optimized Schedule</h3>
        <div className="view-toggle mb-4">
          <button 
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Dependencies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledJobs.map((job, index) => (
                <tr key={job._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{job.title}</div>
                    <small className="text-muted">{job.description}</small>
                  </td>
                  <td>{job.category}</td>
                  <td>{job.priority}</td>
                  <td>{new Date(job.deadline).toLocaleDateString()}</td>
                  <td>{job.duration} minutes</td>
                  <td>
                    <span className={`badge bg-${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
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
                    {job.dependencies && job.dependencies.map(depId => {
                      const depJob = scheduledJobs.find(j => j._id === depId);
                      return depJob ? (
                        <span key={depId} className="badge bg-info me-1">
                          {depJob.title}
                        </span>
                      ) : null;
                    })}
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={job.status}
                      onChange={(e) => updateStatus(job._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="calendar-view">
          {/* Calendar view implementation */}
          <p>Calendar view coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default Schedule; 