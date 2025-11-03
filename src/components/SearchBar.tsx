import React, { useState } from "react";
import { useAirQuality } from "../hooks/useAirQuality";
import GeolocationButton from "./GeolocationButton";

type SearchBarProps = {
  onCityAdd: (cityData: { name: string; aqi: number }) => void;
};

function SearchBar({ onCityAdd }: SearchBarProps) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data, loading, error, fetchAirQuality } = useAirQuality();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    await fetchAirQuality(city.trim());
  };

  // handle successful search results
  React.useEffect(() => {
    if (data && !loading && !error) {
      onCityAdd({ name: data.city, aqi: data.aqi });
      setCity(""); // clear input field
    }
  }, [data, loading, error, onCityAdd]);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "" : "Search city..."}
        className="glass-input"
        autoComplete="off"
      />
      <button type="submit" className="glass-button">
        {loading ? "Loading..." : "Search"}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Geolocation button */}
      <GeolocationButton
        onLocationFound={onCityAdd}
        fetchAirQuality={fetchAirQuality}
      />
    </form>
  );
}

export default SearchBar;
