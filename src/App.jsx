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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "9b2da33c";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const moviesNum = movies?.length;

  function handleMovieSelect(movieId) {
    setSelectedId(movieId === selectedId ? null : movieId);
  }

  function onClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  }

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
              onClose={onClose}
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
