import {
  USER_SEARCH_PAGE_SIZE,
  USER_REPOS_PAGE_SIZE,
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../constants";

/**
 * Fetches matching GitHub users for the given search query and page number.
 * @param {string} query - The search query to fetch data for.
 * @param {number} page - The page number of the search results to fetch.
 * @returns {Promise<Array>} - Promise that resolves to a JSON array of matching user data.
 */
export async function getUsers(query: string, page: number) {
  const response = await fetch(
    GITHUB_USER_SEARCH_URL +
      `?q=${query}&page=${page}&per_page=${USER_SEARCH_PAGE_SIZE}`
  );

  const data = await response.json();
  return data;
}

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - GitHub username of the user whose details are to be fetched.
 * @returns {Promise} - Promise that resolves to a JSON data containing user details.
 */
export async function getUserByUsername(username: string) {
  const response = await fetch(GITHUB_USER_PROFILE_URL + `${username}`);

  const data = await response.json();
  return data;
}

export interface UserRepo {
  svn_url: string
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
}

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - GitHub username of the user whose repositories are to be fetched.
 * @param {number} page - The page number of the repositories to fetch.
 * @returns {Promise<UserRepo[]>} - Promise that resolves to a JSON array of user repositories data.
 */
export async function getUserRepos(username: string, page: number): Promise<UserRepo[]> {
  const response = await fetch(
    GITHUB_USER_PROFILE_URL +
      `${username}/repos?per_page=${USER_REPOS_PAGE_SIZE}&sort=pushed&page=${page}`
  );

  const data = await response.json();
  return data;
}
