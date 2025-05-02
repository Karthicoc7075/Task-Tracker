const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    taskOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    taskCreatedDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Task', taskSchema);