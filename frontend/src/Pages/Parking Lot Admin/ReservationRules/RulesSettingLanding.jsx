import { useState } from "react";
import RulesSettingModal from "../../../Components/Parking Lot Admin/Rules Setting/RulesSettingModal";
import RulesSettingHeader from "../../../Components/Parking Lot Admin/Rules Setting/RulesSettingHeader"
import RulesContent from "../../../Components/Parking Lot Admin/Rules Setting/RulesContent";
import RulesFooter from "../../../Components/Parking Lot Admin/Rules Setting/RulesFooter";
import "./rulessettinglanding.css";

function RulesSettingLanding() {
  const [showModal, setShowModal] = useState(false);

  const handleSaveRules = (rules) => {
    console.log(rules,"lll");
    // to do: api 
  };

  return (
    <div className="rules-landing-page-container">
      <RulesSettingHeader />
      <RulesContent />
      <RulesFooter onOpenSettings={() => setShowModal(true)} />

      <RulesSettingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveRules}
      />
    </div>
  );
}

export default RulesSettingLanding;
