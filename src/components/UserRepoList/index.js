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
            <a href={repo.svn_url} target="_blank" rel="noopener noreferrer">
              <div className="user-repo-card" key={repo.id}>
                <p className="repo-heading">{repo.name}</p>

                {repo?.description && (
                  <p className="repo-description">{repo.description}</p>
                )}
                <div className="repo-details">
                  {repo?.language && (
                    <span className="repo-tag">{repo.language}</span>
                  )}
                  {repo.stargazers_count !== null && (
                    <span className="repo-caption">
                      Stars: {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count !== null && (
                    <span className="repo-caption">
                      Forks: {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>
            </a>
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
