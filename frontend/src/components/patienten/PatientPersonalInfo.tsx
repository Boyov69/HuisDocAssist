
import React from "react";

interface PatientPersonalInfoProps {
  dob: string;
  bsn: string;
  address: string;
  phone: string;
  email: string;
}

const PatientPersonalInfo = ({ dob, bsn, address, phone, email }: PatientPersonalInfoProps) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-2 text-medical">Persoonlijke informatie</h4>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Geboortedatum:</span> {dob}
        </p>
        <p>
          <span className="font-medium">BSN:</span> {bsn}
        </p>
        <p>
          <span className="font-medium">Adres:</span> {address}
        </p>
        <p>
          <span className="font-medium">Telefoon:</span> {phone}
        </p>
        <p>
          <span className="font-medium">E-mail:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default PatientPersonalInfo;
