import SearchBar from "../../components/SearchBar";
import "./styles.css";

const Search = () => {
  return (
    <div className="search-layout">
      <img
        src={process.env.PUBLIC_URL + "/images/github.png"}
        alt="github-logo"
        className="logo mx-auto"
      />
      <SearchBar className="flex-center" />
    </div>
  );
};

export default Search;
