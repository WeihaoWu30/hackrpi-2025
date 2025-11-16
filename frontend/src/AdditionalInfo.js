// AdditionalInfo.js
import React from "react";
import InfoCard from "./Components/InfoCard.js";

function AdditionalInfo({ patient }) {
  return (
    <main className="container">
      <InfoCard icon="id-card" title="Insurance Information">
        <ul>
          <li>Provider: {patient.insurance.provider}</li>
          <li>Policy #: {patient.insurance.policyNumber}</li>
          <li>Coverage: {patient.insurance.coverage}</li>
        </ul>
      </InfoCard>

      <InfoCard icon="user-shield" title="Emergency Contact">
        <ul>
          <li>Name: {patient.relationship.name}</li>
          <li>Relationship: {patient.relationship.relationship}</li>
          <li>Phone: {patient.relationship.phone}</li>
        </ul>
      </InfoCard>

      <InfoCard icon="file-invoice-dollar" title="Billing Information">
        <ul>
          <li>Outstanding Balance: {patient.billing.balance}</li>
          <li>Last Payment: {patient.billing.lastPayment}</li>
        </ul>
      </InfoCard>
    </main>
  );
}

export default AdditionalInfo;