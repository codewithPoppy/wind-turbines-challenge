import { Main, Wind } from "@/types/forecast";
import React, { useCallback } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from "recharts";

interface WindDirectionChartProps {
  windData: Wind[];
  datetimes: number[];
}

const WindDirectionChart = ({
  windData,
  datetimes,
}: WindDirectionChartProps) => {
  const generateXAxisName = useCallback((dt: number) => {
    return (
      new Date(dt * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
      }) +
      "/" +
      new Date(dt * 1000)
        .toLocaleTimeString("en-GB", {
          hour: "numeric",
          hour12: true,
        })
        .slice(0, 5)
    );
  }, []);

  const chartData = Array.from({ length: 18 }, (_, i) => i).map((index) => ({
    angle: index * 20,
    ...datetimes
      .map((dt, ind: number) => ({
        [generateXAxisName(dt)]:
          (windData[ind].deg >= index * 20 &&
            windData[ind].deg < (index + 1) * 20) ||
          (windData[ind].deg >= (index + 1) * 20 &&
            windData[ind].deg < (index + 2) * 20)
            ? windData[ind].speed
            : 0,
      }))
      .reduce((acc, curr) => {
        acc[Object.keys(curr)[0]] = Object.values(curr)[0];
        return acc;
      }, {}),
  }));

  console.log({ chartData });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="angle" />
        <PolarRadiusAxis
          angle={1}
          domain={[
            0,
            Math.ceil(Math.max(...windData.map((item) => item.speed))),
          ]}
        />
        {datetimes.map((dt, index) => (
          <Radar
            key={index}
            name={generateXAxisName(dt)}
            dataKey={generateXAxisName(dt)}
            stroke="#fff"
            fill="#fff"
            fillOpacity={0.5}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default WindDirectionChart;
