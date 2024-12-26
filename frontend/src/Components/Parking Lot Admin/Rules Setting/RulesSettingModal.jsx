import React, { useState } from 'react';
import './rulessettingmodal.css';
import { Clock,TriangleAlert,Banknote,Hourglass } from "lucide-react";
const RulesSettingModal = ({ show, onClose, onSave }) => {
  const [time_limit, setTimeLimit] = useState(2);
  const [cost, setPenaltyCost] = useState(20);
  const [time, setPenaltyTime] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ time_limit, cost, time });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="rules-modal-overlay">
      <div className="rules-modal-container">
        <div className="rules-modal-header">
          <h2 className="rules-modal-title">Reservation Rules Settings</h2>
          <button className="rules-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="rules-modal-form">
          <div className="rules-section time-limit-section">
            <h3>
              <Clock className="rules-icons" />
              Time Limit Settings
            </h3>
            <div className="rules-input-group">
              <label htmlFor="timeLimit">Maximum Reservation Duration</label>
              <div className="time-input-wrapper">
                <input
                  type="number"
                  id="timeLimit"
                  value={time_limit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  min="1"
                  max="24"
                />
                <span className="time-unit">hours</span>
              </div>
            </div>
          </div>

          <div className="rules-section penalty-section">
            <h3>
              <TriangleAlert className="rules-icons" />
              Penalty Rules
            </h3>
            <div className="penalty-grid">
              <div className="rules-input-group">
                <label htmlFor="penaltyCost">
                  <Banknote className="rules-icons" />
                  Penalty Cost
                </label>
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">L.E.</span>
                  <input
                    type="number"
                    id="penaltyCost"
                    value={cost}
                    onChange={(e) => setPenaltyCost(Number(e.target.value))}
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="rules-input-group">
                <label htmlFor="penaltyTime">
                  <Hourglass className="rules-icons" />
                  Grace Period
                </label>
                <div className="time-input-wrapper">
                  <input
                    type="number"
                    id="penaltyTime"
                    value={time}
                    onChange={(e) => setPenaltyTime(Number(e.target.value))}
                    min="5"
                    max="60"
                  />
                  <span className="time-unit">minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rules-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RulesSettingModal;