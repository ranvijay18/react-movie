import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movie, setMovie] = useState([]);
 const [isLoading, setIsLoading] = useState(false);


 async function fetchMovieHandler(){
  setIsLoading(true);
    const res =  await fetch("https://swapi.dev/api/films/")
    const data = await res.json();
    const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl
          }
        });
   setMovie(transformedMovies);
   setIsLoading(false);
      
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movie} />}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
