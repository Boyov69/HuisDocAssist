
export interface TranscriptionResult {
  text: string;
  confidence: number;
  speaker?: 'beller' | 'assistent';
}

export interface VoiceSettings {
  voiceId: string;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
}

// Deze API sleutel zou in de toekomst uit Supabase secrets moeten komen
const STORAGE_KEY = 'elevenLabsApiKey';
let apiKey = '';

// Haal een eventueel ingestelde API key uit Vite env variabelen
if (!apiKey && typeof import.meta !== 'undefined') {
  const envKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (envKey) {
    apiKey = envKey as string;
  }
}

// Initialiseert de apiKey vanuit localStorage indien beschikbaar
if (typeof window !== 'undefined') {
  const storedKey = localStorage.getItem(STORAGE_KEY);
  if (storedKey) {
    apiKey = storedKey;
  }
}

export const setApiKey = (key: string) => {
  apiKey = key;
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Kon API sleutel niet opslaan in localStorage', e);
  }
};

export const getApiKey = () => {
  if (!apiKey && typeof window !== 'undefined') {
    const storedKey = localStorage.getItem(STORAGE_KEY);
    if (storedKey) apiKey = storedKey;
  }
  return apiKey;
};

export const DEFAULT_VOICE_ID = "9BWtsMINqrJLrRacOk9x"; // Aria stem

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  voiceId: DEFAULT_VOICE_ID,
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.5,
  useSpeakerBoost: true,
};

/**
 * Transcribeert audio naar tekst met ElevenLabs API
 */
export const transcribeAudio = async (
  audioBlob: Blob
): Promise<TranscriptionResult | null> => {
  if (!apiKey) {
    console.error("ElevenLabs API sleutel ontbreekt");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");
    formData.append("model_id", "whisper-large-v3"); // Gebruik het beste beschikbare model

    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.text,
      confidence: data.confidence || 0.8,
    };
  } catch (error) {
    console.error("Error tijdens audio transcriptie:", error);
    return null;
  }
};

/**
 * Synthetiseert tekst naar spraak met ElevenLabs API
 */
export const synthesizeSpeech = async (
  text: string,
  settings: VoiceSettings = DEFAULT_VOICE_SETTINGS
): Promise<Blob | null> => {
  if (!apiKey) {
    console.error("ElevenLabs API sleutel ontbreekt");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: settings.stability,
            similarity_boost: settings.similarityBoost,
            style: settings.style,
            use_speaker_boost: settings.useSpeakerBoost,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error tijdens spraaksynthese:", error);
    return null;
  }
};
