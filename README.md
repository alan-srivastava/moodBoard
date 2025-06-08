MoodBoard - Daily Mood Tracker 🌐 Live Demo[https://alan-srivastava.github.io/moodBoard/]

A dynamic mood tracking app built with React (Vite) + Material UI.

UI Screenshot ![image](https://github.com/user-attachments/assets/354db2ba-0f88-4f4d-b8c1-7273643374db)


📋 Project Requirements Checklist

✅ Complete working project (React + Vite + Material UI)

✅ README.md with setup, features, and custom logic

✅ No backend (Pure frontend, uses localStorage)

✅ Meaningful commit messages (See section below)

🚀 Setup Instructions
1. Run Locally
git clone https://github.com/your-username/moodBoard.git # ADD your username in this link if you want to clone it on your device.

cd moodBoard   # Folder Name

npm install  # Installs Vite + React + Material UI

npm run dev  # Starts Vite dev server

2. Deploy to GitHub Pages  

npm run build  # Creates optimized /dist folder

npm run deploy # Pushes to branch `alan-srivastava_frontend` #MAIN BRANCH NAME

✨ Key Features

Feature	                Implementation

Mood Selection - Material UI Dialog + React state

Weekly Calendar - Custom SVG + date-fns

Data Persistence - Browser localStorage

Dynamic Theming	- CSS variables + Material UI palette

📜 Custom Logic

JavaScript:

// 1. Mood scoring (Happy=3, Neutral=2, Sad=1)

const calculateTrend = (moods) => 
  moods.reduce((sum, { mood }) => sum + { happy:3, neutral:2, sad:1 }[mood], 0);

// 2. UI Theme Switcher

function applyTheme(dominantMood) {
  document.body.style.setProperty('--primary-color', themes[dominantMood].color);
}

✅ Compliance Checklist

Framework: Only React + Vite

UI Library: Only Material UI

No External State: Pure React hooks

📂 Repository Structure (These files form the core foundation of your Vite+React project structure.)

moodboard/

├── src/

│   ├── components/    # React components (Calendar, MoodSelector, Quote, Summary)

│   ├── hooks/         # Custom hooks (useMoodTracker)

│   ├── styles/        # Themes and global CSS

├── App.jsx            # The root React component that assembles all parts of app

├── index.css          # Global CSS styles for the entire application

├── main.jsx           # The JavaScript entry point that mounts React to the DOM

├── public/            # Static assets (screenshot.png)

├── vite.config.js     # Vite configuration

└── README.md          # This file

*Clear commit messages for your project:

1. First Setup

-"Create new React app with Vite"

-"Add Material UI library"

2. Building Components

-"Add calendar to pick moods"

-"Make mood buttons (happy/neutral/sad)"

-"Show weekly mood summary"

3. Features

-"Changes of background color based on mood"

-"Add daily inspirational quotes"

4. Fixes

-"Fix calendar date bug"

-"Make the app work on mobile phones"

-"Stop future dates from being selected."

5. Final Touches

-"Add app screenshot to README"

-"Write setup instructions"

-"Deploy to GitHub Pages"


