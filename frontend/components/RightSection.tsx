"use client";

import React from "react";
import dynamic from "next/dynamic";

const TurbineMap = dynamic(() => import("./TurbineMap"), {
  ssr: false,
});

const RightSection = () => {
  return (
    <div className="grow h-full bg-red-200">
      <TurbineMap />
    </div>
  );
};

export default RightSection;
