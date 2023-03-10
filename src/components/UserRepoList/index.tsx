import React from "react";
import { useUserRepos } from "../../hooks";
import "./styles.css";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import UserRepoCard from "../UserRepoCard";

interface UserRepoListProps {
  username: string;
}

const UserRepoList = (props: UserRepoListProps) => {
  const { username } = props;

  const { ref, status, data, error, isFetchingNextPage, hasNextPage } =
    useUserRepos(username);

  // Error and loading states
  if (status === "error")
    return (
      <ErrorMessage message={`Failed to load Repositories ${error?.message}`} />
    );
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
