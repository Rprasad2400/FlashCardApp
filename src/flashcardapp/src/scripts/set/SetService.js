// SetService.js

const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary
//const address = 'http://localhost:5000'; // Adjust this URL as necessary
const fetchSets = async () => {
    try {
        console.log('Fetching sets...');

        //http://localhost:5000/api/set/getAll
        const response = await fetch(`${address}/api/set/getAll`); // Adjust this URL as necessary
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
        const response = await fetch(`${address}/api/set/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(set),
        });
        if (!response.ok) {
            console.log('Response not ok:', response);
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

const findSet = async (id) => {
    try {
        console.log('Finding set:', id);
        const url = `${address}/api/set/get/${id}`;
        console.log("Fetching URL:", url);
        const response = await fetch(`${address}/api/set/get/${id}`); // Adjust this URL as necessary
        if (!response.ok) {
            throw new Error('Failed to find set');
        }
        const set = await response.json();
        console.log('Found set:', set);
        return set;
    } catch (error) {
        console.error('Error finding set:', error);
        return null; // return null in case of error
    }
};

const fetchSearchSuggestions = async (searchTerm) => {
    try {
        const response = await fetch(`${address}/api/set/search?query=${searchTerm}`);
        if (!response.ok) {
            alert("Response is not ok");
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        return [];
    }
};


const fetchPersonalSets = async (userID, course_id, module_name) => {
    try {
        console.log("RAHHHHH");
        console.log(`${address}/api/user/get-personal-sets/${userID}?course_id=${course_id}&module_name=${module_name}`);
      const response = await fetch(`${address}/api/user/get-personal-sets/${userID}?course_id=${course_id}&module_name=${module_name}`);
      if (!response.ok) {
        console.error('Response is not ok:', response);
        return [];
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Cant fetch personal sets', error);
      return [];
    }
  }
  
const createPersonalSet = async (userID, course_id, module_name, set_id) => {
    try {
        const response = await fetch(`${address}/api/user/create-personal-set/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id, module_name, set_id }),
        });
        if (!response.ok) {
            alert("Could not create personal set");
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not create personal set:', error);
        return null;
    }
}


export default { fetchSets, createSet, findSet, fetchSearchSuggestions, fetchPersonalSets, createPersonalSet };