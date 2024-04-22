import { useState } from "react";
import Navigation from "./components/Navigation/index.jsx";
import Main from "./components/Main/index.jsx";
import Search from "./components/Navigation/Search.jsx";
import NumResults from "./components/Navigation/NumResults.jsx";
import Box from "./components/Main/Box.jsx";
import MovieList from "./components/Main/Movie/MovieList.jsx";
import Summary from "./components/Main/WatchedMovie/Summary.jsx";
import WatchedMoviesList from "./components/Main/WatchedMovie/WatchedMoviesList.jsx";

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

export default function App() {
 const [query, setQuery] = useState("");
 const [watched, setWatched] = useState(tempWatchedData);
 const [movies, setMovies] = useState(tempMovieData);
 const moviesNum = movies.length;

 return (
  <>
   <Navigation>
    <Search query={query} />
    <NumResults moviesNum={moviesNum} />
   </Navigation>

   <Main>
    <Box>
     <MovieList movies={movies} />
    </Box>

    <Box>
     <Summary watched={watched} />
     <WatchedMoviesList watched={watched} />
    </Box>
   </Main>
  </>
 );
}
