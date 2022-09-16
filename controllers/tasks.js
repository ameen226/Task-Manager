const { findById } = require('../models/Task');
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    }
    catch (err) {
        res.status(500).json({msg:err});
    }
}

const addTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    }
    catch (err) {
        res.status(500).json({msg:err});
    }
    
    
}

const getTask = async (req, res) => {
    
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id:taskId});
        if (!task) return res.status(404).send(`Task with id: ${taskId} not found`);
        res.status(200).json({task});
    }
    catch (err) {
        res.status(500).json({msg:err});
    }
}

const updateTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) res.status(404).send(`Task with id: ${taskId} not found`);
        res.status(200).json({task});
    }
    catch (err) {
        res.status(500).json({msg:err});
    }
}
const deleteTask = async (req,res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) return res.status(404).send(`Task with id: ${taskId} not found`);
        res.status(200).json({task}); 
    }
    catch (err) {
        res.status(500).json({msg:err});
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask
}