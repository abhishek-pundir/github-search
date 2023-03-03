import {
  USER_SEARCH_PAGE_SIZE,
  USER_REPOS_PAGE_SIZE,
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../constants";

/**
 * Fetches data for users based on the given input and page number.
 * @param {string} username - The search query to fetch data for.
 * @param {number} page - The page number of the data to fetch.
 * @returns {Promise<Array>} - Promise that resolves to a JSON array of data.
 */
export async function getUsers(username, page) {
  const response = await fetch(
    GITHUB_USER_SEARCH_URL +
      `?q=${username}&page=${page}&per_page=${USER_SEARCH_PAGE_SIZE}`
  );

  const data = await response.json();
  return data;
}

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - The search query to fetch data for.
 * @param {number} page - The page number of the data to fetch.
 * @returns {Promise<Array>} - Promise that resolves to a JSON array of data.
 */
export async function getUserByUsername(username) {
  const response = await fetch(GITHUB_USER_PROFILE_URL + `${username}`);

  const data = await response.json();
  return data;
}

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - The search query to fetch data for.
 * @param {number} page - The page number of the data to fetch.
 * @returns {Promise<Array>} - Promise that resolves to a JSON array of data.
 */
export async function getUserRepos(username, page) {
  const response = await fetch(
    GITHUB_USER_PROFILE_URL +
      `${username}/repos?per_page=${USER_REPOS_PAGE_SIZE}&sort=pushed&page=${page}`
  );

  const data = await response.json();
  return data;
}
