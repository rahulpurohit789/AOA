import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('cloud_ops');
  const [assignedTo, setAssignedTo] = useState('');
  const [tags, setTags] = useState('');
  const [dependencies, setDependencies] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);

  // Get dates for grouping
  const today = new Date('2025-04-11');
  const tomorrow = new Date('2025-04-12');
  const dayAfterTomorrow = new Date('2025-04-13');

  // Example cloud jobs grouped by date
  const cloudJobExamples = {
    today: [
      {
        title: "EC2 Instance Backup",
        description: "Weekly backup of production EC2 instances in us-east-1 region",
        priority: 8,
        duration: 120,
        deadline: new Date('2025-04-11T10:00:00'),
        category: "cloud_ops",
        assignedTo: "CloudOps Team",
        tags: "backup,aws,production"
      },
      {
        title: "CI/CD Pipeline Deployment",
        description: "Deploy new CI/CD pipeline using GitHub Actions and AWS CodeDeploy",
        priority: 7,
        duration: 90,
        deadline: new Date('2025-04-11T14:00:00'),
        category: "cloud_devops",
        assignedTo: "DevOps Team",
        tags: "cicd,codepipeline,aws"
      },
      {
        title: "Create CloudWatch Alarms",
        description: "Set up monitoring and alerting for critical services",
        priority: 5,
        duration: 45,
        deadline: new Date('2025-04-11T16:00:00'),
        category: "cloud_monitoring",
        assignedTo: "CloudOps Team",
        tags: "cloudwatch,monitoring,alerts"
      }
    ],
    tomorrow: [
      {
        title: "Database Migration to Cloud",
        description: "Migrate on-premise PostgreSQL database to Amazon RDS",
        priority: 9,
        duration: 240,
        deadline: new Date('2025-04-12T09:00:00'),
        category: "cloud_migration",
        assignedTo: "Database Team",
        tags: "migration,aws,database,rds"
      },
      {
        title: "Kubernetes Cluster Update",
        description: "Update EKS cluster to latest version and validate all deployments",
        priority: 7,
        duration: 180,
        deadline: new Date('2025-04-12T13:00:00'),
        category: "cloud_maintenance",
        assignedTo: "DevOps Team",
        tags: "kubernetes,eks,maintenance"
      },
      {
        title: "IAM Role Audit",
        description: "Review and restrict over-permissive IAM roles",
        priority: 7,
        duration: 90,
        deadline: new Date('2025-04-12T15:00:00'),
        category: "cloud_security",
        assignedTo: "Security Team",
        tags: "iam,security,audit"
      }
    ],
    dayAfterTomorrow: [
      {
        title: "Cloud Cost Optimization",
        description: "Review and optimize AWS resource utilization and costs",
        priority: 6,
        duration: 300,
        deadline: new Date('2025-04-13T10:00:00'),
        category: "cloud_ops",
        assignedTo: "FinOps Team",
        tags: "cost,optimization,aws"
      },
      {
        title: "Setup Auto-scaling Groups",
        description: "Configure auto-scaling for web application servers in multiple regions",
        priority: 5,
        duration: 150,
        deadline: new Date('2025-04-13T14:00:00'),
        category: "cloud_ops",
        assignedTo: "Infrastructure Team",
        tags: "auto-scaling,aws,infrastructure"
      },
      {
        title: "VPN Gateway Setup",
        description: "Configure AWS VPN Gateway to connect with on-premise infrastructure",
        priority: 8,
        duration: 160,
        deadline: new Date('2025-04-13T16:00:00'),
        category: "cloud_networking",
        assignedTo: "Network Team",
        tags: "vpn,networking,hybrid"
      }
    ]
  };

  const loadExampleJob = async (job) => {
    // Set form values
    setTitle(job.title);
    setDescription(job.description);
    setPriority(job.priority);
    setDuration(job.duration);
    setCategory(job.category);
    setAssignedTo(job.assignedTo);
    setTags(job.tags);
    
    // Format the deadline for the form
    setDeadline(job.deadline.toISOString().slice(0, 16));

    // Create the job directly
    const newJob = {
      title: job.title,
      description: job.description,
      priority: job.priority,
      deadline: job.deadline,
      duration: job.duration,
      category: job.category,
      assignedTo: job.assignedTo,
      tags: job.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dependencies: []
    };

    try {
      const response = await axios.post('http://localhost:5000/api/jobs/add', newJob);
      console.log(response.data);
      alert('Job created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('');
      setDeadline('');
      setDuration('');
      setCategory('cloud_ops');
      setAssignedTo('');
      setTags('');
      setDependencies([]);
    } catch (err) {
      console.error('Error creating job:', err);
      alert('Error creating job: ' + (err.response?.data || err.message));
    }
  };

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
        setCategory('cloud_ops');
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
      <h3>Create New Cloud Job</h3>
      
      {/* Example Jobs Section */}
      <div className="mb-4">
        <h5>Quick Start with Example Cloud Jobs:</h5>
        
        {/* Today's Jobs */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">Today's Jobs ({today.toLocaleDateString()})</h6>
          <div className="row g-3">
            {cloudJobExamples.today.map((job, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title text-primary">{job.title}</h6>
                    <p className="card-text small text-muted mb-3">{job.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-info">{job.category.replace('_', ' ')}</span>
                      <span className="badge bg-secondary">{job.duration} min</span>
                    </div>
                    <div className="mb-3">
                      {job.tags.split(',').map((tag, i) => (
                        <span key={i} className="badge bg-light text-dark me-1">{tag}</span>
                      ))}
                    </div>
                    <button 
                      className="btn btn-success btn-sm w-100"
                      onClick={() => loadExampleJob(job)}
                    >
                      <i className="bi bi-plus-circle me-1"></i>
                      Create This Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow's Jobs */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">Tomorrow's Jobs ({tomorrow.toLocaleDateString()})</h6>
          <div className="row g-3">
            {cloudJobExamples.tomorrow.map((job, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title text-primary">{job.title}</h6>
                    <p className="card-text small text-muted mb-3">{job.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-info">{job.category.replace('_', ' ')}</span>
                      <span className="badge bg-secondary">{job.duration} min</span>
                    </div>
                    <div className="mb-3">
                      {job.tags.split(',').map((tag, i) => (
                        <span key={i} className="badge bg-light text-dark me-1">{tag}</span>
                      ))}
                    </div>
                    <button 
                      className="btn btn-success btn-sm w-100"
                      onClick={() => loadExampleJob(job)}
                    >
                      <i className="bi bi-plus-circle me-1"></i>
                      Create This Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day After Tomorrow's Jobs */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">Day After Tomorrow ({dayAfterTomorrow.toLocaleDateString()})</h6>
          <div className="row g-3">
            {cloudJobExamples.dayAfterTomorrow.map((job, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title text-primary">{job.title}</h6>
                    <p className="card-text small text-muted mb-3">{job.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-info">{job.category.replace('_', ' ')}</span>
                      <span className="badge bg-secondary">{job.duration} min</span>
                    </div>
                    <div className="mb-3">
                      {job.tags.split(',').map((tag, i) => (
                        <span key={i} className="badge bg-light text-dark me-1">{tag}</span>
                      ))}
                    </div>
                    <button 
                      className="btn btn-success btn-sm w-100"
                      onClick={() => loadExampleJob(job)}
                    >
                      <i className="bi bi-plus-circle me-1"></i>
                      Create This Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <option value="cloud_ops">Cloud Operations</option>
            <option value="cloud_migration">Cloud Migration</option>
            <option value="cloud_maintenance">Cloud Maintenance</option>
            <option value="cloud_security">Cloud Security</option>
            <option value="cloud_optimization">Cloud Optimization</option>
            <option value="cloud_devops">Cloud DevOps</option>
            <option value="cloud_monitoring">Cloud Monitoring</option>
            <option value="performance_testing">Performance Testing</option>
            <option value="cloud_governance">Cloud Governance</option>
            <option value="cloud_networking">Cloud Networking</option>
            <option value="cloud_infrastructure">Cloud Infrastructure</option>
            <option value="cloud_devtools">Cloud DevTools</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assign To: </label>
          <input
            type="text"
            className="form-control"
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
            placeholder="Enter team or individual name"
          />
        </div>

        <div className="form-group">
          <label>Tags (comma-separated): </label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g., aws, backup, production"
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
          <button type="submit" className="btn btn-primary">
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob; 