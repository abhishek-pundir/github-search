import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProfile from "./index";
import { useUserProfile, useUserRepos } from "../../hooks";

jest.mock("../../hooks");

const useUserProfileMock = useUserProfile as jest.MockedFunction<typeof useUserProfile>;
const useUserReposMock = useUserRepos as jest.MockedFunction<typeof useUserRepos>;

describe("UserProfile", () => {
  it("renders a loading state initially", async () => {
    useUserProfileMock.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders error message if the request fails", async () => {
    useUserProfileMock.mockReturnValue({
      isLoading: false,
      isError: true,
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
    useUserProfileMock.mockReturnValue({
      isLoading: false,
      isError: true,
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
      html_url: "https://github.com/sample",
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

    useUserProfileMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    const mockRepoData = {
      ref: jest.fn(),
      status: "success" as const,
      data: {
        pages: [
          [
            {
              id: 1,
              name: "test-repo",
              svn_url: "https://github.com/test/test-repo",
              description: "A test repository",
              language: "JavaScript",
              stargazers_count: 10,
              forks_count: 5,
            },
          ],
        ],
        pageParams: []
      },
      error: null,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    };
    useUserReposMock.mockReturnValue(mockRepoData);

    render(
      <MemoryRouter initialEntries={["/users/abhishek-pundir"]}>
        <UserProfile />
      </MemoryRouter>
    );

    const userCountElement = await screen.findByAltText(
      "Abhishek Profile Picture"
    );

    expect(userCountElement).toBeInTheDocument();
    expect(useUserProfileMock).toHaveBeenCalled();
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
