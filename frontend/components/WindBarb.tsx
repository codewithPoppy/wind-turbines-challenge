import React, { useEffect } from "react";
import { D3WindBarb, ConversionFactors } from "d3-wind-barbs";

interface WindBarbProps {
  direction: number;
  speed: number;
  parentElementId: string;
}

const WindBarb = ({ direction, speed, parentElementId }: WindBarbProps) => {
  useEffect(() => {
    const speedInKnots = Math.floor(speed / 0.514444);
    const parentElement = document.getElementById(parentElementId);
    if (parentElement) parentElement.innerHTML = "";
    const svg = new D3WindBarb(
      speedInKnots,
      direction,

      {
        baseCircle: {
          className: "wind-barb-base-circle",
          fill: "#fff",
          radius: 5,
          stroke: "#fff",
          strokeWidth: 1,
        },
        size: {
          height: 20,
          width: 40,
        },
        circle: {
          stroke: "#fff",
        },
        bar: {
          stroke: "#fff",
        },
        triangle: {
          fill: "#fff",
          stroke: "#fff",
        },
      }
    ).draw("#" + parentElementId);
  }, [direction, parentElementId, speed]);
  return null;
};

export default WindBarb;
