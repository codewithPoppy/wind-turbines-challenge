"use client";

import React from "react";
import TurbinesTable from "@/components/TurbinesTable";

const LeftSection = () => {
  return (
    <div className="h-full flex flex-col max-w-[500px] p-3 pr-0">
      <h1 className="text-xl py-3">Wind Turbines</h1>
      <div className="table-container overflow-y-auto">
        <TurbinesTable />
      </div>
    </div>
  );
};

export default LeftSection;
