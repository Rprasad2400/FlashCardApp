// SetService.js

const fetchSets = async () => {
    try {
        console.log('Fetching sets...');
        const response = await fetch('http://localhost:5000/api/set/getAll'); // Adjust this URL as necessary
        if (!response.ok) {
            throw new Error('Failed to fetch sets');
        }
        const sets = await response.json();
        console.log('Fetched sets:', sets);
        return sets;
    } catch (error) {
        console.error('Error fetching sets:', error);
        return []; // return an empty array in case of error
    }
};



const createSet = async (set) => {
    try {
        console.log('Saving set:', set);
        const response = await fetch('http://localhost:5000/api/set/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(set),
        });
        if (!response.ok) {
            throw new Error('Failed to save set');
        }
        const savedSet = await response.json();
        console.log('Saved set:', savedSet);
        return savedSet;
    } catch (error) {
        console.error('Error saving set:', error);
        return null; // return null in case of error
    }
};

export default { fetchSets, createSet };