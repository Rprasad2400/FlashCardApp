# Flashy Flashcards


<div align="center">
  <img src="./src/flashcardapp/public/real_logo.png" alt="Flashcard App Logo" width="400"/>
</div>

## Flashy Flashcards


A gamified flashcard application that enhances learning through spaced repetition and incentive mechanisms. Users can practice flashcards, track their progress, and engage in interactive learning sessions.

### Deployment

The application is deployed at [Flashcard App on Render](https://flashcardapp-wlsx.onrender.com/). Please note that the backend may take a few minutes to start up initially.

### Local Setup

To run the application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rprasad2400/FlashCardApp
   cd src/flashcardapp/
   ```

2. **Install Dependencies:** Ensure you have `npm`, `mongoose`, and `react` installed:

   ```bash
   npm install
   cd src/backend
   npm install
   ```

3. **Run the Frontend:** In the root directory of the frontend:

   ```bash
   npm start
   ```

   The app will be running at `http://localhost:3000`.

4. **Run the Backend:** Navigate to the backend directory:

   ```bash
   cd src/flashcardapp/src/backend
   node server.js
   ```

   The backend will be running at `http://localhost:5000`.

### Technologies Used

* **Frontend:** React
* **Backend:** Node.js, Express
* **Database:** MongoDB (via Mongoose)

### Features

* Spaced repetition-based learning
* Gamified ranking system
* Interactive UI for flashcard creation and review

### Contribution Guidelines

Feel free to open issues and submit pull requests. For major changes, please open a discussion to propose improvements.

### License

This project is licensed under the MIT License.
