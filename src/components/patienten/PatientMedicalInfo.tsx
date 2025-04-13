
import React from "react";

interface PatientMedicalInfoProps {
  conditions: string[];
  medications: string[];
  lastVisit: string;
}

const PatientMedicalInfo = ({ conditions, medications, lastVisit }: PatientMedicalInfoProps) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-2 text-medical">Medische informatie</h4>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Aandoeningen:</span>{" "}
          {conditions.join(", ")}
        </p>
        <p>
          <span className="font-medium">Medicatie:</span>
        </p>
        <ul className="list-disc pl-5">
          {medications.map((med, idx) => (
            <li key={idx}>{med}</li>
          ))}
        </ul>
        <p>
          <span className="font-medium">Laatste bezoek:</span> {lastVisit}
        </p>
      </div>
    </div>
  );
};

export default PatientMedicalInfo;
