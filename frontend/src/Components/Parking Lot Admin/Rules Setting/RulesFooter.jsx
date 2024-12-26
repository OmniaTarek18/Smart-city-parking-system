import React from 'react';
import { Settings } from "lucide-react";

const RulesFooter = ({ onOpenSettings }) => (
  <div className="rules-footer">
    <p>Need to adjust these rules?</p>
    <button className="settings-button" onClick={onOpenSettings}>
      <Settings className="settings-icon" />
      Open Rules Settings
    </button>
  </div>
);

export default RulesFooter;