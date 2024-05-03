import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Search({ query, handleSearch }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) {
        return;
      }

      if (e.code === "Enter") {
        inputEl.current.focus();
        handleSearch("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [handleSearch]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      ref={inputEl}
    />
  );
}

Search.propTypes = {
  query: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default Search;
