import "./styles.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className="flex-center notification">{message}</div>;
};

export default ErrorMessage;
