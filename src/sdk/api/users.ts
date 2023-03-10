import {
  USER_SEARCH_PAGE_SIZE,
  USER_REPOS_PAGE_SIZE,
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../constants";

export interface SearchUserItem {
  id: number;
  login: string;
  avatar_url: string;
}

export interface SearchUsers {
  total_count: number;
  items: SearchUserItem[];
  message?: undefined;
}

export interface SearchError {
  message: string;
  total_count?: undefined;
  items?: undefined;
}

export type SearchUsersResponse =
  | SearchUsers
  | SearchError;

/**
 * Fetches matching GitHub users for the given search query and page number.
 * @param {string} query - The search query to fetch data for.
 * @param {number} page - The page number of the search results to fetch.
 * @returns {Promise<SearchUsersResponse>} - Promise that resolves to a JSON array of matching user data.
 */
export async function getUsers(query: string, page: number): Promise<SearchUsersResponse> {
  const response = await fetch(
    GITHUB_USER_SEARCH_URL +
      `?q=${query}&page=${page}&per_page=${USER_SEARCH_PAGE_SIZE}`
  );

  const data = await response.json();
  return data;
}

export interface UserProfile {
  avatar_url: string;
  name: string | null;
  html_url: string;
  login: string;
  bio: string | null;
  public_repos: number;
  following: number;
  followers: number;
  company: string | null;
  location: string | null;
  twitter_username: string | null;
  blog: string | null;

  message?: undefined;
}

export interface UserProfileError {
  message: string;

  avatar_url?: undefined;
  name?: undefined;
  html_url?: undefined;
  login?: undefined;
  bio?: undefined;
  public_repos?: undefined;
  following?: undefined;
  followers?: undefined;
  company?: undefined;
  location?: undefined;
  twitter_username?: undefined;
  blog?: undefined;
}

export type UserProfileResponse =
  | UserProfile
  | UserProfileError;

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - GitHub username of the user whose details are to be fetched.
 * @returns {Promise<UserProfileResponse>} - Promise that resolves to a JSON data containing user details.
 */
export async function getUserByUsername(username: string): Promise<UserProfileResponse> {
  const response = await fetch(GITHUB_USER_PROFILE_URL + `${username}`);

  const data = await response.json();
  return data;
}

export interface UserRepo {
  svn_url: string;
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface UserReposResponse extends Array<UserRepo>{}

/**
 * Fetches user's Github profile data for the given username.
 * @param {string} username - GitHub username of the user whose repositories are to be fetched.
 * @param {number} page - The page number of the repositories to fetch.
 * @returns {Promise<UserReposResponse>} - Promise that resolves to a JSON array of user repositories data.
 */
export async function getUserRepos(username: string, page: number): Promise<UserReposResponse> {
  const response = await fetch(
    GITHUB_USER_PROFILE_URL +
      `${username}/repos?per_page=${USER_REPOS_PAGE_SIZE}&sort=pushed&page=${page}`
  );

  const data = await response.json();
  return data;
}
