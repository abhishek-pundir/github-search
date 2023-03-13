import { render, screen } from "@testing-library/react";
import { useUserRepos, UseUserRepos } from "../../hooks/useUserRepos";
import UserRepoList from "./index";

jest.mock("../../hooks/useUserRepos");

const useUserReposMock = useUserRepos as jest.MockedFunction<typeof useUserRepos>;

const mockRepoPages = [
  [
    {
      id: 1,
      name: "Repo 1",
      svn_url: "url1",
      description: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
    },
    {
      id: 2,
      name: "Repo 2",
      svn_url: "url2",
      description: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
    },
  ],
  [
    {
      id: 3,
      name: "Repo 3",
      svn_url: "url3",
      description: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
    },
  ],
];

describe("UserRepoList", () => {
  it("renders a loading state initially", () => {
    useUserReposMock.mockReturnValue({
      ref: jest.fn(),
      status: "loading",
      data: undefined,
      error: null,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(<UserRepoList username="test" />);

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders error message if user repositories data fails to load", () => {
    const mockError = new Error("Failed to load Repositories");

    useUserReposMock.mockReturnValue({
      ref: jest.fn(),
      status: "error",
      data: undefined,
      error: mockError,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(<UserRepoList username="test" />);

    expect(
      screen.getByText(/Failed to load Repositories/i)
    ).toBeInTheDocument();
  });

  it("renders list of user repositories when data is loaded", () => {
    const mockData: UseUserRepos = {
      ref: jest.fn(),
      status: "success",
      data: {
        pages: mockRepoPages,
        pageParams: [],
      },
      error: null,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    };
    useUserReposMock.mockReturnValue(mockData);

    render(<UserRepoList username="test" />);

    expect(screen.getByText("Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
    expect(screen.getByText("Repo 3")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("renders loader while fetching next page", async () => {
    const mockData: UseUserRepos = {
      ref: jest.fn(),
      status: "success",
      data: {
        pages: mockRepoPages,
        pageParams: [],
      },
      error: null,
      isFetchingNextPage: true,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    };
    useUserReposMock.mockReturnValue(mockData);

    render(<UserRepoList username="test" />);

    const loaderElement = screen.getByTestId("bounce-loader");

    expect(loaderElement).toBeInTheDocument();
  });
});
