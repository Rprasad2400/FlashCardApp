// FlashcardService.js

const fetchFlashcards = async () => {
    try {
      console.log('Fetching flashcards...');
      const response = await fetch('http://localhost:5000/api/card/getAll'); // Adjust this URL as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch flashcards');
      }
      const flashcards = await response.json();
      console.log('Fetched flashcards:', flashcards);
      return flashcards;
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      return []; // return an empty array in case of error
    }
  };
  
  export default fetchFlashcards;
  