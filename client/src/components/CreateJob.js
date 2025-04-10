import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('work');
  const [assignedTo, setAssignedTo] = useState('');
  const [tags, setTags] = useState('');
  const [dependencies, setDependencies] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);

  useEffect(() => {
    // Fetch available jobs for dependencies
    axios.get('http://localhost:5000/api/jobs/')
      .then(response => {
        setAvailableJobs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const job = {
      title,
      description,
      priority: Number(priority),
      deadline: new Date(deadline),
      duration: Number(duration),
      category,
      assignedTo,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dependencies: dependencies
    };

    axios.post('http://localhost:5000/api/jobs/add', job)
      .then(res => {
        console.log(res.data);
        // Reset form
        setTitle('');
        setDescription('');
        setPriority('');
        setDeadline('');
        setDuration('');
        setCategory('work');
        setAssignedTo('');
        setTags('');
        setDependencies([]);
        alert('Job created successfully!');
      })
      .catch(err => {
        console.log(err);
        alert('Error creating job');
      });
  };

  return (
    <div className="container">
      <h3>Create New Job</h3>
      <form onSubmit={onSubmit} className="mt-4">
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <textarea
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Priority (1-10): </label>
          <input
            type="number"
            required
            min="1"
            max="10"
            className="form-control"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Deadline: </label>
          <input
            type="datetime-local"
            required
            className="form-control"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes): </label>
          <input
            type="number"
            required
            min="1"
            className="form-control"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category: </label>
          <select
            className="form-control"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="meeting">Meeting</option>
            <option value="deadline">Deadline</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assign To: </label>
          <input
            type="text"
            className="form-control"
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
            placeholder="Enter name or leave as 'unassigned'"
          />
        </div>

        <div className="form-group">
          <label>Tags (comma-separated): </label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g., urgent, project, team"
          />
        </div>

        <div className="form-group">
          <label>Dependencies: </label>
          <select
            multiple
            className="form-control"
            value={dependencies}
            onChange={e => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              setDependencies(values);
            }}
          >
            {availableJobs.map(job => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Hold Ctrl/Cmd to select multiple dependencies
          </small>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Job" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default CreateJob; 