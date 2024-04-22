import WatchedBox from "./WatchedBox/index.jsx";
import ListBox from "./ListBox/index.jsx";

function Main({ tempMovieData, tempWatchedData }) {
 return (
  <main className="main">
   <ListBox tempMovieData={tempMovieData} />
   <WatchedBox tempWatchedData={tempWatchedData} />
  </main>
 );
}

export default Main;
