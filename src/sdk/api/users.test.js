import { getUsers, getUserByUsername, getUserRepos } from "./users";
import {
  USER_SEARCH_PAGE_SIZE,
  USER_REPOS_PAGE_SIZE,
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../constants";

describe("API Fetch Functions", () => {
  describe("getUsers", () => {
    it("fetches data for users based on the given input and page number", async () => {
      const username = "sample";
      const page = 1;
      const expectedUrl =
        GITHUB_USER_SEARCH_URL +
        `?q=${username}&page=${page}&per_page=${USER_SEARCH_PAGE_SIZE}`;

      // Mock the fetch function to return a resolved Promise with mock data
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });

      // Call the function and wait for the Promise to resolve
      await getUsers(username, page);

      // Check that the fetch function was called with the expected URL
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);

      // Restore the original fetch function
      global.fetch.mockRestore();
    });
  });

  describe("getUserByUsername", () => {
    it("fetches user profile data for the given username", async () => {
      const username = "sample";
      const expectedUrl = GITHUB_USER_PROFILE_URL + `${username}`;

      // Mock the fetch function to return a resolved Promise with mock data
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      // Call the function and wait for the Promise to resolve
      await getUserByUsername(username);

      // Check that the fetch function was called with the expected URL
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);

      // Restore the original fetch function
      global.fetch.mockRestore();
    });
  });

  describe("getUserRepos", () => {
    it("fetches user repository data for the given username", async () => {
      const username = "sample";
      const page = 1;
      const expectedUrl =
        GITHUB_USER_PROFILE_URL +
        `${username}/repos?per_page=${USER_REPOS_PAGE_SIZE}&sort=pushed&page=${page}`;

      // Mock the fetch function to return a resolved Promise with mock data
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });

      // Call the function and wait for the Promise to resolve
      await getUserRepos(username, page);

      // Check that the fetch function was called with the expected URL
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);

      // Restore the original fetch function
      global.fetch.mockRestore();
    });
  });
});
