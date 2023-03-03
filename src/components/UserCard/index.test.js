import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "./index";

const mockNavigate = jest.fn();
const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

const mockUser = {
  login: "octocat",
  avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
};

describe("UserCard", () => {
  test("renders github username of user", () => {
    render(<UserCard data={mockUser} />);
    const username = screen.getByText(`@${mockUser.login}`);
    expect(username).toBeInTheDocument();
  });

  test("navigates to user profile when clicked", () => {
    render(<UserCard data={mockUser} />);

    const userCard = screen.getByTestId("user-card");
    fireEvent.click(userCard);
    expect(mockNavigate).toHaveBeenCalledWith(`/user/${mockUser.login}`);
  });
});
