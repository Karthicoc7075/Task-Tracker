const mongoose  = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectCreatedDate: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Project', projectSchema);