import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getUserRepos } from "../../sdk/api/users";
import "./styles.css";
import Loader from "../Loader";

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
      {data?.pages?.map((page) => (
        <>
          {page.map((repo) => (
            <div key={repo.id}>
              <p className="heading">{repo.name}</p>
              <p className="sub-heading">{repo.description}</p>
              <p className="sub-heading">{repo.language}</p>
              <p className="sub-heading">Stars: {repo.stargazers_count}</p>
              <p className="sub-heading">Forks: {repo.forks_count}</p>
            </div>
          ))}
        </>
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
