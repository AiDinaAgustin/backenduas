const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/taskController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


// endpoint mahasiswa
app.use('/tasks', taskController);

// jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});