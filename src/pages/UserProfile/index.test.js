import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProfile from "./index";
import { useUserProfile } from "../../hooks/useUserProfile";

jest.mock("../../components/UserRepoList/index", () => "div");
jest.mock("../../hooks/useUserProfile");

describe("SearchResult", () => {
  it("renders a loading state initially", async () => {
    useUserProfile.mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders error message if the request fails", async () => {
    useUserProfile.mockReturnValue({
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

  it("renders correct error message when user is not found", async () => {
    useUserProfile.mockReturnValue({
      isLoading: false,
      data: {
        message: "Not Found",
      },
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    const errorMessageElement = await screen.findByText("User Not Found");
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

    useUserProfile.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    const userCountElement = await screen.findByAltText(
      "Abhishek's Profile Picture"
    );

    expect(userCountElement).toBeInTheDocument();
    expect(useUserProfile).toHaveBeenCalled();
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
