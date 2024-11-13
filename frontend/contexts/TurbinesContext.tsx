"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import type { Turbine } from "@/types/turbine";

interface TurbinesContextProps {
  turbines: Turbine[];
  setTurbines: React.Dispatch<React.SetStateAction<Turbine[]>>;
  selectedTurbine: number;
  setSelectedTurbine: React.Dispatch<React.SetStateAction<number>>;
  turbineDetailModalOpen: boolean;
  setTurbineDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TurbinesContext = createContext<TurbinesContextProps | undefined>(
  undefined
);

export const TurbinesProvider: React.FC<{
  initialState: Turbine[];
  children: ReactNode;
}> = ({ initialState, children }) => {
  const [turbines, setTurbines] = useState<Turbine[]>(initialState);
  const [selectedTurbine, setSelectedTurbine] = useState<number>(-1);
  const [turbineDetailModalOpen, setTurbineDetailModalOpen] = useState(false);

  return (
    <TurbinesContext.Provider
      value={{
        turbines,
        setTurbines,
        selectedTurbine,
        setSelectedTurbine,
        turbineDetailModalOpen,
        setTurbineDetailModalOpen,
      }}
    >
      {children}
    </TurbinesContext.Provider>
  );
};

export const useTurbines = (): TurbinesContextProps => {
  const context = useContext(TurbinesContext);
  if (!context) {
    throw new Error("useTurbines must be used within a TurbinesProvider");
  }
  return context;
};
