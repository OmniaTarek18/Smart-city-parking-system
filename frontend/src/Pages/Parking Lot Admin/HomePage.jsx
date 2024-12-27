import { Outlet } from "react-router-dom";
import Header from "../../Components/Parking Lot Admin/Header";

function LotAdminHomePage() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default LotAdminHomePage;
