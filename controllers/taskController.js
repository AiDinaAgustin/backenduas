const express = require('express');
const router = express.Router();
const db = require('../models/db');

//GET /task
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

//GET /task/:nim
router.get('/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (error, results) => {
        if (error) {
            console.error('Error fetching task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'task not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// POST /task
router.post('/', (req, res) => {
    const { task_name, task_detail, date } = req.body;
    db.query('INSERT INTO tasks (task_name, task_detail, date) VALUES (?, ?, ?)', [task_name, task_detail, date], (error) => {
        if (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'task created successfully' });
        }
    });
});

//PUT /task/:nim
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { task_name, task_detail, date } = req.body;
    db.query('UPDATE tasks SET task_name = ?, task_detail = ?, date = ? WHERE id = ?', [task_name, task_detail, date, taskId], (error) => {
        if (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'task updated successfully' });
        }
    });
});


// DELETE /task/:nim
router.delete('/:id', (req, res) => {
    const taskId= req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
        if (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'task deleted successfully' });
        }
    });
});

module.exports = router;