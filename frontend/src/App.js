import { Routes, Route } from "react-router-dom";
import RegisterationPage from "./Pages/Registeration/RegisterationPage";
import PaymentMethodDetails from "./Pages/Registeration/PaymentMethodDetails";
import "./App.css";
import HomePage from "./Pages/Driver/HomePage";
import History from "./Pages/Driver/History";
import Profile from "./Pages/Driver/Profile";
import Search from "./Pages/Driver/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterationPage />} />
      <Route path="/payment-details" element={<PaymentMethodDetails />} />
      <Route path="/user-home-page" element={<HomePage />}>
        <Route path="/user-home-page/history" element={<History />} />
        <Route path="/user-home-page/profile" element={<Profile />} />
        <Route path="/user-home-page/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
