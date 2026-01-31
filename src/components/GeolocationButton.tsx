import { useState } from "react";
import { motion } from "framer-motion";
import type { AirQualityData } from "../types/airQuality";

interface GeolocationButtonProps {
  onLocationFound: (cityData: { name: string; aqi: number }) => void;
  fetchAirQuality: (city: string) => Promise<AirQualityData | null>;
}

export default function GeolocationButton({
  onLocationFound,
  fetchAirQuality,
}: GeolocationButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // get city name from coordinates
          const locationResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );

          if (!locationResponse.ok) {
            throw new Error("Failed to get location name");
          }

          const locationData = await locationResponse.json();
          const cityName =
            locationData.city ||
            locationData.locality ||
            locationData.principalSubdivision ||
            "Unknown Location";

          // fetch air quality data for the found city
          const airQualityData = await fetchAirQuality(cityName);

          if (airQualityData) {
            onLocationFound({ name: cityName, aqi: airQualityData.aqi });
          }
        } catch (err) {
          console.error("Error getting location:", err);
          setError("Failed to get location data");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        let errorMessage = "Location access denied";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage =
              "Please enable location permissions in browser settings";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
            break;
        }

        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <motion.button
        onClick={getCurrentLocation}
        disabled={loading}
        className="geolocation-button"
        whileHover={loading ? {} : { scale: 1.02, y: -2 }}
        whileTap={loading ? {} : { scale: 0.98 }}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={loading ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={
            loading ? { duration: 1.5, repeat: Infinity } : { duration: 0 }
          }
        >
          <motion.span
            className="text-lg"
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={
              loading
                ? { duration: 2, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          >
            {loading ? "🌍" : "📍"}
          </motion.span>
          <span className="font-medium">
            {loading ? "Finding you..." : "Use My Location"}
          </span>
        </motion.div>
      </motion.button>

      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
        >
          <span className="text-sm">⚠️</span>
          <p className="text-xs">{error}</p>
        </motion.div>
      )}

      <motion.p
        className="location-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        🔒 Location data is only used to find air quality
      </motion.p>
    </div>
  );
}
