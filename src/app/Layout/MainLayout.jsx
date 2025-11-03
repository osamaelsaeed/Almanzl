import { Outlet } from "react-router-dom";
import SubNav from "../../components/SubNav";
import Navbar from "../../components/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <SubNav />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
