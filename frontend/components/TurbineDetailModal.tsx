"use client";

import { useTurbines } from "@/contexts/TurbinesContext";
import { Forecast } from "@/types/forecast";
import React, { useEffect } from "react";
import WindBarChart from "./WindBarChart";
import WindDirectionChart from "./WindDirectionChart";
import ForecastTable from "./ForecastTable";
import { serverUrl } from "@/config/config";

const TurbineDetailModal = () => {
  const {
    turbineDetailModalOpen,
    setTurbineDetailModalOpen,
    turbines,
    selectedTurbine,
  } = useTurbines();

  const turbineData = turbines.find((t) => t.id === selectedTurbine);
  const [forecasts, setForecasts] = React.useState<Forecast[]>([]);

  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/wind-data/${selectedTurbine}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const forecasts: Forecast[] = await response.json();
        console.log({ forecasts });

        setForecasts(forecasts);
      } catch (error) {
        console.error("Failed to fetch wind data:", error);
      }
    };

    fetchWindData();
  }, [selectedTurbine]);

  if (!turbineDetailModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-gray-800 rounded-lg shadow-lg w-3/4 p-6 relative">
        <h2 className="text-2xl font-bold mb-4">{turbineData?.name}</h2>

        {forecasts.length === 0 ? (
          <div className="">
            <h1>Loading the data...</h1>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <ForecastTable forecasts={forecasts} />
            </div>
            <div className="w-full h-[400px] mt-4 flex">
              <WindBarChart
                windData={forecasts.map((item) => item.wind)}
                datetimes={forecasts.map((item) => item.dt)}
              />
              <div className="w-[400px] h-[400px]">
                <WindDirectionChart
                  windData={forecasts.map((item) => item.wind)}
                  datetimes={forecasts.map((item) => item.dt)}
                />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-row">
          <button
            className="mt-4 text-white py-2 px-4 rounded-md border-white border-2 ml-auto"
            onClick={() => setTurbineDetailModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurbineDetailModal;
