import WatchedMovie from "./WatchedMovie.jsx";

function WatchedMoviesList({ watched }) {
 return (
  <ul className="list">
   {watched.map((movie) => (
    <WatchedMovie movie={movie} key={movie.imdbId} />
   ))}
  </ul>
 );
}

export default WatchedMoviesList;
