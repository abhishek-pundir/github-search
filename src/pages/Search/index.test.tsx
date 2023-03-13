import { render, screen } from "@testing-library/react";
import Search from "./index";

const mockNavigate = jest.fn();
const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe("SearchResult", () => {
  it("renders the GitHub logo", () => {
    render(<Search />);
    const logo = screen.getByAltText("github-logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the SearchBar component", () => {
    render(<Search />);
    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
  });

  it("SearchBar component has the correct class", () => {
    render(<Search />);
    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toHaveClass("flex-center");
  });
});
