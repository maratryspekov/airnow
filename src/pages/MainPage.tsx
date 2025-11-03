import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import AQIScale from "../components/AQIScale";

function MainPage() {
  const [cities, setCities] = useState<{ name: string; aqi: number }[]>([]);

  // Load saved cities on startup
  useEffect(() => {
    const savedCities = localStorage.getItem("airnow-cities");
    if (savedCities) {
      try {
        const parsedCities = JSON.parse(savedCities);
        setCities(parsedCities);
      } catch (error) {
        console.error("Error loading saved cities:", error);
        localStorage.removeItem("airnow-cities");
      }
    }
  }, []);

  // Save cities on every change
  useEffect(() => {
    if (cities.length > 0) {
      localStorage.setItem("airnow-cities", JSON.stringify(cities));
    } else {
      localStorage.removeItem("airnow-cities");
    }
  }, [cities]);

  // Add new city (up to 6)
  const addCity = (newCity: { name: string; aqi: number }) => {
    console.log("Adding new city:", newCity);
    setCities((prev) => {
      // if city already exists - don't add
      if (
        prev.some((c) => c.name.toLowerCase() === newCity.name.toLowerCase())
      ) {
        return prev;
      }
      // maximum 6 cities
      if (prev.length >= 6) return prev;
      return [...prev, newCity];
    });
  };

  // Remove city card
  const removeCity = (name: string) => {
    setCities((prev) => prev.filter((c) => c.name !== name));
  };

  return (
    <div className="min-h-screen text-white py-10">
      <div className="flex flex-col items-center">
        <h1 className="main-title text-center px-2 sm:px-4 leading-tight">
          AirNow — Air Quality Monitor
        </h1>

        <div className="data-quality-notice">
          <p>✅ Live data from OpenWeatherMap</p>
        </div>

        {/* search */}
        <SearchBar onCityAdd={addCity} />
      </div>

      {/*cities grid */}
      {(() => {
        console.log("Current cities array:", cities);
        return null;
      })()}
      {cities.length === 0 ? (
        <motion.div
          className="text-center mt-12 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg mb-2">
            🔍 Search for cities to see air quality data
          </p>
          <p className="text-sm">Add up to 6 cities to compare</p>
        </motion.div>
      ) : (
        <div className="cities-grid">
          <AnimatePresence mode="popLayout">
            {cities.map((city) => (
              <CityCard
                key={city.name}
                city={city.name}
                aqi={city.aqi}
                onRemove={() => removeCity(city.name)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* AQI scale at bottom */}
      {cities.length > 0 && (
        <div className="flex justify-center mt-8">
          <AQIScale />
        </div>
      )}
    </div>
  );
}

export default MainPage;
