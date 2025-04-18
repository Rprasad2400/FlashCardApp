// taskService.js
const fetchTasks = async () => {
    try {
        console.log('Fetching tasks...');
        const response = await fetch('http://localhost:5000/api/task/getAll'); // Adjust this URL as necessary
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        console.log('Fetched tasks:', tasks);
        return tasks;
    } catch (error) {        console.error('Error fetching tasks:', error);
        return []; // return an empty array in case of error
    }
};

