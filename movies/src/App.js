import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movie, setMovie] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null)
 const [retry, setRetry] = useState(false)

 async function fetchMovieHandler(){
  setIsLoading(true);
  setError(null)
  try{
       const res =  await fetch("https://swapi.dev/api/film/")
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
      setRetry(true)
  } 
   setIsLoading(false);
      
 }
 let timeOut = '';

      if(retry){
     timeOut = setTimeout(() => {
      fetchMovieHandler();
    },5000)
  }

 function handleRetry(){
  setRetry(false);
  clearTimeout(timeOut);
 }


 

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movie} />}
        {isLoading && <p>Loading....</p>}
        {!isLoading && error && <div><p>{error}</p> <button onClick={handleRetry}>Cancel</button></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
