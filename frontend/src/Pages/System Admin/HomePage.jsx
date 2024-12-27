import { Outlet } from "react-router-dom";
import Header from "../../Components/System Admin/Header";

function AdminHomePage() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default AdminHomePage;
