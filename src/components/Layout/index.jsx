import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./style.css";

function Layout() {
  return (
    <div className="layout">
      <Header />

      <main className="layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;