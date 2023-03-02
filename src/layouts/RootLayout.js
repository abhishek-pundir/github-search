import { Outlet } from "react-router-dom";
import "./styles.css";

const RootLayout = () => {
  return (
    <>
      <header>Github Search</header>
      <main className="body-container">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
