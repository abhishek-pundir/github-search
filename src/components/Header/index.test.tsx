import { fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { routeConfig, queryClient } from "../../App";
import Header from "./index";

const mockNavigate = jest.fn();
const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe("Header", () => {
  it("renders logo", () => {
    render(<Header />);

    const logo = screen.getByAltText("github-logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders search bar on non root pages", () => {
    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/search?q=sample"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    const searchBar = screen.getByPlaceholderText("Search User...");
    expect(searchBar).toBeInTheDocument();
  });

  it("navigates to root when logo is clicked", () => {
    render(<Header />);

    fireEvent.click(screen.getByAltText("github-logo"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
