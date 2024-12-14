import React, { useState } from "react";
import SignUp from "../../Components/Registeration/Signup";
import Login from "../../Components/Registeration/Login"; 
import "./registeration.css";
function RegisterationPage() {
  const [showLogin, setShowLogin] = useState(false);
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div className="form-conatiner d-flex justify-content-center align-items-center vh-100">
      <div className="form p-4">
        {showLogin ? <Login /> : <SignUp />}
        <div className="text-center mt-3">
          <button onClick={toggleForm} className="btn btn-link">
            {showLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterationPage;
