# 🌍 AirNow - Air Quality Monitor

Real-time air quality monitoring app with a clean glass morphism UI. Check pollution levels for your city and get EPA-standard AQI data.

## 🚀 [Live Demo](https://airnow-lime.vercel.app)

**Try it now**: [airnow-lime.vercel.app](https://airnow-lime.vercel.app)

## ✨ Features

- � **Smart City Search** - Find any city worldwide with autocomplete
- 📊 **EPA AQI Standards** - Accurate air quality calculations (PM2.5, PM10, O₃)
- 🎨 **Glass Morphism UI** - Modern design with backdrop blur effects
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- 💾 **Smart Memory** - Automatically saves your favorite cities
- 🌈 **Color-coded AQI** - Visual indicators from Good (Green) to Hazardous (Purple)
- ⚡ **Real-time Data** - Live updates from OpenWeatherMap API
- 🔄 **Smooth Animations** - Framer Motion powered transitions

## 🛠️ Tech Stack

Built with modern React + TypeScript setup:

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build tool**: Vite (super fast!)
- **API**: OpenWeatherMap Air Pollution API
- **Animations**: Framer Motion
- **Styling**: Custom CSS with glass morphism effects

## 🎯 AQI Scale Reference

| AQI Range | Level                             | Color  | Health Impact                                 |
| --------- | --------------------------------- | ------ | --------------------------------------------- |
| 0-50      | 🟢 Good                           | Green  | Air quality is satisfactory                   |
| 51-100    | 🟡 Moderate                       | Yellow | Acceptable for most people                    |
| 101-150   | 🟠 Unhealthy for Sensitive Groups | Orange | Sensitive individuals may experience problems |
| 151-200   | 🔴 Unhealthy                      | Red    | Everyone may experience problems              |
| 201-300   | 🟣 Very Unhealthy                 | Purple | Health alert for everyone                     |
| 301+      | 🟤 Hazardous                      | Maroon | Emergency conditions                          |

## 🚀 Getting Started

### 1. Get API Key (Free!)

Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up. You'll get 1,000 free API calls per day.

### 2. Setup

```bash
# Clone the repo
git clone https://github.com/maratryspekov/airnow.git
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

- React hooks for local state management
- localStorage for city persistence
- Error boundaries and loading states
- Custom hooks for API integration

## 🔧 Technical Highlights

- **TypeScript**: Full type safety across the codebase
- **EPA AQI Calculations**: Custom formulas for PM2.5, PM10, and O₃ pollutants
- **Error Handling**: Graceful fallbacks and user feedback
- **Performance**: Optimized API calls and state updates
- **Accessibility**: Semantic HTML and ARIA labels
- **Responsive**: CSS Grid and Flexbox for all screen sizes

## 📦 Deployment

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

**Live on Vercel**: [airnow-lime.vercel.app](https://airnow-lime.vercel.app)

## 💭 What I Learned

Building this project helped me understand:

- Working with real APIs and handling rate limits
- EPA air quality calculation standards
- Advanced CSS techniques (glass morphism, backdrop-filter)
- TypeScript in a React ecosystem
- Modern deployment workflows

---

Built with ❤️ using React + TypeScript | [Portfolio](https://github.com/maratryspekov)
