import { useState } from "react";
import Summary from "./Summary.jsx";
import WatchedMoviesList from "./WatchedMoviesList.jsx";

function WatchedBox({ tempWatchedData }) {
 const [watched, setWatched] = useState(tempWatchedData);
 const [isOpen2, setIsOpen2] = useState(true);

 return (
  <div className="box">
   <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
    {isOpen2 ? "–" : "+"}
   </button>
   {isOpen2 && (
    <>
     <Summary watched={watched} />
     <WatchedMoviesList watched={watched} />
    </>
   )}
  </div>
 );
}

export default WatchedBox;
