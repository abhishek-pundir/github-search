import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./styles.css";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="body-container">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
