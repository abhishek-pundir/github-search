import { act, renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "./util";
import { useUserProfile } from "../useUserProfile";
import { getUserByUsername } from "../../sdk/api/users";

// Mock getUserByUsername API call function
jest.mock("../../sdk/api/users", () => ({
  getUserByUsername: jest.fn(),
}));

describe("useUserProfile", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return loading state true initially", async () => {
    const mockData = {
      avatar_url: "https://avatar.com",
      name: "Test",
      login: "testUser",
      bio: "Software developer",
      public_repos: 10,
      following: 20,
      followers: 30,
      company: "Sample",
      location: "World",
      twitter_username: "sampleUser",
      blog: "",
    };
    getUserByUsername.mockResolvedValue(mockData);

    const { result } = renderHook(() => useUserProfile("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
    });
  });

  it("should return user data after successful API call", async () => {
    const mockData = {
      avatar_url: "https://avatar.com",
      name: "Test",
      login: "testUser",
      bio: "Software developer",
      public_repos: 10,
      following: 20,
      followers: 30,
      company: "Sample",
      location: "World",
      twitter_username: "sampleUser",
      blog: "",
    };
    getUserByUsername.mockResolvedValue(mockData);

    const { result } = renderHook(() => useUserProfile("testUser"), {
      wrapper: createWrapper(),
    });

    // Expect initial data to be undefined
    await act(async () => {
      expect(result.current.data).toEqual(undefined);
    });

    // Expect the state update after successful API call to contain the mock data
    await act(async () => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  it("should return error state after unsuccessful API call", async () => {
    console.error = jest.fn();

    const error = new Error("Failed to fetch user profile");
    error.message = "Not Found";
    getUserByUsername.mockRejectedValue(error);

    const { result } = renderHook(() => useUserProfile("rejectUser"), {
      wrapper: createWrapper(false),
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for the error state to be set
    await waitFor(() => expect(result.current.isError).toEqual(true));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
