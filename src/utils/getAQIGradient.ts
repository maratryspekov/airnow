export function getAQIGradient(aqi: number): string {
  if (aqi <= 50) return "linear-gradient(90deg, #4ade80, #22c55e)"; // good - green
  if (aqi <= 100) return "linear-gradient(90deg, #facc15, #fbbf24)"; // moderate - yellow
  if (aqi <= 150) return "linear-gradient(90deg, #fb923c, #f97316)"; // unhealthy for sensitive - orange
  if (aqi <= 200) return "linear-gradient(90deg, #ef4444, #dc2626)"; // unhealthy - red
  if (aqi <= 300) return "linear-gradient(90deg, #9333ea, #7e22ce)"; // very unhealthy - purple
  return "linear-gradient(90deg, #4b5563, #1f2937)"; // hazardous/unknown - gray
}
