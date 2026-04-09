# Better EHR — HackRPI 2025

An Electronic Health Record system built at [HackRPI 2025](https://hackrpi.com/) that uses AI to streamline clinical documentation and improve physician workflows.

## The Problem

Doctors spend nearly twice as much time on paperwork as they do with patients. Manual note-taking during visits is slow, error-prone, and pulls attention away from the person in the room.

## What It Does

- **Real-time transcription** — Records doctor-patient conversations using AssemblyAI's speech-to-text API, generating live transcripts as the visit happens
- **AI visit summaries** — Gemini AI processes each transcript to produce structured visit summaries with key findings, diagnoses, and recommended next steps
- **Multi-provider access** — WebSocket-based data sync lets multiple physicians view and update the same patient record simultaneously with sub-second latency
- **Data persistence** — Patient records, transcripts, and summaries are stored in Firebase with real-time database sync

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, HTML, CSS |
| Backend | Node.js, Firebase |
| Real-time | WebSockets |
| AI/ML | AssemblyAI (speech-to-text), Gemini AI (summarization) |
| Database | Firebase Realtime Database |

## Project Structure

```
├── frontend/          # React application
├── backend/           # Server, API routes, WebSocket handlers
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Realtime Database enabled
- AssemblyAI API key ([get one here](https://www.assemblyai.com/))
- Google Gemini API key ([get one here](https://ai.google.dev/))

### Setup

```bash
# Clone the repo
git clone https://github.com/WeihaoWu30/hackrpi-2025.git
cd hackrpi-2025

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```
ASSEMBLYAI_API_KEY=your_assemblyai_key
GEMINI_API_KEY=your_gemini_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_API_KEY=your_firebase_api_key
```

### Run

```bash
# Start backend
cd backend
npm start

# In a new terminal, start frontend
cd frontend
npm start
```

## Team

Built in 24 hours at HackRPI 2025 by:
- [Eric Lin](https://github.com/EricL0512)
- [Weihao Wu](https://github.com/WeihaoWu30)
- [Zachary Lin](https://github.com/smallgiant1010)
- [Matthew Lin](https://github.com/Neapolicy)

## License

MIT
