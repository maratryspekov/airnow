export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "bg-green-400";
  if (aqi <= 100) return "bg-yellow-400";
  if (aqi <= 150) return "bg-orange-500";
  if (aqi <= 200) return "bg-red-500";
  if (aqi <= 300) return "bg-purple-500";
  return "bg-gray-600";
}
