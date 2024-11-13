import Image from "next/image";
import { Forecast } from "@/types/forecast";
import React from "react";
import WindBarb from "./WindBarb";

interface ForecastTableProps {
  forecasts: Forecast[];
}

const ForecastTable = ({ forecasts }: ForecastTableProps) => {
  return (
    <table className="w-full text-white ">
      <thead>
        <tr>
          <th className="border-b border-gray-700 p-2 text-left">Time</th>
          {forecasts.map((forecast) => (
            <th
              key={forecast.dt}
              className="border-b border-gray-700 p-2 min-w-20"
            >
              <p>
                {new Date(forecast.dt * 1000).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p>
                {new Date(forecast.dt * 1000)
                  .toLocaleTimeString("en-GB", {
                    hour: "numeric",
                    hour12: true,
                  })
                  .slice(0, 5)}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b border-gray-700 p-2 text-left">Temp</td>
          {forecasts.map((forecast) => (
            <td
              key={forecast.dt}
              className="border-b border-gray-700 p-2 text-center"
            >
              {forecast.main.temp.toFixed(1)} K
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-gray-700 p-2 text-left">Wind</td>
          {forecasts.map((forecast, index: number) => (
            <td
              key={forecast.dt}
              className="border-b border-gray-700 p-2 text-center"
            >
              <div className="h-12 mt-3" id={`wind-barb-${index}`}>
                <WindBarb
                  direction={forecast.wind.deg}
                  speed={forecast.wind.speed}
                  parentElementId={`wind-barb-${index}`}
                />
              </div>
              {forecast.wind.speed.toFixed(1)} m/s
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-gray-700 p-2 text-left">Weather</td>
          {forecasts.map((forecast) => (
            <td
              key={forecast.dt}
              className="border-b border-gray-700 p-2 text-center"
            >
              <Image
                width={50}
                height={50}
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                className="inline-block"
              />
              {/* {forecast.weather[0].description} */}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ForecastTable;
