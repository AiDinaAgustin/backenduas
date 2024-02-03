const express = require('express');
const router = express.Router();
const db = require('../models/db');

//GET /tasks
router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

//GET /tasks/:id
router.get('/tasks/:id', (req, res) => {
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

// POST /tasks
router.post('/tasks', (req, res) => {
    const { task_name, task_detail, date, user_id, category_id } = req.body;
    db.query('INSERT INTO tasks (task_name, task_detail, date, user_id, category_id) VALUES (?, ?, ?, ?, ?)', [task_name, task_detail, date, user_id, category_id], (error) => {
        if (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'task created successfully' });
        }
    });
});

//PUT /tasks/:id
router.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { task_name, task_detail, date, user_id, category_id } = req.body;
    db.query('UPDATE tasks SET task_name = ?, task_detail = ?, date = ?, user_id = ?, category_id = ? WHERE id = ?', [task_name, task_detail, date, user_id, category_id, taskId], (error) => {
        if (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'task updated successfully' });
        }
    });
});


// DELETE /tasks/:id
router.delete('/tasks/:id', (req, res) => {
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



//GET /users
router.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

//GET /users/:id
router.get('/users/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('SELECT * FROM user WHERE id = ?', [taskId], (error, results) => {
        if (error) {
            console.error('Error fetching task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// POST /users
router.post('/users', (req, res) => {
    const { name, username, password } = req.body;
    db.query('INSERT INTO user (name, username, password) VALUES (?, ?, ?)', [name, username, password], (error) => {
        if (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'user created successfully' });
        }
    });
});

//PUT /users/:id
router.put('/users/:id', (req, res) => {
    const taskId = req.params.id;
    const { name, username, password } = req.body;
    db.query('UPDATE user SET name = ?, username = ?, password = ? WHERE id = ?', [name, username, password, taskId], (error) => {
        if (error) {
            console.error('Error updating users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'user updated successfully' });
        }
    });
});


// DELETE /users/:id
router.delete('/users/:id', (req, res) => {
    const taskId= req.params.id;
    db.query('DELETE FROM user WHERE id = ?', [taskId], (error) => {
        if (error) {
            console.error('Error deleting users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'user deleted successfully' });
        }
    });
});

module.exports = router;