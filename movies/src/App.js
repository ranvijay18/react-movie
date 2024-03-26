import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movie, setMovie] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null)

 const fetchMovieHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null)
  try{
       const res =  await fetch("https://swapi.dev/api/films/")
      if(!res.ok){
      throw new Error('Something went wrong ... Retrying')
    }
     const data = await res.json();
    const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl
          }
        });
   setMovie(transformedMovies);
  }catch(error){
      setError(error.message)
  } 
   setIsLoading(false);
      
 }, [])

 useEffect(() => {
       fetchMovieHandler()
 }, [fetchMovieHandler])



 

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movie} />}
        {isLoading && <p>Loading....</p>}
        {!isLoading && error && <div><p>{error}</p></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
