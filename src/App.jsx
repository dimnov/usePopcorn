import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/index.jsx";
import Main from "./components/Main/index.jsx";
import Search from "./components/Navigation/Search.jsx";
import NumResults from "./components/Navigation/NumResults.jsx";
import Box from "./components/Main/Box.jsx";
import MovieList from "./components/Main/Movie/MovieList.jsx";
import WatchedSummary from "./components/Main/WatchedMovie/WatchedSummary.jsx";
import WatchedMoviesList from "./components/Main/WatchedMovie/WatchedMoviesList.jsx";
import Loader from "./components/Main/Loader.jsx";
import MovieDetails from "./components/Main/Movie/MovieDetails.jsx";

const KEY = "9b2da33c";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");

    return JSON.parse(storedValue);
  });

  const moviesNum = movies?.length;

  function handleMovieSelect(movieId) {
    setSelectedId(movieId === selectedId ? null : movieId);
  }

  function onMovieClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://www.omdbapi.com/?apiKey=${KEY}&s=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("No internet connection");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  function handleSearch(query) {
    setQuery(query);
  }

  return (
    <>
      <Navigation>
        <Search query={query} handleSearch={handleSearch} />
        <NumResults moviesNum={moviesNum} />
      </Navigation>

      <Main>
        <Box>
          {isLoading ? (
            <Loader error={error} />
          ) : (
            <MovieList handleMovieSelect={handleMovieSelect} movies={movies} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              KEY={KEY}
              selectedId={selectedId}
              onMovieClose={onMovieClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
