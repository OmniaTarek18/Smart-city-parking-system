import { Routes, Route } from "react-router-dom";
import RegisterationPage from "./Pages/Registeration/RegisterationPage";
import PaymentMethodDetails from "./Pages/Registeration/PaymentMethodDetails";
import "./App.css";
import AdminHomePage from "./Pages/System Admin/HomePage";
import HomePage from "./Pages/Driver/HomePage";
import LotAdminHomePage from "./Pages/Parking Lot Admin/HomePage";
import History from "./Pages/Driver/History";
import Profile from "./Pages/Driver/Profile";
import Search from "./Pages/Driver/Search";
import DisplayLots from "./Pages/Driver/DisplayLots";
import MyLot from "./Pages/Parking Lot Admin/MyLot";
import Users from "./Pages/System Admin/Users";
import LotManagers from "./Pages/System Admin/LotManagers";
import Insights from "./Pages/System Admin/Insights";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterationPage />} />
      <Route path="/payment-details" element={<PaymentMethodDetails />} />
      <Route path="/user-home-page" element={<HomePage />}>
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="display-lots" element={<DisplayLots />} />
      </Route>
      <Route path="/lot-admin-home-page" element={<LotAdminHomePage />}>
        <Route path="my lot" element={<MyLot />} />
        {/* <Route path="/lot-admin-home-page/profile" element={<Profile />} /> */}
      </Route>
      <Route path="/system-admin-home-page" element={<AdminHomePage />}>
        <Route path="users" element={<Users />} />
        <Route path="lot managers" element={<LotManagers />} />
        <Route path="insights" element={<Insights />} />
      </Route>
    </Routes>
  );
}

export default App;
