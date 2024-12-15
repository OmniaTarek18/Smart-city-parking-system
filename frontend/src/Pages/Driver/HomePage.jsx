import { Outlet } from "react-router-dom";
import Header from "../../Components/Driver/Header";

function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default HomePage;
