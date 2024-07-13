## Indian Recipe App - A React Project Guide

This guide will walk you through building a web application that showcases a curated collection of authentic Indian recipes using React. The app will allow users to discover recipes based on cuisine, ingredient, dietary restrictions, and browse through categories like vegetarian, non-vegetarian, sweets, snacks, etc. 

### Project Setup

1. **Install Node.js and npm:** Download and install Node.js from [https://nodejs.org/](https://nodejs.org/). This includes npm (Node Package Manager).

2. **Install a Code Editor:** Download and install a code editor like Visual Studio Code from [https://code.visualstudio.com/](https://code.visualstudio.com/).

3. **Create a New React Project:** Open your terminal and run the following command:
   ```bash
   npx create-react-app my-recipe-app
   cd my-recipe-app
   npm start
   ```
   This will create a new React project named "my-recipe-app" and start the development server. You should see the default React app running in your browser.

4. **Project Structure:** 
   - `public/` - Contains static assets like HTML files, images, and CSS.
   - `src/` - Contains your React code, including components, styles, and logic.
     - `App.js` - Main component that renders other components.
     - `index.js` - Entry point for your application.
     - `index.css` - Global styles.

### Project Development

#### 1. Basic Components and Layout

1. **Create a `Header` Component:**
   - In `src/components`, create a new file named `Header.js`.
   - Define a functional component:
     ```javascript
     import React from 'react';
     import './Header.css'; // Import CSS file for styling

     function Header() {
       return (
         <header className="header">
           <h1>Indian Recipe App</h1>
         </header>
       );
     }

     export default Header;
     ```

2. **Create a `RecipeList` Component:**
   - In `src/components`, create a new file named `RecipeList.js`.
   - Define a functional component:
     ```javascript
     import React from 'react';
     import './RecipeList.css'; // Import CSS file for styling

     function RecipeList() {
       return (
         <div className="recipe-list">
           <h2>Recipe List</h2>
           {/* Placeholder for recipe items */}
         </div>
       );
     }

     export default RecipeList;
     ```

3. **Render Components in `App.js`:**
   - In `src/App.js`, import and render the `Header` and `RecipeList` components:
     ```javascript
     import React from 'react';
     import './App.css';
     import Header from './components/Header';
     import RecipeList from './components/RecipeList';

     function App() {
       return (
         <div className="App">
           <Header />
           <RecipeList />
         </div>
       );
     }

     export default App;
     ```

#### 2. Recipe Data and Display

1. **Create Recipe Data:**
   - In `src/data`, create a new file named `recipes.js`.
   - Define an array of recipe objects:
     ```javascript
     const recipes = [
       {
         id: 1,
         name: "Butter Chicken",
         cuisine: "North Indian",
         ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Spices"],
         imageUrl: "https://example.com/butter-chicken.jpg",
         type: "Non-Vegetarian"
       },
       // Add more recipe objects here
     ];

     export default recipes;
     ```

2. **Display Recipe Items in `RecipeList.js`:**
   - Import the `recipes` data.
   - Use the `map()` method to iterate over the `recipes` array and render each recipe as a component:
     ```javascript
     import React from 'react';
     import './RecipeList.css';
     import recipes from '../data/recipes'; // Import recipe data

     function RecipeList() {
       return (
         <div className="recipe-list">
           <h2>Recipe List</h2>
           <ul>
             {recipes.map(recipe => (
               <li key={recipe.id}>
                 <h3>{recipe.name}</h3>
                 <img src={recipe.imageUrl} alt={recipe.name} />
                 <p>Cuisine: {recipe.cuisine}</p>
               </li>
             ))}
           </ul>
         </div>
       );
     }

     export default RecipeList;
     ```

#### 3. Search Functionality

1. **Create a Search Bar Component:**
   - In `src/components`, create a new file named `SearchBar.js`.
   - Define a functional component with state for search input:
     ```javascript
     import React, { useState } from 'react';
     import './SearchBar.css'; // Import CSS file for styling

     function SearchBar({ onSearch }) { // Prop for handling search
       const [searchTerm, setSearchTerm] = useState('');

       const handleInputChange = (event) => {
         setSearchTerm(event.target.value);
       };

       const handleSubmit = (event) => {
         event.preventDefault();
         onSearch(searchTerm); // Call the search function
       };

       return (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             placeholder="Search Recipes"
             value={searchTerm}
             onChange={handleInputChange}
           />
           <button type="submit">Search</button>
         </form>
       );
     }

     export default SearchBar;
     ```

2. **Integrate Search Bar in `RecipeList.js`:**
   - Import the `SearchBar` component.
   - Pass a function to `onSearch` that filters recipes based on the search term:
     ```javascript
     import React, { useState } from 'react';
     import './RecipeList.css';
     import recipes from '../data/recipes';
     import SearchBar from './SearchBar';

     function RecipeList() {
       const [filteredRecipes, setFilteredRecipes] = useState(recipes);

       const handleSearch = (searchTerm) => {
         const filtered = recipes.filter(recipe =>
           recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setFilteredRecipes(filtered);
       };

       return (
         <div className="recipe-list">
           <h2>Recipe List</h2>
           <SearchBar onSearch={handleSearch} />
           <ul>
             {filteredRecipes.map(recipe => (
               <li key={recipe.id}>
                 {/* Recipe item display */}
               </li>
             ))}
           </ul>
         </div>
       );
     }

     export default RecipeList;
     ```

#### 4. Recipe Details Page

1. **Create a `RecipeDetails` Component:**
   - In `src/components`, create a new file named `RecipeDetails.js`.
   - Define a functional component that receives a `recipe` prop:
     ```javascript
     import React from 'react';
     import './RecipeDetails.css'; // Import CSS file for styling

     function RecipeDetails({ recipe }) {
       return (
         <div className="recipe-details">
           <h2>{recipe.name}</h2>
           <img src={recipe.imageUrl} alt={recipe.name} />
           {/* Display recipe details */}
         </div>
       );
     }

     export default RecipeDetails;
     ```

2. **Implement Routing:**
   - Install React Router:
     ```bash
     npm install react-router-dom
     ```
   - In `src/App.js`, import `BrowserRouter`, `Routes`, and `Route`:
     ```javascript
     import React from 'react';
     import './App.css';
     import Header from './components/Header';
     import RecipeList from './components/RecipeList';
     import RecipeDetails from './components/RecipeDetails';
     import { BrowserRouter, Routes, Route } from 'react-router-dom';

     function App() {
       return (
         <BrowserRouter>
           <div className="App">
             <Header />
             <Routes>
               <Route path="/" element={<RecipeList />} />
               <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Route for recipe details */}
             </Routes>
           </div>
         </BrowserRouter>
       );
     }

     export default App;
     ```

3. **Link Recipe Items to Details Page:**
   - In `RecipeList.js`, use the `Link` component to create links to recipe details:
     ```javascript
     import React, { useState } from 'react';
     import './RecipeList.css';
     import recipes from '../data/recipes';
     import SearchBar from './SearchBar';
     import { Link } from 'react-router-dom'; // Import Link component

     function RecipeList() {
       // ...

       return (
         // ...
         <ul>
           {filteredRecipes.map(recipe => (
             <li key={recipe.id}>
               <Link to={`/recipe/${recipe.id}`}>
                 <h3>{recipe.name}</h3>
               </Link>
               {/* ... */}
             </li>
           ))}
         </ul>
         // ...
       );
     }

     export default RecipeList;
     ```

4. **Fetch and Display Details in `RecipeDetails.js`:**
   - Use `useParams` hook to get the recipe ID from the URL.
   - Find the corresponding recipe from the data:
     ```javascript
     import React from 'react';
     import './RecipeDetails.css';
     import recipes from '../data/recipes';
     import { useParams } from 'react-router-dom'; // Import useParams

     function RecipeDetails() {
       const { id } = useParams();
       const recipe = recipes.find(recipe => recipe.id === parseInt(id)); // Find recipe by ID

       return (
         <div className="recipe-details">
           {recipe && ( // Display details if recipe is found
             <>
               <h2>{recipe.name}</h2>
               <img src={recipe.imageUrl} alt={recipe.name} />
               {/* ... Display other recipe details */}
             </>
           )}
         </div>
       );
     }

     export default RecipeDetails;
     ```

#### 5. Additional Features

1. **Recipe Filtering:**
   - Add buttons or dropdown menus for filtering recipes by cuisine, type (vegetarian/non-vegetarian), or dietary restrictions.
   - Implement filtering logic in `RecipeList.js` to update the `filteredRecipes` state based on selected filters.

2. **Ingredient List:**
   - Display the ingredient list in `RecipeDetails.js` using the `ingredients` property of the recipe object.
   - Consider adding a feature to mark ingredients as "added to shopping list".

3. **Instructions and Images:**
   - Add a section for step-by-step instructions in `RecipeDetails.js`.
   - Consider using images to visually guide users through the recipe steps.

4. **User Reviews:**
   - Implement a feature for users to add reviews to recipes.
   - Store review data (author, rating, comment) in an array or use a database for persistence.
   - Display reviews in `RecipeDetails.js`.

5. **Recipe Recommendations:**
   - Explore ways to implement recipe recommendations based on user preferences.
   - You can store user preferences (like favorite cuisines, ingredients, etc.) in local storage or use a database.
   - Use logic to suggest similar recipes based on preferences.

#### 6. Styling and Design

1. **Create CSS Files:** Create separate CSS files for each component (`Header.css`, `RecipeList.css`, `RecipeDetails.css`, etc.) to style individual components.

2. **Styling Techniques:**
   - Use CSS classes to apply styles to components.
   - Consider using a CSS framework like Bootstrap or Material UI to help with styling and layout.

3. **Responsive Design:** Ensure your app looks good on different screen sizes.
   - Use media queries in your CSS to adjust layout and styles for mobile, tablet, and desktop devices.

#### 7. Data Fetching (API)

1. **Choose an API:** Find an API that provides Indian recipe data. Some options include:
   - [Spoonacular](https://spoonacular.com/food-api)
   - [Edamam](https://developer.edamam.com/edamam-docs)
   - [Food2Fork](https://www.food2fork.com/api)

2. **Install `axios`:** Install the Axios library to make API requests:
   ```bash
   npm install axios
   ```

3. **Fetch Data in `RecipeList.js`:**
   - Import Axios.
   - Use `useEffect` to fetch data from the API on component mount:
     ```javascript
     import React, { useState, useEffect } from 'react';
     import './RecipeList.css';
     import axios from 'axios'; // Import Axios

     function RecipeList() {
       // ...

       useEffect(() => {
         const fetchData = async () => {
           try {
             const response = await axios.get('https://api.spoonacular.com/recipes/search?apiKey=YOUR_API_KEY&query=indian'); // Replace with your API endpoint
             setFilteredRecipes(response.data.results);
           } catch (error) {
             console.error('Error fetching data:', error);
           }
         };

         fetchData();
       }, []);

       // ...
     }

     export default RecipeList;
     ```

4. **Handle API Response:**
   - Extract relevant data from the API response and update the `filteredRecipes` state.
   - You may need to format or transform the data to match your component structure.

#### 8. Deployment

1. **Build the App:** Run the following command to create a production build:
   ```bash
   npm run build
   ```
   This will generate a `build` folder containing optimized files.

2. **Choose a Hosting Service:** Select a hosting service like GitHub Pages, Netlify, or Vercel.

3. **Deploy to Hosting:** Follow the specific instructions provided by your chosen hosting service to deploy your application. You might need to configure build settings and configure your deployment process.

### Essential Resources

- **React Documentation:** [https://reactjs.org/](https://reactjs.org/)
- **React Router Documentation:** [https://reactrouter.com/](https://reactrouter.com/)
- **Axios Documentation:** [https://axios-http.com/docs/api_intro](https://axios-http.com/docs/api_intro)
- **API Documentation:** Refer to the documentation of your chosen API for specific usage instructions.

### Additional Tips

- **Start Small:** Break down your project into smaller components and gradually add features.
- **Use State Management:** Consider using a state management library like Redux or Context API if your application grows complex.
- **Test Your Code:** Write unit tests to ensure your components work as expected.
- **Get Creative:** Don't be afraid to experiment and add your own unique features to make your app stand out!

Remember, building a web application takes time and effort. Stay organized, break down tasks, and don't hesitate to seek help when needed. Good luck! 
