import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useQuery } from "react-query";
import UserProfile from "./index";
import { getUserByUsername } from "../../sdk/api/users";

jest.mock("react-query");
jest.mock("../../components/UserRepoList/index", () => "div");
jest.mock("../../sdk/api/users");

const mockRef = jest.fn();
const mockInView = jest.fn();

jest.mock("react-intersection-observer", () => ({
  ...jest.requireActual("react-intersection-observer"),
  useNavigate: () => mockRef,
  useLocation: () => mockInView,
}));

describe("SearchResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a loading state initially", () => {
    useQuery.mockReturnValue({
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders an error message if the search query fails", async () => {
    useQuery.mockReturnValue({
      isLoading: false,
      data: {
        message: "Request Failed",
      },
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    const errorMessageElement = await screen.findByText(
      "Request Failed. Please try after some time"
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("renders the user profile when data is fetched successfully", async () => {
    const mockData = {
      avatar_url: "https://avatar.com",
      name: "Abhishek",
      login: "abhishek-pundir",
      bio: "A software developer",
      public_repos: 10,
      following: 20,
      followers: 30,
      company: "Sample",
      location: "Test",
      twitter_username: "abhishektwitter",
      blog: "https://abhishekpundir.com",
    };

    useQuery.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    getUserByUsername.mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    const userCountElement = await screen.findByAltText(
      "Abhishek's Profile Picture"
    );

    expect(userCountElement).toBeInTheDocument();
    expect(useQuery).toHaveBeenCalled();
    expect(screen.getByText("abhishek-pundir")).toBeInTheDocument();
    expect(screen.getByText("abhishek-pundir")).toBeInTheDocument();
    expect(screen.getByText("A software developer")).toBeInTheDocument();
    expect(screen.getByText("Repos")).toBeInTheDocument();
    expect(
      screen.getByText(mockData.public_repos.toString())
    ).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByText(mockData.following.toString())).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText(mockData.followers.toString())).toBeInTheDocument();
    expect(screen.getByText(mockData.company)).toBeInTheDocument();
    expect(screen.getByText(mockData.location)).toBeInTheDocument();
    expect(screen.getByText(mockData.twitter_username)).toBeInTheDocument();
    expect(screen.getByText(mockData.blog)).toBeInTheDocument();
  });
});
