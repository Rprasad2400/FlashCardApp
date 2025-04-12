


const fetchLeaderboard = async (setId) => {
    try {
        console.log('Fetching leaderboard...');
        const response = await fetch(`http://localhost:5000/api/leaderboard/${setId}`); // Adjust this URL with actual set ID
        if (!response.ok) {
            const text = await response.text(); // log the actual response from server
            console.error('Server error response:', text);
            throw new Error('Failed to fetch leaderboard');
        }
        const leaderboard = await response.json();
        console.log('Fetched leaderboard:', leaderboard);
        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return []; // return an empty array in case of error
    }
};

const updateLeaderboard = async (setId, userId, name, score) => {
    try {
        console.log('Updating leaderboard for set:', setId);
        const response = await fetch(`http://localhost:5000/api/leaderboard/${setId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, name, score }),
        });
        if (!response.ok) {
            const text = await response.text(); // log the actual response from server
            console.error('Server error response:', text);
            throw new Error('Failed to update leaderboard');
        }
        const updatedLeaderboard = await response.json();
        console.log('Updated leaderboard:', updatedLeaderboard);
        return updatedLeaderboard;
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        return null; // return null in case of error
    }
}
export default { fetchLeaderboard, updateLeaderboard };
