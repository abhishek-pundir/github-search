import { useEffect } from "react";
import { useInfiniteQuery, InfiniteData, FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";
import { useInView } from "react-intersection-observer";
import { getUserRepos, UserRepo } from "../sdk/api/users";

export interface UseUserRepos {
  ref: (node?: Element | null) => void;
  status: "idle" | "error" | "loading" | "success";
  data: InfiniteData<UserRepo[]> | undefined;
  error: Error | null;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<UserRepo[], Error>>;
  hasNextPage: boolean | undefined;
}

export const useUserRepos = (username: string) => {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<UserRepo[], Error>({
    queryKey: ["user-repos", { username }],
    queryFn: ({ pageParam = 1 }) => getUserRepos(username, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length > 0) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView) {
      if (isFetchingNextPage) return;
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  return {
    ref,
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
