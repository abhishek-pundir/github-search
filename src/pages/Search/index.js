import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Search = () => {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${query.trim()}`);
    }
  }

  return (
    <div className="search-layout max-sm:mx-5 mx-auto max-w-prose">
      <img
        src={process.env.PUBLIC_URL + "/images/github.png"}
        alt="github-logo"
        className="logo mx-auto"
      />
      <form onSubmit={handleSubmit}>
        <div className="search-wrapper">
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
    </div>
  );
};

export default Search;
