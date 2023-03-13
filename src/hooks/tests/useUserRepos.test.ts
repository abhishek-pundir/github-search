import { act, renderHook } from "@testing-library/react";
import { createWrapper } from "./util";
import { getUserRepos } from "../../sdk/api/users";
import { useUserRepos } from "../useUserRepos";

// Mock API call function
jest.mock("../../sdk/api/users", () => ({
  getUserRepos: jest.fn(),
}));

const getUserReposMock = getUserRepos as jest.MockedFunction<typeof getUserRepos>;

const mockUserRepoData = [
  {
    id: 1,
    name: "Repo 1",
    svn_url: "url1",
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 2,
    name: "Repo 2",
    svn_url: "url2",
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
];

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
    getUserReposMock.mockResolvedValueOnce(mockUserRepoData);

    const { result } = renderHook(() => useUserRepos("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.status).toBe("loading");
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data?.pages).toEqual([mockUserRepoData]);
    });

    getUserReposMock.mockResolvedValueOnce(mockUserRepoData);

    await act(async () => {
      // next page call
      result.current.fetchNextPage();
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data?.pages).toEqual([
        mockUserRepoData,
        mockUserRepoData,
      ]);
    });
  });

  it("should set hasNextPage to false when there is no next page", async () => {
    getUserReposMock.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useUserRepos("test"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      expect(result.current.status).toBe("loading");
    });

    await act(async () => {
      expect(result.current.status).toBe("success");
      expect(result.current.data?.pages).toEqual([[]]);
      expect(result.current.hasNextPage).toEqual(false);
    });
  });
});
