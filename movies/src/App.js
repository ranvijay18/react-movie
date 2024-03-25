import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movie, setMovie] = useState([]);


 async function fetchMovieHandler(){
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
      
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movie} />
      </section>
    </React.Fragment>
  );
}

export default App;
