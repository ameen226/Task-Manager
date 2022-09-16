const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
        trim: true,
        max: [20, 'Task name must not exceed 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Task', TaskSchema);