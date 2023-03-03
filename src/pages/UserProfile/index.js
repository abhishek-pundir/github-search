import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserByUsername } from "../../sdk/api/users";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaTwitter, FaLink } from "react-icons/fa";
import "./styles.css";
import UserRepoList from "../../components/UserRepoList";
import Loader from "../../components/Loader";

const UserProfile = () => {
  const { username } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["userProfile", { username }],
    queryFn: () => getUserByUsername(username),
  });

  // Error and loading states
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <Loader />;

  return (
    <div className="profile-layout">
      <div className="user-summary">
        <div className="profile-avatar">
          <img
            src={data.avatar_url}
            alt={data.name + "'s Profile Picture"}
            className="avatar"
          />
          <div className="username-wrapper">
            <h1 className="name-heading">{data.name}</h1>
            <h3 className="name-subheading">{data.login}</h3>
          </div>
        </div>
        <div className="bio">{data.bio && <p>{data.bio}</p>}</div>
        <div className="stats">
          <div className="stats-item">
            <label>Repos</label>
            <label>{data.public_repos}</label>
          </div>
          <div className="stats-item">
            <label>Following</label>
            <label>{data.following}</label>
          </div>
          <div className="stats-item">
            <label>Followers</label>
            <label>{data.followers}</label>
          </div>
        </div>
        <div className="contact">
          <ul className="contact-list">
            {data?.company && (
              <li>
                <HiOutlineBuildingOffice2 />
                <span>{data.company}</span>
              </li>
            )}
            {data?.location && (
              <li>
                <HiOutlineLocationMarker />
                <span>{data.location}</span>
              </li>
            )}
            {data?.twitter_username && (
              <li>
                <FaTwitter />
                <span>{data.twitter_username}</span>
              </li>
            )}
            {data?.blog && (
              <li>
                <FaLink />
                <span>{data.blog}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="user-repo">
        <UserRepoList />
      </div>
    </div>
  );
};

export default UserProfile;
