import { act, renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "./util";
import { useSearchUsers } from "../useSearchUsers";
import { getUsers } from "../../sdk/api/users";

// Mock getUsers API call function
jest.mock("../../sdk/api/users", () => ({
  getUsers: jest.fn(),
}));

describe("useSearchUsers", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return loading state true initially", async () => {
    const { result } = renderHook(() => useSearchUsers("test", 1), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
    });
  });

  it("should return user search data after successful API call", async () => {
    const mockData = {
      total_count: 2,
      items: [
        {
          id: 1,
          login: "user1",
          avatar_url: "https://avatar1.com",
        },
        {
          id: 2,
          login: "user2",
          avatar_url: "https://avatar2.com",
        },
      ],
    };
    getUsers.mockResolvedValue(mockData);

    const { result } = renderHook(() => useSearchUsers("testUser", 1), {
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

    const error = new Error("Failed to fetch users");
    error.message = "Request Failed";
    getUsers.mockRejectedValue(error);

    const { result } = renderHook(() => useSearchUsers("sample", 1), {
      wrapper: createWrapper(false),
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for the error state to be set
    await waitFor(() => expect(result.current.isError).toEqual(true));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
