import "./RegisterationPage";
import CreditCard from "../../Components/Registeration/CreditCard";
function PaymentMethodDetails() {
  return (
    <div className="form-conatiner d-flex justify-content-center align-items-center vh-100">
      <div className="form p-4">
        <div className="mt-3">
          <CreditCard />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodDetails;
