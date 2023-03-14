import { render, screen } from "@testing-library/react";
import UserRepoCard from "./index";

describe("UserRepoCard", () => {
  it("renders repo card correctly", () => {
    const repo = {
      id: 1,
      name: "test-repo",
      svn_url: "https://github.com/test/test-repo",
      description: "A test repository",
      language: "JavaScript",
      stargazers_count: 10,
      forks_count: 5,
    };
    render(<UserRepoCard repo={repo} />);
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Stars: 10")).toBeInTheDocument();
    expect(screen.getByText("Forks: 5")).toBeInTheDocument();
  });
});
