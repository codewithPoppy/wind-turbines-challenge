export type Wind = {
  speed: number;
  gust: number;
  deg: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Main = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
};

export type Forecast = {
  dt: number;
  weather: Weather[];
  wind: Wind;
  main: Main;
};
