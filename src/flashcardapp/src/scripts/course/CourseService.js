// CourseService.js
const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary

const fetchCourses = async () => {
    try {
        console.log('Fetching courses...');
        const response = await fetch(`${address}/api/course/getAll`); // Adjust this URL as necessary
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const courses = await response.json();
        console.log('Fetched courses:', courses);
        return courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return []; // return an empty array in case of error
    }
};

const createCourse = async (course) => {
    try {
        console.log('Saving course:', course);
        const response = await fetch(`${address}/api/course/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });
        if (!response.ok) {
            throw new Error('Failed to save course');
        }
        const savedCourse = await response.json();
        console.log('Saved course:', savedCourse);
        return savedCourse;
    } catch (error) {
        console.error('Error saving course:', error);
        return null; // return null in case of error
    }
};

const findCourse = async (id) => {
    try {
        console.log('Finding course:', id);
        const response = await fetch(`${address}/api/course/get/${id}`); // Adjust this URL as necessary
        if (!response.ok) {
            throw new Error('Failed to find course');
        }
        const course = await response.json();
        console.log('Found course:', course);
        return course;
    } catch (error) {
        console.error('Error finding course:', error);
        return null; // return null in case of error
    }
};

export default { fetchCourses, createCourse, findCourse };