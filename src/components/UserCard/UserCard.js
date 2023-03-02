import { useNavigate } from "react-router-dom";
import "./styles.css";

const UserCard = (props) => {
  const { data } = props;

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/user/${data.login}`);
  }

  return (
    <div className="user-card" onClick={handleNavigate}>
      <div className="user-avatar">
        <img src={data.avatar_url} alt="user avatar" />
      </div>
      <div className="user-detail">
        <p className="username">@{data.login}</p>
      </div>
    </div>
  );
};

export default UserCard;
