import { useState } from "react";
import Movie from "./Movie.jsx";

function MovieList({ tempMovieData }) {
 const [movies, setMovies] = useState(tempMovieData);

 return (
  <ul className="list">
   {movies?.map((movie) => (
    <Movie movie={movie} key={movie.imdbId} />
   ))}
  </ul>
 );
}

export default MovieList;
