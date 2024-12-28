import { useState } from "react";
import RulesSettingModal from "../../../Components/Parking Lot Admin/Rules Setting/RulesSettingModal";
import RulesSettingHeader from "../../../Components/Parking Lot Admin/Rules Setting/RulesSettingHeader"
import RulesContent from "../../../Components/Parking Lot Admin/Rules Setting/RulesContent";
import RulesFooter from "../../../Components/Parking Lot Admin/Rules Setting/RulesFooter";
import "./rulessettinglanding.css";
import { saveReservationRule, addPenaltyRule } from "../../../api/rulesAPI"

function RulesSettingLanding() {
  const [showModal, setShowModal] = useState(false);
  const ownerId = 1; // temp till merge

const handleSaveRules = async (rules) => {
  console.log(rules, "saving rules");

  try {
    const formattedTimeLimit = `${String(rules.time_limit).padStart(
      2,
      "0"
    )}:00:00`;

    const reservationRule = {
      LotManager_id: ownerId,
      time_limit: formattedTimeLimit, 
    };
    await saveReservationRule(reservationRule);

    for (const [penaltyType, penaltyDetails] of Object.entries(
      rules.penalties
    )) {
      const hours = Math.floor(penaltyDetails.time / 60);
      const minutes = penaltyDetails.time % 60;
      const formattedPenaltyTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00`;

      const penaltyRule = {
        penality_type: penaltyType.toUpperCase(), 
        LotManager_id: 1,
        cost: penaltyDetails.cost,
        time: formattedPenaltyTime, 
      };
      console.log(penaltyRule)
      await addPenaltyRule(penaltyRule);
    }

    console.log("all rules saved");
  } catch (error) {
    console.error(error);
  }
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
