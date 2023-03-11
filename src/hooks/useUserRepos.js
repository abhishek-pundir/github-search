import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getUserRepos } from "../sdk/api/users";

export const useUserRepos = (username) => {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
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
