const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    deadline: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,  // in minutes
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'meeting', 'deadline', 'other'],
        default: 'work'
    },
    assignedTo: {
        type: String,
        default: 'unassigned'
    },
    dependencies: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    tags: [{
        type: String
    }],
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 