import "./styles.css";

const ErrorMessage = ({ message }) => {
  return <div className="flex-center notification">{message}</div>;
};

export default ErrorMessage;
