// require the library
const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    details: {
        type: String,
        required: true
    },
    select: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


const Task = mongoose.model('Task', taskSchema);

// exporting the Schema
module.exports = Task;