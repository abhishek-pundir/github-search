import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getUserRepos } from "../../sdk/api/users";
import "./styles.css";
import Loader from "../Loader";
import UserRepoCard from "../UserRepoCard";

const UserRepoList = () => {
  const { username } = useParams();

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

  // Error and loading states
  if (status === "error")
    return <div>Failed to load Repositories {error.message}</div>;
  if (status === "loading")
    return (
      <div className="loader-wrapper">
        <span className="loader-btn">
          <Loader />
        </span>
      </div>
    );

  return (
    <div className="user-repo">
      {data?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page?.map((repo) => (
            <UserRepoCard repo={repo} key={repo.id} />
          ))}
        </React.Fragment>
      ))}
      <div ref={ref}>
        <span>
          {isFetchingNextPage && <Loader />}
          {!isFetchingNextPage && hasNextPage && "Load More"}
        </span>
      </div>
    </div>
  );
};

export default UserRepoList;
