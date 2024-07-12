## Bollywood Movie Database: A React Project Guide

This guide will walk you through building a Bollywood Movie Database application using React. You'll learn core React concepts by implementing features like movie listings, actor profiles, search functionality, and potentially user interaction elements like watchlists.

**Project Setup:**

1. **Install Node.js and npm:** If you haven't already, download and install Node.js from [https://nodejs.org/](https://nodejs.org/). This will also include npm (Node Package Manager).
2. **Choose a Code Editor:** Install a code editor like Visual Studio Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)).
3. **Create React App:** Open your terminal and run the following commands to create a new React project:
   ```bash
   npx create-react-app bollywood-movie-db
   cd bollywood-movie-db
   npm start
   ```
   This will start a development server, and you'll see your app running at `http://localhost:3000`.

**Project Structure:**

Your project will be organized like this:

```
bollywood-movie-db/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── setupTests.js
├── package.json
├── README.md
```

**Core Concepts and Implementation:**

**1. Component-Based Architecture:**

*   **Create Components:**  React applications are made of components, independent building blocks of UI. Create a `MovieCard` component to display information about a single movie:
    ```javascript
    // src/MovieCard.js
    import React from 'react';

    function MovieCard(props) {
        return (
            <div className="movie-card">
                <img src={props.posterUrl} alt={props.title} />
                <h3>{props.title}</h3>
                <p>Release Date: {props.releaseDate}</p>
            </div>
        );
    }

    export default MovieCard;
    ```

*   **Use Components:** Import and use your `MovieCard` component in your main `App` component:
    ```javascript
    // src/App.js
    import React from 'react';
    import MovieCard from './MovieCard';
    import './App.css';

    function App() {
        const movies = [
            { title: "Sholay", releaseDate: "1975", posterUrl: "https://www.imdb.com/title/tt0073851/mediaviewer/rm3473443840/" },
            { title: "Dilwale Dulhania Le Jayenge", releaseDate: "1995", posterUrl: "https://www.imdb.com/title/tt0112811/mediaviewer/rm1964802560/" },
            // Add more movie data
        ];

        return (
            <div className="App">
                <h1>Bollywood Movie Database</h1>
                <div className="movie-list">
                    {movies.map((movie, index) => (
                        <MovieCard key={index} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} />
                    ))}
                </div>
            </div>
        );
    }

    export default App;
    ```

*   **Props:** Props are how you pass data from parent to child components. In our `MovieCard` component, `title`, `releaseDate`, and `posterUrl` are props.

**2. State and Props:**

*   **State:** State is used to manage data that can change within a component. For example, a search input's value would be stored in the state.
*   **useState Hook:**  In functional components, use the `useState` hook to manage state:

    ```javascript
    // src/App.js
    import React, { useState } from 'react';
    import MovieCard from './MovieCard';
    import './App.css';

    function App() {
        const [movies, setMovies] = useState([
            // ... movie data ...
        ]);

        const [searchTerm, setSearchTerm] = useState('');

        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const filteredMovies = movies.filter((movie) => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="App">
                <h1>Bollywood Movie Database</h1>
                <input type="text" placeholder="Search movies" value={searchTerm} onChange={handleSearchChange} /> 
                <div className="movie-list">
                    {filteredMovies.map((movie, index) => (
                        <MovieCard key={index} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} />
                    ))}
                </div>
            </div>
        );
    }

    export default App;
    ```

**3. Event Handling:**

*   **onClick Event:**  Add an event listener to elements to trigger actions when they are clicked. For example, in the search input above, the `onChange` event handler updates the `searchTerm` state.

**4. Lists and Keys:**

*   **Rendering Lists:** Use `map()` to iterate over arrays and render elements dynamically:

    ```javascript
    // src/App.js
    // ... 
        return (
            // ...
                <div className="movie-list">
                    {filteredMovies.map((movie, index) => (
                        <MovieCard key={index} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} />
                    ))}
                </div>
            // ...
        );
    ```

*   **Keys:** Assign a unique `key` prop to each list item for React to efficiently update the list when data changes.

**5. Fetching Data:**

*   **API:** You'll need a Bollywood movie data API. There are free options available, or you can build your own backend. For this example, let's assume you're using a free API:

    ```javascript
    // src/App.js
    import React, { useState, useEffect } from 'react';
    import MovieCard from './MovieCard';
    import './App.css';

    function App() {
        const [movies, setMovies] = useState([]);

        useEffect(() => {
            const fetchMovies = async () => {
                try {
                    const response = await fetch('https://api.example.com/bollywood-movies'); // Replace with your actual API URL
                    const data = await response.json();
                    setMovies(data);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };

            fetchMovies();
        }, []);

        // ... rest of your component ...
    }

    export default App;
    ```

*   **useEffect Hook:** The `useEffect` hook lets you perform side effects, like fetching data, within functional components. It runs after each render.

**6. Routing:**

*   **Install React Router:**
    ```bash
    npm install react-router-dom
    ```

*   **Create Routes:** Define routes for different parts of your application (e.g., movie details, actor pages, search results).

    ```javascript
    // src/App.js
    import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import MovieCard from './MovieCard';
    import MovieDetails from './MovieDetails';
    import ActorProfile from './ActorProfile';
    import './App.css';

    function App() {
        // ... your movie data and fetchMovies function ...

        return (
            <Router>
                <div className="App">
                    <h1>Bollywood Movie Database</h1>

                    <Routes>
                        <Route path="/" element={
                            <div>
                                <div className="movie-list">
                                    {movies.map((movie, index) => (
                                        <Link key={index} to={`/movie/${movie.id}`}>
                                            <MovieCard key={index} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        } />

                        <Route path="/movie/:movieId" element={<MovieDetails />} />
                        <Route path="/actor/:actorId" element={<ActorProfile />} />
                    </Routes>
                </div>
            </Router>
        );
    }

    export default App;
    ```

*   **Movie Details Page:** Create a `MovieDetails` component to display details for a specific movie:

    ```javascript
    // src/MovieDetails.js
    import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';

    function MovieDetails() {
        const { movieId } = useParams();
        const [movie, setMovie] = useState(null);

        useEffect(() => {
            const fetchMovie = async () => {
                try {
                    const response = await fetch(`https://api.example.com/bollywood-movies/${movieId}`); // Replace with your actual API URL
                    const data = await response.json();
                    setMovie(data);
                } catch (error) {
                    console.error('Error fetching movie:', error);
                }
            };

            fetchMovie();
        }, [movieId]);

        if (!movie) {
            return <div>Loading movie details...</div>;
        }

        return (
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <img src={movie.posterUrl} alt={movie.title} />
                {/* Display other movie details: cast, crew, release date, plot, etc. */}
            </div>
        );
    }

    export default MovieDetails;
    ```

*   **Actor Profile Page:** Create an `ActorProfile` component to display details for an actor.

**7. Forms (Optional):**

*   **Watchlist:**  If you want to let users create watchlists, you'll need to implement forms using React's `useState` hook and form input elements.
*   **Rating:**  If you want to allow users to rate movies, you can use forms to collect ratings and store them (consider using local storage or a database).

**8. Styling:**

*   **CSS:** Use CSS to style your components. Create a `src/App.css` file or create separate CSS files for each component.
*   **CSS Modules:** You can use CSS Modules for scoped styles within your components.
*   **CSS-in-JS (Optional):** Explore libraries like styled-components or emotion if you want a more dynamic and composable approach to styling.

**9. Local Storage or Database (Optional):**

*   **Local Storage:** Use local storage to save user data (watchlists, ratings) in the user's browser.
*   **Database:** For more robust data storage, you'll need a database like Firebase, MongoDB, or PostgreSQL.

**Example: Movie Card Component with Styled Components:**

```javascript
// src/MovieCard.js
import React from 'react';
import styled from 'styled-components';

const MovieCardContainer = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;
    text-align: center;
`;

const MoviePoster = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 10px;
`;

function MovieCard(props) {
    return (
        <MovieCardContainer>
            <MoviePoster src={props.posterUrl} alt={props.title} />
            <h3>{props.title}</h3>
            <p>Release Date: {props.releaseDate}</p>
        </MovieCardContainer>
    );
}

export default MovieCard;
```

**Remember:**

*   **API Integration:** Use a Bollywood movie data API to get movie data. You'll need to register for an API key or find a free API.
*   **Code Organization:** Keep your components organized and reusable.
*   **User Interface Design:** Make your application user-friendly and visually appealing.
*   **Error Handling:** Implement error handling for API calls and unexpected situations.
*   **Testing:** Write unit tests to ensure your components are working as expected.

**Additional Features (Optional):**

*   **Actor Search:** Allow users to search for actors.
*   **Genre Filtering:** Enable browsing movies by genre.
*   **User Authentication:** Add user login/signup functionality.
*   **Watchlist Management:** Create a watchlist feature where users can save movies.
*   **Movie Ratings:** Allow users to rate movies.
*   **Comments or Reviews:** Add a comments section for users to share reviews.

**Good luck building your Bollywood Movie Database!** 
