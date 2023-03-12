import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./index";

const mockNavigate = jest.fn();
const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe("SearchBar", () => {
  it("renders input element with correct placeholder", () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should not navigate on submitting form with empty query", () => {
    render(<SearchBar />);

    fireEvent.click(screen.getByText("Search"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should navigate to search page on submitting form with non-empty query", () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    const submitButton = screen.getByText("Search");
    fireEvent.change(inputElement, { target: { value: "john" } });
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=john");
  });

  it("should update query value when input prop changes", () => {
    const { rerender } = render(<SearchBar input="initial query" />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    expect(inputElement).toHaveValue("initial query");
    rerender(<SearchBar input="updated query" />);
    expect(inputElement).toHaveValue("updated query");
  });
});
