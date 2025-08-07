
import { Patient } from "@/components/patienten/PatientCard";

// Dummy patiënt data
export const patients: Patient[] = [
  {
    id: 1,
    name: "Jan van Veen",
    dob: "12-05-1965",
    bsn: "123456782",
    address: "Medischstraat 10, 1234 AB Amsterdam",
    phone: "06-12345678",
    email: "jan.veen@email.com",
    lastVisit: "22-03-2025",
    conditions: ["Diabetes type 2", "Hypertensie"],
    medications: ["Metformine 500mg 2dd1", "Lisinopril 10mg 1dd1"]
  },
  {
    id: 2,
    name: "Maria Jansen",
    dob: "28-11-1978",
    bsn: "123456783",
    address: "Zorgweg 5, 1234 CD Amsterdam",
    phone: "06-23456789",
    email: "m.jansen@email.com",
    lastVisit: "01-04-2025",
    conditions: ["Migraine", "Allergische rhinitis"],
    medications: ["Sumatriptan 50mg zo nodig", "Desloratadine 5mg 1dd1"]
  },
  {
    id: 3,
    name: "Kim de Vries",
    dob: "03-07-1992",
    bsn: "123456784",
    address: "Gezondlaan 15, 1234 EF Amsterdam",
    phone: "06-34567890",
    email: "kim.devries@email.com",
    lastVisit: "05-04-2025",
    conditions: ["Eczeem"],
    medications: ["Hydrocortison crème 1% zo nodig"]
  },
  {
    id: 4,
    name: "Pieter Bakker",
    dob: "15-09-1955",
    bsn: "123456785",
    address: "Artsenplein 8, 1234 GH Amsterdam",
    phone: "06-45678901",
    email: "p.bakker@email.com",
    lastVisit: "10-04-2025",
    conditions: ["COPD", "Hypercholesterolemie"],
    medications: ["Salbutamol 100mcg 4dd1 zo nodig", "Simvastatine 40mg 1dd1"]
  },
  {
    id: 5,
    name: "Lisa Visser",
    dob: "22-02-1988",
    bsn: "123456786",
    address: "Doktershof 3, 1234 IJ Amsterdam",
    phone: "06-56789012",
    email: "l.visser@email.com",
    lastVisit: "02-04-2025",
    conditions: ["Depressie", "Slaapstoornissen"],
    medications: ["Sertraline 50mg 1dd1", "Temazepam 10mg 1dd1 zo nodig"]
  }
];
