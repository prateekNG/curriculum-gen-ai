## Indian Mythology Quiz: A Scaffolded React Project Guide

This guide will walk you through building a fun and educational Indian Mythology Quiz application using React. We'll break down the project into manageable phases and provide clear instructions with hints, code snippets, and essential resources.

**Project Goals:**

* Build a quiz game that tests knowledge about Indian mythology.
* Display questions related to Hindu gods, goddesses, epics, and other mythological figures.
* Track user scores and provide feedback on answers.
* Consider adding a leaderboard feature for users to compete.

**Project Setup:**

1. **Install Node.js and npm:**  Make sure you have Node.js and its package manager (npm) installed. If not, download and install from [https://nodejs.org/](https://nodejs.org/).

2. **Choose a Code Editor:** We recommend using VS Code, but any text editor of your choice will work. Download and install from [https://code.visualstudio.com/](https://code.visualstudio.com/).

3. **Create React App:**
   - Open your terminal and run the following command to create a new React project:
     ```bash
     npx create-react-app mythology-quiz
     cd mythology-quiz
     npm start
     ```
   - This will create a basic React project with essential files and dependencies. Your project will automatically open in your browser at `http://localhost:3000`.

**Project Structure:**

* **src:** The source code for your React application.
    * **App.js:** The main component of your application.
    * **components:**  A folder for all your custom components.
        * **Question.js:** Component to display individual quiz questions.
        * **AnswerOptions.js:** Component to render answer options.
        * **Score.js:** Component to display the user's current score.
        * **Leaderboard.js:**  (Optional) Component to display the leaderboard.
    * **data:**  A folder to store your quiz questions (in a JSON file or fetch from an API).
    * **App.css:**  Styles for the overall application.
    * **index.css:**  Global styles.

**Phase 1: Basic Quiz Structure**

**1. Create the `Question` Component:**

   - Inside `src/components`, create a new file called `Question.js`.
   - In `Question.js`, define a functional component to display a single quiz question:

   ```javascript
   import React from 'react';

   const Question = ({ question, options, onAnswerSubmit }) => {
       return (
           <div>
               <h2>{question}</h2>
               {/* Add answer options here */}
           </div>
       );
   };

   export default Question;
   ```

**2. Create the `AnswerOptions` Component:**

   - In `src/components`, create a new file called `AnswerOptions.js`.
   - Define a functional component to render the answer options:

   ```javascript
   import React from 'react';

   const AnswerOptions = ({ options, onOptionSelect }) => {
       return (
           <div>
               {options.map((option, index) => (
                   <button key={index} onClick={() => onOptionSelect(option)}>
                       {option}
                   </button>
               ))}
           </div>
       );
   };

   export default AnswerOptions;
   ```

**3. Integrate Components in `App.js`:**

   - Import the `Question` and `AnswerOptions` components into `App.js`:

   ```javascript
   import React, { useState } from 'react';
   import Question from './components/Question';
   import AnswerOptions from './components/AnswerOptions';

   const App = () => {
       const [currentQuestion, setCurrentQuestion] = useState(0);
       const [score, setScore] = useState(0);

       // Sample Quiz Data (Replace with your own)
       const quizData = [
           {
               question: "Who is the god of wisdom in Hindu mythology?",
               options: ["Vishnu", "Shiva", "Brahma", "Saraswati"],
               correctAnswer: "Saraswati"
           },
           // Add more questions here
       ];

       const handleAnswerSubmit = (selectedOption) => {
           if (selectedOption === quizData[currentQuestion].correctAnswer) {
               setScore(score + 1);
           }

           // Move to the next question
           if (currentQuestion < quizData.length - 1) {
               setCurrentQuestion(currentQuestion + 1);
           } else {
               // Show the final score
               alert(`You scored ${score} out of ${quizData.length}!`);
           }
       };

       return (
           <div className="app">
               <h1>Indian Mythology Quiz</h1>
               <Question
                   question={quizData[currentQuestion].question}
                   options={quizData[currentQuestion].options}
                   onAnswerSubmit={handleAnswerSubmit}
               />
               <AnswerOptions
                   options={quizData[currentQuestion].options}
                   onOptionSelect={handleAnswerSubmit}
               />
               <p>Score: {score}</p>
           </div>
       );
   };

   export default App;
   ```

**4.  Style Your Quiz:**

   - Add basic styling in `src/App.css` to make your quiz look presentable.

**Phase 2:  Enhancing Functionality**

**1. Add Quiz Data:**

   - Create a `data.json` file in `src/data` to store your quiz questions:

   ```json
   [
       {
           "question": "Who is the god of wisdom in Hindu mythology?",
           "options": ["Vishnu", "Shiva", "Brahma", "Saraswati"],
           "correctAnswer": "Saraswati"
       },
       {
           "question": "Which epic tells the story of Rama and Sita?",
           "options": ["Mahabharata", "Ramayana", "Bhagavad Gita", "Purana"],
           "correctAnswer": "Ramayana"
       },
       // Add more questions here
   ]
   ```

**2. Fetch Quiz Data:**

   - In `App.js`, import the quiz data and use it in the state:

   ```javascript
   import React, { useState, useEffect } from 'react';
   import Question from './components/Question';
   import AnswerOptions from './components/AnswerOptions';

   const App = () => {
       const [quizData, setQuizData] = useState([]);
       const [currentQuestion, setCurrentQuestion] = useState(0);
       const [score, setScore] = useState(0);

       useEffect(() => {
           // Fetch quiz data from data.json
           fetch('/data.json')
               .then(response => response.json())
               .then(data => setQuizData(data));
       }, []);

       const handleAnswerSubmit = (selectedOption) => {
           // ... (Same logic as before)
       };

       // ... (Rest of the code remains the same)
   };
   ```

**3.  (Optional) Add a Leaderboard Feature:**

   - If you want to add a leaderboard:
      - Create a `Leaderboard.js` component.
      - Implement logic to store user scores in local storage (for a simple leaderboard) or a database (for a more permanent solution).
      - Display the leaderboard in the `App.js` component.

**Phase 3:  Advanced Features**

**1.  Add Styling:**

    -  Use CSS or a CSS-in-JS library (e.g., styled-components) to enhance the visual appeal of your quiz application. 
    -  Create a consistent look and feel for the UI.

**2.  Implement Timer Functionality:**

    -  Add a timer to each question to create a sense of urgency.
    -  Use `setInterval` or `setTimeout` to manage the timer.

**3.  (Optional) Use a Database:**

    -  If you want to store quiz data and user scores permanently, use a database like Firebase.
    -  Follow the Firebase documentation to connect your React application to Firebase.

**4.  Add User Authentication:**

    -  Allow users to create accounts and log in.
    -  Use Firebase Authentication to handle user authentication.

**Additional Tips:**

* **Clean Code:** Write clean and readable code. Follow coding conventions and use comments to explain your logic.
* **Test Your Quiz:** Test your quiz thoroughly to ensure it works as intended. Use automated testing tools like Jest for unit testing.
* **Accessibility:** Make sure your quiz is accessible to users with disabilities.

**Resources:**

* [React Documentation](https://reactjs.org/): The official React documentation.
* [Create React App Documentation](https://create-react-app.dev/): Documentation for the Create React App tool.
* [Firebase Documentation](https://firebase.google.com/): Documentation for Firebase, a cloud platform for building web and mobile applications.

**Remember, this is a starting point. You can add your own creative touches and make the quiz even more engaging and educational.**
