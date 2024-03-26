import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-movie-8cf32-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data)
      let loadedData = []
       
      for( let key in data){
        loadedData.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
     
      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

 async function addMovieHandler(movie) {
    const res = fetch("https://react-movie-8cf32-default-rtdb.firebaseio.com/movies.json",{
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        'Content-Type' : 'application/json'
      }
    });

  }

  const handleDelete = useCallback ((id) => {
    console.log(id);
       const res = fetch(`https://react-movie-8cf32-default-rtdb.firebaseio.com/movies/${id}.json()`, {
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
       })
  },[])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler, handleDelete]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDelete={handleDelete}/>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
