// taskService.js
const fetchTasks = async () => {
    try {
        console.log('Fetching tasks...');
        const response = await fetch(`${address}/api/task/getAll`); // Adjust this URL as necessary
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


function fetchAndCategorizeTasks(parseLocalDate, setTasks) {
    return fetch(`${address}/api/task/get-tasks/${localStorage.getItem("username")}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                alert("failure");
                console.error("Error: API response indicates failure", data);
                return;
            }

            console.log("Fetched tasks:", data.tasks);

            // ✅ Get completed task data from localStorage
            const storedData = localStorage.getItem("tasks-completed");
            console.log("Stored Data:", storedData);
            console.log("Type of storedData:", typeof storedData); // Should be a string

            let completedTasksData = []; // Store objects with more task details
            let completedTaskIds = []; // Store only task IDs

            if (storedData) {
                console.log("Inside if");
                try {
                    console.log("Inside try");
                    const parsedData = JSON.parse(storedData);
                    console.log("After parsed data");

                    // ✅ Extract task ID and additional attributes (progress, goal tracking)
                    if (Array.isArray(parsedData)) {
                        completedTasksData = parsedData.map(task => ({
                            id: task.task_id,
                            completedDate: task.completedDate,
                            progress: task.progress, // Track task progress
                        }));

                        // Extract only task IDs for comparison
                        completedTaskIds = completedTasksData.map(task => task.id);
                    } else {
                        alert("Error: storedData is not an array");
                        throw new Error("tasks-completed is not an array");
                    }
                } catch (error) {
                    console.error("Error parsing tasks-completed:", error);
                }
            }

            console.log("Extracted completed task IDs:", JSON.stringify(completedTaskIds));

            // ✅ Separate tasks into upcoming, completed & missed
            const upcomingTasks = [];
            const completedTasks = [];
            const missedTasks = [];
            /*completedTaskIds.forEach(completedTask => {
                const task = data.tasks.find(task => task._id === taskId);
    
                if (completedTask.isCompleted) {
                    completedTasks.push(task);
                }
            });*/
            data.tasks.forEach(task => {
                // Find the completed task data
                let completedTask = completedTasksData.find(t => t.id === task._id);
                if (task.task_id == 0) {
                    // it is a personal task
                    completedTask = task;
                }
                console.log(completedTask.progress);
                if (completedTask && completedTask.progress >= task.goal) {
                    // If progress is >= goal, mark as completed
                    completedTasks.push(task);
                } else {
                    // Check if the task's due_date has passed and it's not completed
                    const taskDueDate = parseLocalDate(task.due_date); // Convert due_date to Date object
                    const currentDate = new Date(); // Get the current date and time
                    currentDate.setHours(0, 0, 0, 0); // so stuff due today are not put into missed
                    if (taskDueDate < currentDate) {
                        // If the task's due date has passed and it's not completed, push to missedTasks
                        console.log("taskDueDate: ", taskDueDate);
                        console.log("currentDate: ", currentDate);
                        missedTasks.push(task);
                    } else {
                        // Otherwise, it's an upcoming task
                        upcomingTasks.push(task);
                    }
                }
            });

            // ✅ Store categorized tasks in state
            setTasks({
                upcoming: upcomingTasks,
                completed: completedTasks,
                missed: missedTasks, // Modify as needed
            });

            console.log("Tasks successfully categorized!");
        });
}
