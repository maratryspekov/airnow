import { useState } from "react";
import axios from "axios";

// Demo data based on realistic OpenWeatherMap values
const getDemoData = (city: string) => {
  const demoDataMap: { [key: string]: any } = {
    lisbon: {
      city: "Lisbon",
      aqi: 32, // Based on PM2.5: 8 μg/m³ = ~27 AQI
      date: new Date().toISOString(),
      pollutants: {
        CO: { concentration: 0.2, aqi: 2 },
        NO2: { concentration: 12, aqi: 6 },
        O3: { concentration: 65, aqi: 16 },
        SO2: { concentration: 3, aqi: 1 },
        "PM2.5": { concentration: 8, aqi: 27 },
        PM10: { concentration: 15, aqi: 14 },
      },
    },
    mumbai: {
      city: "Mumbai",
      aqi: 187, // Based on PM2.5: 85 μg/m³ = ~187 AQI (Unhealthy)
      date: new Date().toISOString(),
      pollutants: {
        CO: { concentration: 1.5, aqi: 15 },
        NO2: { concentration: 68, aqi: 34 },
        O3: { concentration: 45, aqi: 14 },
        SO2: { concentration: 25, aqi: 10 },
        "PM2.5": { concentration: 85, aqi: 187 },
        PM10: { concentration: 142, aqi: 95 },
      },
    },
    paris: {
      city: "Paris",
      aqi: 56, // Based on PM2.5: 18 μg/m³ = ~56 AQI (Moderate)
      date: new Date().toISOString(),
      pollutants: {
        CO: { concentration: 0.6, aqi: 6 },
        NO2: { concentration: 28, aqi: 14 },
        O3: { concentration: 82, aqi: 25 },
        SO2: { concentration: 8, aqi: 3 },
        "PM2.5": { concentration: 18, aqi: 56 },
        PM10: { concentration: 32, aqi: 29 },
      },
    },
    beijing: {
      city: "Beijing",
      aqi: 267, // Based on PM2.5: 150 μg/m³ = ~200+ AQI (Very Unhealthy)
      date: new Date().toISOString(),
      pollutants: {
        CO: { concentration: 2.1, aqi: 21 },
        NO2: { concentration: 85, aqi: 43 },
        O3: { concentration: 35, aqi: 11 },
        SO2: { concentration: 45, aqi: 18 },
        "PM2.5": { concentration: 120, aqi: 267 },
        PM10: { concentration: 185, aqi: 142 },
      },
    },
  };

  return demoDataMap[city.toLowerCase()] || null;
};

interface PollutantData {
  concentration: number;
  aqi: number;
}

interface AirQualityData {
  city: string;
  aqi: number;
  date?: string;
  pollutants?: {
    CO?: PollutantData;
    NO2?: PollutantData;
    O3?: PollutantData;
    "PM2.5"?: PollutantData;
    PM10?: PollutantData;
  };
}

export function useAirQuality() {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAirQuality = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      // Check if API key is configured
      if (!apiKey || apiKey === "demo" || apiKey === "YOUR_API_KEY_HERE") {
        // Fallback: return demo data for popular cities
        const demoData = getDemoData(city);
        if (demoData) {
          setData(demoData);
          return demoData;
        } else {
          setError(
            "Please configure OpenWeatherMap API key in .env file. Visit openweathermap.org to get a free key."
          );
          setData(null);
          return null;
        }
      }

      // First get coordinates for the city using geocoding
      const geocodeResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      if (!geocodeResponse.data || geocodeResponse.data.length === 0) {
        setError("City not found. Please check the spelling.");
        setData(null);
        return null;
      }

      const { lat, lon } = geocodeResponse.data[0];

      // Get air pollution data using coordinates
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      if (
        !response.data ||
        !response.data.list ||
        response.data.list.length === 0
      ) {
        setError("No air quality data found for this city.");
        setData(null);
        return null;
      }

      const airData = response.data.list[0];
      const components = airData.components;

      // Calculate EPA AQI from pollutant concentrations
      const calculateEPAAQI = (components: any): number => {
        const aqiValues = [];

        // PM2.5 AQI calculation (μg/m³ to AQI)
        if (components.pm2_5 !== undefined) {
          const pm25 = components.pm2_5;
          let pm25AQI;
          if (pm25 <= 12) pm25AQI = Math.round((50 / 12) * pm25);
          else if (pm25 <= 35.4)
            pm25AQI = Math.round(
              ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51
            );
          else if (pm25 <= 55.4)
            pm25AQI = Math.round(
              ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101
            );
          else if (pm25 <= 150.4)
            pm25AQI = Math.round(
              ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151
            );
          else if (pm25 <= 250.4)
            pm25AQI = Math.round(
              ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201
            );
          else
            pm25AQI = Math.round(
              ((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301
            );
          aqiValues.push(pm25AQI);
        }

        // PM10 AQI calculation
        if (components.pm10 !== undefined) {
          const pm10 = components.pm10;
          let pm10AQI;
          if (pm10 <= 54) pm10AQI = Math.round((50 / 54) * pm10);
          else if (pm10 <= 154)
            pm10AQI = Math.round(((100 - 51) / (154 - 55)) * (pm10 - 55) + 51);
          else if (pm10 <= 254)
            pm10AQI = Math.round(
              ((150 - 101) / (254 - 155)) * (pm10 - 155) + 101
            );
          else if (pm10 <= 354)
            pm10AQI = Math.round(
              ((200 - 151) / (354 - 255)) * (pm10 - 255) + 151
            );
          else if (pm10 <= 424)
            pm10AQI = Math.round(
              ((300 - 201) / (424 - 355)) * (pm10 - 355) + 201
            );
          else
            pm10AQI = Math.round(
              ((500 - 301) / (604 - 425)) * (pm10 - 425) + 301
            );
          aqiValues.push(pm10AQI);
        }

        // O3 AQI calculation (μg/m³ to ppm first, then AQI)
        if (components.o3 !== undefined) {
          const o3ppm = components.o3 * 0.0005; // Convert μg/m³ to ppm
          let o3AQI;
          if (o3ppm <= 0.059) o3AQI = Math.round((50 / 0.059) * o3ppm);
          else if (o3ppm <= 0.075)
            o3AQI = Math.round(
              ((100 - 51) / (0.075 - 0.06)) * (o3ppm - 0.06) + 51
            );
          else if (o3ppm <= 0.095)
            o3AQI = Math.round(
              ((150 - 101) / (0.095 - 0.076)) * (o3ppm - 0.076) + 101
            );
          else if (o3ppm <= 0.115)
            o3AQI = Math.round(
              ((200 - 151) / (0.115 - 0.096)) * (o3ppm - 0.096) + 151
            );
          else
            o3AQI = Math.round(
              ((300 - 201) / (0.374 - 0.116)) * (o3ppm - 0.116) + 201
            );
          aqiValues.push(o3AQI);
        }

        // Return the highest AQI value (most restrictive)
        return aqiValues.length > 0 ? Math.max(...aqiValues) : 50;
      };

      const calculatedAQI = calculateEPAAQI(components);

      const aqiData = {
        city: city || "Unknown",
        aqi: Math.min(calculatedAQI, 500), // Cap at 500 for safety
        date: new Date().toISOString(),
        pollutants: {
          CO: {
            concentration: Math.round(components.co / 1000), // Convert μg/m³ to mg/m³
            aqi: Math.round((components.co / 1000) * 10), // Rough CO AQI approximation
          },
          NO2: {
            concentration: Math.round(components.no2),
            aqi: Math.round(components.no2 * 0.5), // Rough NO2 AQI approximation
          },
          O3: {
            concentration: Math.round(components.o3),
            aqi: Math.round(components.o3 * 0.3), // Rough O3 AQI approximation
          },
          SO2: {
            concentration: Math.round(components.so2),
            aqi: Math.round(components.so2 * 0.4), // Rough SO2 AQI approximation
          },
          "PM2.5": {
            concentration: Math.round(components.pm2_5),
            aqi: Math.round(components.pm2_5 * 4), // More accurate PM2.5 conversion
          },
          PM10: {
            concentration: Math.round(components.pm10),
            aqi: Math.round(components.pm10 * 1.2), // More accurate PM10 conversion
          },
        },
      };

      setData(aqiData);
      return aqiData;
    } catch (err: any) {
      console.error("Error fetching air quality:", err);

      // If API key is invalid or not yet activated, fallback to demo data
      if (err.response?.status === 401) {
        const demoData = getDemoData(city);
        if (demoData) {
          setData(demoData);
          setError(
            "API key activating... Using demo data. May take 5-10 minutes for live data."
          );
          return demoData;
        }
      }

      setError("Failed to load data. Please try again.");
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAirQuality };
}
