import { useRef } from "react";
import PropTypes from "prop-types";
import { useKey } from "../../hooks/useKey.jsx";

function Search({ query, handleSearch }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      return;
    }

    inputEl.current.focus();
    handleSearch("");
  });

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
