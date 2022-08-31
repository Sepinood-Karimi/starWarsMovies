import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [error,setError] = useState(false);
    const [isLoading,setIsLoading]=useState(false);

    const fetchMovieHandler = async () => {
        setIsLoading(true);
        const response = await fetch('https://swapi.dev/api/films');
        const data = await response.json();
        const transformedMovies = data.results.map((movieData) => {
            return {
                id: movieData.episode_id,
                title: movieData.title,
                openingText: movieData.opening_crawl,
                releaseDate: movieData.release_date
            }
        })
        setIsLoading(false);
        setMovies(transformedMovies);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length===0 && <p> There is No Movies!</p>}
                {!isLoading && movies.length>0 && <MoviesList movies={movies}/>}
                {isLoading && <p> Is Loading ... </p>}
            </section>
        </React.Fragment>
    );
}

export default App;
