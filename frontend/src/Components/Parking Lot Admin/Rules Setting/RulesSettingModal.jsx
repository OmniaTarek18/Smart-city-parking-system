import React, { useState } from "react";
import "./rulessettingmodal.css";
import { Clock, TriangleAlert, Banknote, Hourglass } from "lucide-react";

const RulesSettingModal = ({ show, onClose, onSave }) => {
  const [time_limit, setTimeLimit] = useState(2);
  const [overstayCost, setOverstayCost] = useState(20);
  const [overstayTime, setOverstayTime] = useState(15);
  const [cancelationCost, setCancelationCost] = useState(10);
  const [cancelationTime, setCancelationTime] = useState(10);
  const [noshowCost, setNoshowCost] = useState(30);
  const [noshowTime, setNoshowTime] = useState(20);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      time_limit,
      penalties: {
        overstay: { cost: overstayCost, time: overstayTime },
        cancelation: { cost: cancelationCost, time: cancelationTime },
        noshowup: { cost: noshowCost, time: noshowTime },
      },
    });
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
              {/* overstay */}
              <div className="penalty-row">
                <label>
                  <TriangleAlert className="rules-icons" />
                  Overstay Penalty
                </label>
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">L.E.</span>
                  <input
                    type="number"
                    value={overstayCost}
                    onChange={(e) => setOverstayCost(Number(e.target.value))}
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="time-input-wrapper">
                  <input
                    type="number"
                    value={overstayTime}
                    onChange={(e) => setOverstayTime(Number(e.target.value))}
                    min="5"
                    max="60"
                  />
                  <span className="time-unit">min</span>
                </div>
              </div>

              {/* cancelation penalty */}
              <div className="penalty-row">
                <label>
                  <TriangleAlert className="rules-icons" />
                  Cancelation Penalty
                </label>
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">L.E.</span>
                  <input
                    type="number"
                    value={cancelationCost}
                    onChange={(e) => setCancelationCost(Number(e.target.value))}
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="time-input-wrapper">
                  <input
                    type="number"
                    value={cancelationTime}
                    onChange={(e) => setCancelationTime(Number(e.target.value))}
                    min="5"
                    max="60"
                  />
                  <span className="time-unit">min</span>
                </div>
              </div>

              {/* no show up penalty */}
              <div className="penalty-row">
                <label>
                  <TriangleAlert className="rules-icons" />
                  No-Show Penalty
                </label>
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">L.E.</span>
                  <input
                    type="number"
                    value={noshowCost}
                    onChange={(e) => setNoshowCost(Number(e.target.value))}
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="time-input-wrapper">
                  <input
                    type="number"
                    value={noshowTime}
                    onChange={(e) => setNoshowTime(Number(e.target.value))}
                    min="5"
                    max="60"
                  />
                  <span className="time-unit">min</span>
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
