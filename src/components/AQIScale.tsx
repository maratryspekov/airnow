import { motion } from "framer-motion";

type AQIScaleProps = {
  aqi?: number; // current AQI level (optional)
};

export default function AQIScale({ aqi = 0 }: AQIScaleProps) {
  const levels = [
    { color: "#4ade80", label: "Good" },
    { color: "#facc15", label: "Moderate" },
    { color: "#f97316", label: "Unhealthy (Sensitive)" },
    { color: "#ef4444", label: "Unhealthy" },
    { color: "#8b5cf6", label: "Very Unhealthy" },
    { color: "#6b7280", label: "Hazardous" },
  ];

  // marker position in percentage
  const position = Math.min(aqi, 300) / 3.0; // max 100%

  return (
    <motion.div
      className="aqi-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Color scale bar */}
      <div className="aqi-bar">
        {levels.map((l) => (
          <div
            key={l.label}
            className="aqi-segment"
            style={{ backgroundColor: l.color }}
          ></div>
        ))}

        {/* Current AQI marker */}
        <motion.div
          className="aqi-marker"
          animate={{ left: `${position}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* Labels */}
      <div className="aqi-labels">
        {levels.map((l) => (
          <span key={l.label}>{l.label}</span>
        ))}
      </div>
    </motion.div>
  );
}
