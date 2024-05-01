import Movie from "./Movie.jsx";

function MovieList({ movies, handleMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie handleMovieSelect={handleMovieSelect} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MovieList;
