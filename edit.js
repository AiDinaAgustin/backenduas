const taskId = '2';
const updateData = {
    task_name: 'John Doe',
    task_detail: 'L',
    date: '2024-02-02 03:10:29',
};

fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));