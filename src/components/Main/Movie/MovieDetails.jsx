import { useEffect, useState } from "react";
import StarRating from "../StarRating.jsx";

function MovieDetails({ KEY, selectedId, onClose }) {
  const [movieDetails, setMovieDetails] = useState({});

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
      const res = await fetch(`http://www.omdbapi.com/?apiKey=${KEY}&i=${selectedId}`);
      const data = await res.json();

      setMovieDetails(data);
    }

    getMovieDetails();
  }, []);

  return (
    <div className="details">
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
          <StarRating size={1.5} maxRating={10} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}.</p>
        <p>Directed by {director}.</p>
      </section>
    </div>
  );
}

export default MovieDetails;
