import { Routes, Route } from "react-router-dom";
import RegisterationPage from "./Pages/Registeration/RegisterationPage";
import PaymentMethodDetails from "./Pages/Registeration/PaymentMethodDetails";
import "./App.css";
import SearchPage from "./Pages/Driver/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterationPage />} />
      <Route path="/payment-details" element={<PaymentMethodDetails />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
