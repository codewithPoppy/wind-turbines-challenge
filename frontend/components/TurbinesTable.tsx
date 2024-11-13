"use client";

import { useTurbines } from "@/contexts/TurbinesContext";
import { Turbine } from "@/types/turbine";
import React from "react";

const TurbinesTable = () => {
  const {
    turbines,
    setSelectedTurbine,
    selectedTurbine,
    setTurbineDetailModalOpen,
  } = useTurbines();

  const handleClickRow = (turbine: Turbine) => {
    setSelectedTurbine(turbine.id);
    setTimeout(() => {
      setTurbineDetailModalOpen(true);
    }, 1000);
  };

  return (
    <table className="divide-y divide-gray-200">
      <thead className="">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Longitude
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Latitude
          </th>
        </tr>
      </thead>
      <tbody className=" divide-y divide-gray-200">
        {turbines.map((turbine) => (
          <tr
            key={turbine.id}
            onClick={() => handleClickRow(turbine)}
            className={`cursor-pointer hover:bg-gray-700 ${
              selectedTurbine === turbine.id ? "bg-gray-700" : ""
            }`}
          >
            <td className="px-6 py-4  text-sm font-medium text-gray-200">
              {turbine.name}
            </td>
            <td className="px-6 py-4  text-sm text-gray-500">
              {turbine.longitude}
            </td>
            <td className="px-6 py-4  text-sm text-gray-500">
              {turbine.latitude}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TurbinesTable;
