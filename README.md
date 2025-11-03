# 🌍 AirNow - Air Quality Monitor

Real-time air quality monitoring app with a clean glass morphism UI. Check pollution levels for your city and get EPA-standard AQI data.

## What it does

- 📊 Shows air quality data for any city worldwide
- 🎨 Glass morphism design with smooth animations
- 📱 Works on mobile and desktop
- 💾 Remembers your cities (localStorage)
- 🌍 Real EPA AQI calculations from OpenWeatherMap

## Tech Stack

Built with modern React + TypeScript setup:

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build tool**: Vite (super fast!)
- **API**: OpenWeatherMap Air Pollution API
- **Animations**: Framer Motion
- **Styling**: Custom CSS with glass morphism effects

## Getting Started

### 1. Get API Key (Free!)

Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up. You'll get 1,000 free API calls per day.

### 2. Setup

```bash
# Clone the repo
git clone <your-repo-url>
cd airnow

# Install dependencies
npm install

# Add your API key
echo "VITE_OPENWEATHER_API_KEY=your_actual_key_here" > .env

# Run development server
npm run dev
```

Open http://localhost:5173 and start adding cities!

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CityCard.tsx    # Individual city air quality card
│   ├── SearchBar.tsx   # City search functionality
│   └── AQIScale.tsx    # AQI legend/scale display
├── hooks/
│   └── useAirQuality.ts # Custom hook for API calls
├── pages/
│   └── MainPage.tsx    # Main app layout
├── styles/             # CSS modules
│   ├── glass/          # Glass morphism styles
│   └── animations.css  # Framer Motion configs
└── utils/
    └── getAQIColor.ts  # AQI color calculations
```

## Features I Built

### API Integration

- OpenWeatherMap geocoding for city search
- Air pollution data fetching with error handling
- EPA AQI calculation from raw pollutant concentrations

### UI/UX

- Custom glass morphism cards with CSS backdrop-filter
- Responsive grid layout (3 cols → 2 cols → 1 col)
- Smooth animations with Framer Motion
- Color-coded AQI indicators (Good/Moderate/Unhealthy etc.)

### State Management

- React hooks for local state
- localStorage for persistence
- Error boundaries and loading states

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npm run deploy
```

Built with ❤️ using React + TypeScript
