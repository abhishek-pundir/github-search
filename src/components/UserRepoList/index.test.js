import React from "react";
import { render, screen } from "@testing-library/react";
import { useUserRepos } from "../../hooks/useUserRepos";
import UserRepoList from "./index";

jest.mock("../../hooks/useUserRepos");

describe("UserRepoList", () => {
  it("renders a loading state initially", () => {
    useUserRepos.mockReturnValue({
      status: "loading",
      data: null,
      error: null,
      isFetchingNextPage: false,
      hasNextPage: false,
    });

    render(<UserRepoList username="test" />);

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders error message if user repositories data fails to load", () => {
    useUserRepos.mockReturnValue({
      status: "error",
      data: null,
      error: { message: "Failed to load Repositories" },
      isFetchingNextPage: false,
      hasNextPage: false,
    });

    render(<UserRepoList username="test" />);

    expect(
      screen.getByText(/Failed to load Repositories/i)
    ).toBeInTheDocument();
  });

  it("renders list of user repositories when data is loaded", () => {
    const mockData = {
      status: "success",
      data: {
        pages: [
          [
            { id: 1, name: "Repo 1" },
            { id: 2, name: "Repo 2" },
          ],
          [{ id: 3, name: "Repo 3" }],
        ],
      },
      error: null,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    };
    useUserRepos.mockReturnValue(mockData);

    render(<UserRepoList username="test" />);

    expect(screen.getByText("Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
    expect(screen.getByText("Repo 3")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("renders loader while fetching next page", async () => {
    const mockData = {
      status: "success",
      data: {
        pages: [
          [
            { id: 1, name: "Repo 1" },
            { id: 2, name: "Repo 2" },
          ],
          [{ id: 3, name: "Repo 3" }],
        ],
      },
      error: null,
      isFetchingNextPage: true,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    };
    useUserRepos.mockReturnValue(mockData);

    render(<UserRepoList username="test" />);

    const loaderElement = screen.getByTestId("bounce-loader");

    expect(loaderElement).toBeInTheDocument();
  });
});
