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
import { UserProvider } from "./Context/UserContext";
import RulesSettingLanding from "./Pages/Parking Lot Admin/ReservationRules/RulesSettingLanding";
function App() {
  return (
    <RulesSettingLanding />
  );
}

export default App;
