import React from 'react';
import { ShieldCheck } from "lucide-react";

const RulesHero = () => (
  <div className="rules-landing-page-header">
    <div className="rules-landing-page-header-icon">
      <ShieldCheck size={60}/>
    </div>
    <h1>Parking Reservation Rules</h1>
    <p>
      Please familiarize yourself with our parking reservation guidelines to
      ensure a smooth experience.
    </p>
  </div>
);

export default RulesHero;