import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies.jsx";
import { KEY } from "./config.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

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
