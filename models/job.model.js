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
        enum: [
            'cloud_ops',
            'cloud_migration',
            'cloud_maintenance',
            'cloud_security',
            'cloud_optimization',
            'cloud_devops',
            'cloud_monitoring',
            'performance_testing',
            'cloud_governance',
            'cloud_networking',
            'cloud_infrastructure',
            'cloud_devtools'
        ],
        default: 'cloud_ops'
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