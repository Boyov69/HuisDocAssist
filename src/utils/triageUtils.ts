
interface TriageResult {
  urgency: "laag" | "medium" | "hoog" | "spoed";
  advice: string;
  aiSuggestions: string[];
}

export const analyzeSymptoms = (symptoms: string, category: string): TriageResult => {
  // Fake triage analysis based on symptoms
  let urgency: "laag" | "medium" | "hoog" | "spoed" = "laag";
  let advice = "";
  let aiSuggestions = [];
  
  const symptomText = symptoms.toLowerCase();
  
  if (symptomText.includes("pijn op de borst") || 
      symptomText.includes("kortademig") || 
      symptomText.includes("bewusteloos")) {
    urgency = "spoed";
    advice = "Directe medische hulp nodig. Bel 112 of stuur patiënt naar spoedeisende hulp.";
    aiSuggestions = [
      "Vraag naar uitstraling van pijn naar arm, kaak of rug",
      "Controleer ademhaling en bewustzijn",
      "Vraag naar transpireren, misselijkheid, duizeligheid"
    ];
  } else if (symptomText.includes("koorts") && 
             (symptomText.includes("uitslag") || symptomText.includes("stijve nek"))) {
    urgency = "hoog";
    advice = "Dezelfde dag consult inplannen bij huisarts.";
    aiSuggestions = [
      "Controleer op meningitis symptomen: lichtgevoeligheid, hoofdpijn, nekstijfheid",
      "Vraag naar exacte temperatuur (wanneer gemeten)",
      "Vraag naar recente reizen of contact met zieken"
    ];
  } else if (symptomText.includes("hoofdpijn") && symptomText.includes("dagen")) {
    urgency = "medium";
    advice = "Consult inplannen binnen 2 werkdagen.";
    aiSuggestions = [
      "Vraag naar begin, duur en intensiteit van de hoofdpijn",
      "Vraag naar misselijkheid, braken, lichtgevoeligheid",
      "Controleer medicatiegebruik en mogelijk overgebruik pijnstillers"
    ];
  } else {
    urgency = "laag";
    advice = "Patiënt kan ingepland worden voor regulier consult.";
    aiSuggestions = [
      "Geef zelfzorgadviezen mee",
      "Adviseer terug te bellen bij verergering klachten",
      "Plan consult in binnen 1-2 weken indien gewenst"
    ];
  }
  
  return { urgency, advice, aiSuggestions };
};
