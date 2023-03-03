import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import "./styles.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRoot, setIsRoot] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const isRootLocation = location.pathname === "/";
    setIsRoot(isRootLocation);

    const query = new URLSearchParams(location.search).get("q");
    setQuery(query);
  }, [location]);

  function handleLogoClick(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="header">
      {!isRoot && (
        <a href="/" onClick={handleLogoClick} className="logo-sm">
          <img
            src={process.env.PUBLIC_URL + "/images/github.png"}
            alt="github-logo"
          />
        </a>
      )}

      {!isRoot && (
        <div className="header-left">
          <SearchBar input={query ?? ""} />
        </div>
      )}

      <div className="header-right"></div>
    </div>
  );
};

export default Header;
