import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovieHandler = useCallback(
        async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://swapi.dev/api/films');
                if (!response.ok) {
                    throw new Error('Something Went Wrong!');
                }
                const data = await response.json();
                const transformedMovies = data.results.map((movieData) => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date
                    }
                })
                setMovies(transformedMovies);
            } catch (error) {
                setError(error.message)
            }
            setIsLoading(false);
        }, []
    )

    useEffect(() => {
        fetchMovieHandler();
    }, [fetchMovieHandler]);

    let content = <p> There is No Movies!</p>

    if (isLoading) {
        content = <p> Is Loading ...</p>
    }
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }
    if (error) {
        content = <p> {error}</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
