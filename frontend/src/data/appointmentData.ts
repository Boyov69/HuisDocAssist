
export interface Appointment {
  id: number;
  patient: string;
  time: string;
  date: string;
  type: string;
  notes: string;
  status: "confirmed" | "pending" | "cancelled";
}

// Dummy afspraken data
export const appointments: Appointment[] = [
  {
    id: 1,
    patient: "Dhr. van Veen",
    time: "09:00",
    date: "13 April 2025",
    type: "Controle",
    notes: "Diabetes type 2 controle. Laatste HbA1c was 53 mmol/mol.",
    status: "confirmed"
  },
  {
    id: 2,
    patient: "Mevr. Jansen",
    time: "09:15",
    date: "13 April 2025",
    type: "Consult",
    notes: "Hoofdpijn, duizeligheid. Klachten sinds 2 weken.",
    status: "confirmed"
  },
  {
    id: 3,
    patient: "Kim de Vries",
    time: "09:30",
    date: "13 April 2025",
    type: "Consult",
    notes: "Huiduitslag op armen en benen. Mogelijk allergische reactie.",
    status: "confirmed"
  },
  {
    id: 4,
    patient: "Dhr. Bakker",
    time: "09:45",
    date: "13 April 2025",
    type: "Controle",
    notes: "Bloeddruk controle. Gebruikt metoprolol 50mg 1dd1.",
    status: "confirmed"
  },
  {
    id: 5,
    patient: "Mevr. Visser",
    time: "10:00",
    date: "13 April 2025",
    type: "Consult",
    notes: "Rugpijn, uitstralend naar linkerbeen.",
    status: "pending"
  }
];

// Helper functies voor het beheren van afspraken
export const updateAppointmentStatus = (id: number, status: "confirmed" | "pending" | "cancelled") => {
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    return true;
  }
  return false;
};

export const rescheduleAppointment = (id: number, newTime: string, newDate: string) => {
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    appointments[index].time = newTime;
    appointments[index].date = newDate;
    return true;
  }
  return false;
};

export const weekData = [
  {
    date: "2025-04-13",
    formattedDate: "Maandag, 13 April 2025",
    appointments: [
      { time: "09:00", patient: "Dhr. van Veen", type: "Controle" },
      { time: "09:15", patient: "Mevr. Jansen", type: "Consult" },
      { time: "09:30", patient: "Kim de Vries", type: "Consult" },
      { time: "09:45", patient: "Dhr. Bakker", type: "Controle" },
      { time: "10:00", patient: "Mevr. Visser", type: "Consult" }
    ]
  },
  {
    date: "2025-04-14",
    formattedDate: "Dinsdag, 14 April 2025",
    appointments: []
  },
  {
    date: "2025-04-15",
    formattedDate: "Woensdag, 15 April 2025",
    appointments: [
      { time: "10:15", patient: "Familie Aalbers", type: "Consult" },
      { time: "10:30", patient: "Dhr. de Jong", type: "Controle" },
      { time: "10:45", patient: "Mevr. Kuipers", type: "Consult" }
    ]
  },
  {
    date: "2025-04-16",
    formattedDate: "Donderdag, 16 April 2025",
    appointments: [
      { time: "09:00", patient: "Mevr. van Dam", type: "Consult" },
      { time: "09:15", patient: "Dhr. Smit", type: "Controle" }
    ]
  },
  {
    date: "2025-04-17",
    formattedDate: "Vrijdag, 17 April 2025",
    appointments: [
      { time: "11:00", patient: "Sanne Vermeer", type: "Consult" },
      { time: "11:15", patient: "Dhr. Bos", type: "Controle" },
      { time: "11:30", patient: "Familie Koning", type: "Consult" }
    ]
  }
];
