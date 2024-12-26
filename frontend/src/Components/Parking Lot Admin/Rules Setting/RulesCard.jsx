import React from 'react';

const RulesCard = ({ icon: Icon, title, description }) => (
  <div className="rules-card">
    <div className="rules-card-icon">
      <Icon size={36} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default RulesCard;