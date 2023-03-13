import { rest } from "msw";
import { server } from "../mocks/server";
import { errorResolver, noDataResolver } from "../mocks/resolvers";
import { getUsers, getUserByUsername, getUserRepos } from "../users";
import {
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../../constants";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("Users API Fetch Functions", () => {
  describe("getUsers", () => {
    it("fetches data for users based on the given input and page number", async () => {
      const username = "sample";
      const page = 1;

      // Call the function and wait for the Promise to resolve
      const response = await getUsers(username, page);

      expect(response.total_count).toBeDefined();
      expect(response.items).toBeDefined();
    });

    it("returns error message if search query fails", async () => {
      server.use(rest.get(GITHUB_USER_SEARCH_URL, errorResolver));

      const username = "sample";
      const page = 1;

      // Call the function and wait for the Promise to resolve
      const response = await getUsers(username, page);

      expect(response.message).toBe("Request Failed");
    });

    it("returns total count 0 if no results found", async () => {
      server.use(rest.get(GITHUB_USER_SEARCH_URL, noDataResolver));

      const username = "sample";
      const page = 1;

      // Call the function and wait for the Promise to resolve
      const response = await getUsers(username, page);

      expect(response.total_count).toBe(0);
    });
  });

  describe("getUserByUsername", () => {
    it("fetches user profile data for the given username", async () => {
      const username = "sample";

      // Call the function and wait for the Promise to resolve
      const response = await getUserByUsername(username);

      expect(response.avatar_url).toBeDefined();
      expect(response.message).not.toBeDefined();
    });

    it("returns error message if api request fails", async () => {
      server.use(
        rest.get(GITHUB_USER_PROFILE_URL + ":username", errorResolver)
      );

      const username = "sample";

      // Call the function and wait for the Promise to resolve
      const response = await getUserByUsername(username);

      expect(response.message).toBe("Request Failed");
    });
  });

  describe("getUserRepos", () => {
    it("fetches user repository data for the given username", async () => {
      const username = "sample";
      const page = 1;

      // Call the function and wait for the Promise to resolve
      const response = await getUserRepos(username, page);

      expect(response[0].id).toBeDefined();
      expect(response[0].name).toBeDefined();
    });
  });
});
