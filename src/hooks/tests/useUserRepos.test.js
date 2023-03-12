import { act, renderHook } from "@testing-library/react";
import { createWrapper } from "./util";
import { getUserRepos } from "../../sdk/api/users";
import { useUserRepos } from "../useUserRepos";

// Mock API call function
jest.mock("../../sdk/api/users", () => ({
  getUserRepos: jest.fn(),
}));

describe("useUserRepo", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return loading state true initially", async () => {
    const { result } = renderHook(() => useUserRepos("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.status).toBe("loading");
    });

    expect(result.current.ref).toBeDefined();
    expect(result.current.data).not.toBeDefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isFetchingNextPage).toBe(false);
    expect(result.current.hasNextPage).not.toBeDefined();
  });

  it("should fetch next page of data when fetchNextPage is called", async () => {
    const mockData = [
      { id: 1, name: "Repo 1" },
      { id: 2, name: "Repo 2" },
      { id: 3, name: "Repo 3" },
      { id: 4, name: "Repo 4" },
      { id: 5, name: "Repo 5" },
      { id: 6, name: "Repo 6" },
      { id: 7, name: "Repo 7" },
      { id: 8, name: "Repo 8" },
      { id: 9, name: "Repo 9" },
      { id: 10, name: "Repo 10" },
    ];

    getUserRepos.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useUserRepos("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.status).toBe("loading");
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data.pages).toEqual([mockData]);
    });

    getUserRepos.mockResolvedValueOnce(mockData);

    await act(async () => {
      // next page call
      result.current.fetchNextPage();
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data.pages).toEqual([mockData, mockData]);
    });
  });

  it("should set hasNextPage to false when there is no next page", async () => {
    getUserRepos.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useUserRepos("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.status).toBe("loading");
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data.pages).toEqual([[]]);
      expect(result.current.hasNextPage).toEqual(false);
    });
  });
});
