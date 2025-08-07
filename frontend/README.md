# AI-Frontdesk Huisartsassistent

Deze applicatie simuleert een digitale frontdesk voor een huisartsenpraktijk. De interface is vooral gericht op assistenten en artsen en maakt gebruik van AI om inkomende telefoongesprekken automatisch te transcriberen en om patiënten- en praktijkgegevens te beheren.

## Project info

**URL**: https://lovable.dev/projects/92fe03a6-1bd0-4890-bef4-8f03fde3defe

## Belangrijkste functionaliteiten

- **Telefooncentrale met live transcriptie** – ondersteunt inkomende gesprekken en gebruikt de ElevenLabs API om spraak direct om te zetten naar tekst en andersom.
- **Patiëntbeheer en afspraken** – registreer nieuwe patiënten, plan afspraken en bekijk dossiers.
- **Admin dashboards** – verschillende dashboards voor assistenten, artsen en beheerders met statistieken en gebruikersbeheer.

## Setup

Zorg dat Node.js en npm zijn geïnstalleerd. Je kunt bijvoorbeeld [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) gebruiken om Node te installeren.

```sh
# Clone de repository
git clone <YOUR_GIT_URL>

# Ga naar de projectmap
cd <YOUR_PROJECT_NAME>

# Installeer dependencies
npm install

# Start een ontwikkelserver met hot reload
npm run dev
```

Tijdens het ontwikkelen kun je ook via [Lovable](https://lovable.dev/projects/92fe03a6-1bd0-4890-bef4-8f03fde3defe) code genereren of GitHub gebruiken om bestanden te bewerken.

## Backend server

In de map `server` staat een eenvoudige Node-server voor het opslaan van patiënten en afspraken. Start de server met:

```sh
node server/server.js
```

De server draait standaard op poort `3001` en ondersteunt de volgende endpoints:

- `GET /api/patients` – lijst alle geregistreerde patiënten.
- `POST /api/patients` – voeg een patiënt toe met JSON in de vorm `{ "name": "..." }`.
- `GET /api/appointments` – lijst alle afspraken.
- `POST /api/appointments` – maak een nieuwe afspraak aan met JSON zoals `{ "patientId": 1, "date": "..." }`.

Gegevens worden alleen in het geheugen opgeslagen en gaan verloren wanneer je de server stopt.

### ElevenLabs API sleutel

Voor de telefoonfunctionaliteit is een API sleutel van [ElevenLabs](https://elevenlabs.io) vereist. Maak in je ElevenLabs-account een nieuwe sleutel aan en houd deze bij de hand.

1. Start de applicatie lokaal en navigeer naar het menu **Telefoon**.
2. De eerste keer dat je deze pagina bezoekt verschijnt automatisch een dialoog om de sleutel in te voeren. Je kunt de dialoog later opnieuw openen via de knop **API Sleutel**.
3. De sleutel wordt in de huidige browsersessie opgeslagen en gebruikt in [`src/services/elevenLabsService.ts`](src/services/elevenLabsService.ts) voor het transcriberen van spraak en het genereren van audio.

Zonder geldige sleutel werkt de live transcriptie en spraaksynthese niet.

### .env bestand

Voor lokaal gebruik kun je een `.env` bestand aanmaken op basis van `.env.example`.
Hierin zet je je `ELEVENLABS_API_KEY` en eventueel een andere `PORT` voor de
backend server. Start de server vervolgens met:

```sh
npm run backend
```

### Tests draaien

Er staat een klein voorbeeldtestje in de map `tests`. Voer alle tests uit met:

```sh
npm test
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/92fe03a6-1bd0-4890-bef4-8f03fde3defe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/92fe03a6-1bd0-4890-bef4-8f03fde3defe) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
