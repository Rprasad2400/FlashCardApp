//UserService.js

const updateUserTasksCompleted = async (userId, setID, score) => {
    try {
        console.log("fbewufw");
        console.log('Updating user tasks completed...');
        
        const response = await fetch(`http://localhost:5000/api/task/update-tasks/${userId}/${setID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            }
            ,
            body: JSON.stringify({ score })
        });
        if (!response.ok) {
            throw new Error('Failed to update user tasks completed');
        }
        const data = await response.json();
        console.log('fowiefwen');
        console.log('Updated user tasks completed:', data);
        return data;
    } catch (error) {
        console.error('Error updating user tasks completed:', error);
        return null; // return null in case of error
    }
}


export default { updateUserTasksCompleted };