export interface PollutantData {
  concentration: number;
  aqi: number;
}

export interface AirQualityData {
  city: string;
  aqi: number;
  date?: string;
  pollutants?: {
    CO?: PollutantData;
    NO2?: PollutantData;
    O3?: PollutantData;
    SO2?: PollutantData;
    "PM2.5"?: PollutantData;
    PM10?: PollutantData;
  };
}
