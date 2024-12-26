import React from 'react';
import RulesCard from './RulesCard';
import { Clock, WalletMinimal, Hourglass } from "lucide-react";
const RulesContent = ()=>{
  const rulesData = [
    {
      icon: Clock,
      title: "Time Limit",
      description: "The time limit refers to the maximum duration for which a user can reserve a parking spot. For example, users might be allowed to reserve a spot for a maximum of 2 hours. After the reserved time expires, the system should automatically release the spot for others.",
    },
    {
      icon: WalletMinimal,
      title: "Penalty Cost",
      description:
        "Penalty costs are incurred in cases of rule violations, such as overstaying beyond the reserved time, canceling a reservation after the allowed cancellation grace period passed, or not showing up on the specified time. These costs are implemented to ensure efficient use of parking resources.",
    },
    {
      icon: Hourglass,
      title: "Penalties Grace Period",
      description:
        "The grace period is a buffer time provided to users before penalties are applied. This allows users to extend their reservation, cancel without charges, or vacate the parking space without incurring a penalty. It ensures flexibility while encouraging timely compliance with reservation rules.",
    },
  ];

  return (
    <div className="rules-content">
      <div className="rules-grid">
        {rulesData.map((rule, index) => (
          <RulesCard key={index} {...rule} />
        ))}
      </div>
    </div>
  );
};

export default RulesContent;