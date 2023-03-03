import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

/**
 *
 * @param {string} props.className - CSS class name to apply to the rendered element.
 * @param {string} props.input - Search input
 * @returns {React.ReactElement}
 */
const SearchBar = (props) => {
  let { className = "", input = "" } = props;
  const [query, setQuery] = useState(input);

  // update search text based on input prop
  useEffect(() => {
    setQuery(input);
  }, [input]);

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${query.trim()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`search-wrapper ${className}`}>
        <input
          className="search-input"
          placeholder="Search User..."
          type="text"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
