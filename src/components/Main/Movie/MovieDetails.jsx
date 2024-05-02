import { useEffect, useState } from "react";
import StarRating from "../StarRating.jsx";
import Loader from "../Loader.jsx";

function MovieDetails({ KEY, selectedId, onClose, onAddWatched, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);

      const res = await fetch(`http://www.omdbapi.com/?apiKey=${KEY}&i=${selectedId}`);
      const data = await res.json();

      setMovieDetails(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onClose();
  }

  function onSetRating(rating) {
    setUserRating(rating);
  }

  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE | ${title}`;
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating size={1.5} maxRating={10} onSetRating={onSetRating} />
                  <button
                    disabled={userRating > 0 ? false : true}
                    className={userRating > 0 ? "btn-add" : "btn-add disabled"}
                    onClick={handleAdd}
                  >
                    + Add to list
                  </button>
                </>
              ) : (
                <p>
                  You rated {title} with {watchedUserRating}
                  <span>⭐</span>.
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}.</p>
            <p>Directed by {director}.</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
