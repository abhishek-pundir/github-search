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
  test("renders input element with correct placeholder", () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    expect(inputElement).toBeInTheDocument();
  });

  test("submitting form with empty query should not navigate", () => {
    render(<SearchBar />);

    fireEvent.click(screen.getByText("Search"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("submitting form with non-empty query should navigate to search page", () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    const submitButton = screen.getByText("Search");
    fireEvent.change(inputElement, { target: { value: "john" } });
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=john");
  });

  test("updates query value when input prop changes", () => {
    const { rerender } = render(<SearchBar input="initial query" />);
    const inputElement = screen.getByPlaceholderText("Search User...");
    expect(inputElement).toHaveValue("initial query");
    rerender(<SearchBar input="updated query" />);
    expect(inputElement).toHaveValue("updated query");
  });
});
