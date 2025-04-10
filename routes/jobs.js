const router = require('express').Router();
let Job = require('../models/job.model');

// Get all jobs
router.route('/').get(async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add new job
router.route('/add').post(async (req, res) => {
    try {
        const { title, priority, deadline, duration, description, category, assignedTo, tags, dependencies } = req.body;

        // Validation
        if (!title || !priority || !deadline || !duration) {
            return res.status(400).json('Error: Missing required fields');
        }

        const newJob = new Job({
            title,
            description: description || '',
            priority: Number(priority),
            deadline: new Date(deadline),
            duration: Number(duration),
            category: category || 'work',
            assignedTo: assignedTo || 'unassigned',
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [],
            dependencies: dependencies || []
        });

        const savedJob = await newJob.save();
        res.json('Job added!');
    } catch (err) {
        console.error('Error adding job:', err);
        res.status(400).json('Error: ' + err.message);
    }
});

// Get optimized schedule
router.route('/schedule').get(async (req, res) => {
    try {
        const jobs = await Job.find();
        // Sort jobs by deadline and priority using greedy algorithm
        const scheduledJobs = jobs.sort((a, b) => {
            const dateA = new Date(a.deadline).setHours(0, 0, 0, 0);
            const dateB = new Date(b.deadline).setHours(0, 0, 0, 0);
            
            // First sort by deadline (day)
            if (dateA !== dateB) {
                return dateA - dateB;
            }
            
            // If same day, sort by priority (higher first)
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            
            // If priority is same, sort by duration (shorter first)
            return a.duration - b.duration;
        });
        res.json(scheduledJobs);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Update job
router.route('/update/:id').post(async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json('Error: Job not found');
        }

        // Update only provided fields
        const updates = req.body;
        Object.keys(updates).forEach(update => {
            job[update] = updates[update];
        });

        if (updates.status === 'completed') {
            job.completedAt = new Date();
        }

        const updatedJob = await job.save();
        res.json('Job updated!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Delete job
router.route('/:id').delete(async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json('Error: Job not found');
        }
        res.json('Job deleted.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router; 