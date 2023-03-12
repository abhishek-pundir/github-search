import "./styles.css";

interface UserRepoCardProps {
  repo: {
    svn_url: string;
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
  };
}

const UserRepoCard = (props: UserRepoCardProps) => {
  const { repo } = props;
  return (
    <a
      href={repo.svn_url}
      className="card-wrapper"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="user-repo-card" key={repo.id}>
        <p className="repo-heading">{repo.name}</p>

        {repo?.description && (
          <p className="repo-description">{repo.description}</p>
        )}
        <div className="repo-details">
          {repo?.language && <span className="repo-tag">{repo.language}</span>}
          {repo.stargazers_count !== null && (
            <span className="repo-caption">Stars: {repo.stargazers_count}</span>
          )}
          {repo.forks_count !== null && (
            <span className="repo-caption">Forks: {repo.forks_count}</span>
          )}
        </div>
      </div>
    </a>
  );
};

export default UserRepoCard;
