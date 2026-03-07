# Core Power Knowledge Explorer

An interactive visualization and learning platform for exploring Sitecore product competencies. Users can explore competency areas through an animated bubble chart, access learning resources, take quizzes, and chat with an AI assistant.

## Features

- **Bubble Chart** — D3-powered interactive visualization of competencies, sized by weight and color-coded by product (ex: Sitecore AI / ContentHub). Supports hover, zoom, and click-to-select.
- **Topic Summary** — Side panel showing selected competency details, official documentation links, and community resources.
- **Quiz** — Multi-question knowledge checks with immediate feedback and explanations, fetched per competency.
- **AI Chatbot** — Streaming chat interface with markdown rendering, powered by a backend agent service.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Dev server and build toolchain
- **D3** — Data visualization
- **React Markdown** — Chat response rendering

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server (hot reload) |
| `npm run build`   | TypeScript compile + Vite build    |
| `npm run lint`    | Run ESLint                         |
| `npm run preview` | Preview production build locally   |

## Project Structure

```
src/
├── App.tsx              # Main layout — header, bubble chart, panels, nav
├── main.tsx             # React entry point
├── components/
│   ├── BubbleChart.tsx  # D3 bubble visualization
│   ├── Chatbot.tsx      # AI chat panel with streaming
│   ├── Quiz.tsx         # Quiz data fetching and state
│   ├── QuizQuestions.tsx # Quiz UI with navigation and feedback
│   └── TopicSummary.tsx # Competency detail side panel
└── assets/
```
