const router = require('express').Router();
let Job = require('../models/job.model');

// Get all jobs
router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new job
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const priority = Number(req.body.priority);
    const deadline = new Date(req.body.deadline);
    const duration = Number(req.body.duration);

    const newJob = new Job({
        title,
        priority,
        deadline,
        duration
    });

    newJob.save()
        .then(() => res.json('Job added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get optimized schedule
router.route('/schedule').get((req, res) => {
    Job.find()
        .then(jobs => {
            // Sort jobs by deadline and priority using greedy algorithm
            const scheduledJobs = jobs.sort((a, b) => {
                // First sort by deadline
                if (a.deadline.getTime() !== b.deadline.getTime()) {
                    return a.deadline.getTime() - b.deadline.getTime();
                }
                // If deadlines are equal, sort by priority (higher priority first)
                return b.priority - a.priority;
            });
            res.json(scheduledJobs);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update job status
router.route('/update/:id').post((req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            job.status = req.body.status;
            job.save()
                .then(() => res.json('Job updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete job
router.route('/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(() => res.json('Job deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 