import { motion } from "framer-motion";
import { getAQIGradient } from "../utils/getAQIGradient";

type CityCardProps = {
  city: string;
  aqi: number;
  onRemove?: () => void;
};

function CityCard({ city, aqi, onRemove }: CityCardProps) {
  const getAQIDescription = (value: number) => {
    if (value <= 50) return "Good 🌿";
    if (value <= 100) return "Moderate 🌤";
    if (value <= 150) return "Unhealthy (Sensitive) 😷";
    if (value <= 200) return "Unhealthy 😩";
    if (value <= 300) return "Very Unhealthy ☠️";
    return "Hazardous 💀";
  };

  const markerPosition = Math.min(aqi, 300) / 3; // convert AQI to percentage (0-100%)

  return (
    <motion.div
      className="city-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Delete button*/}
      {onRemove && (
        <button className="city-card__close" onClick={onRemove}>
          ✕
        </button>
      )}

      <div className="city-card__header">
        <h2>{city}</h2>
        <p>{new Date().toLocaleDateString()}</p>
      </div>

      <div className="city-card__aqi">
        <p className="city-card__value">AQI: {aqi}</p>
        <p className="city-card__desc">{getAQIDescription(aqi)}</p>
        <p className="city-card__source">� EPA Standard AQI</p>

        {/* AQI scale bar inside the card */}
        <div className="city-card__bar">
          <div
            className="city-card__fill"
            style={{
              background: getAQIGradient(aqi),
              width: "100%",
            }}
          ></div>

          <motion.div
            className="city-card__marker"
            animate={{ left: `${markerPosition}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CityCard;
