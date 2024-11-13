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
} from "recharts";

interface WindBarChartProps {
  windData: Wind[];
  datetimes: number[];
}

const WindBarChart = ({ windData, datetimes }: WindBarChartProps) => {
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

  const chartData = datetimes.map((dt, index: number) => ({
    name: generateXAxisName(dt),
    Average_Speed: windData[index].speed,
    Gust_Speed: windData[index].gust,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Average_Speed"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Gust_Speed"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WindBarChart;
