
import { Patient } from "@/components/patienten/PatientCard";
import { patients as initialPatients } from "@/data/patientData";

// In-memory storage voor patiënten (in een echte app zou dit via API calls gaan)
let patients = [...initialPatients];

// Ophalen van alle patiënten
export const getAllPatients = () => {
  return [...patients];
};

// Toevoegen van een nieuwe patiënt
export const addPatient = (patientData: Omit<Patient, "id" | "lastVisit" | "conditions" | "medications">) => {
  const newPatient: Patient = {
    id: patients.length + 1,
    ...patientData,
    lastVisit: "Nog geen bezoek",
    conditions: [],
    medications: []
  };
  
  patients = [...patients, newPatient];
  return newPatient;
};

// Zoeken naar patiënten
export const searchPatients = (query: string) => {
  if (!query) return patients;
  
  const lowerQuery = query.toLowerCase();
  return patients.filter(patient => 
    patient.name.toLowerCase().includes(lowerQuery) || 
    patient.bsn.includes(query) || 
    patient.phone.includes(query) || 
    patient.email.toLowerCase().includes(lowerQuery)
  );
};

// Vind patiënt op ID
export const getPatientById = (id: number) => {
  return patients.find(patient => patient.id === id);
};
