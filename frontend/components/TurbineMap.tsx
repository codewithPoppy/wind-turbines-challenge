"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { useTurbines } from "@/contexts/TurbinesContext";
import { useEffect } from "react";

const turbineIcon = L.icon({
  iconUrl: "/turbine.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const selectedTurbinIcon = L.icon({
  iconUrl: "/turbine1.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: "!z-[999]",
});

const MoveMap = () => {
  const { turbines, selectedTurbine } = useTurbines();
  const map = useMap();

  useEffect(() => {
    const selectedTurbineData = turbines.find((t) => t.id === selectedTurbine);
    if (map && selectedTurbine !== -1 && selectedTurbineData) {
      map.flyTo(
        [
          selectedTurbineData.latitude,
          selectedTurbineData.longitude,
        ] as LatLngExpression,
        map.getZoom(),
        {
          animate: true,
          duration: 1,
        }
      );
    }
  }, [map, selectedTurbine, turbines]);
  return null;
};

const TurbineMap: React.FC = () => {
  const {
    turbines,
    selectedTurbine,
    setSelectedTurbine,
    setTurbineDetailModalOpen,
  } = useTurbines();
  const centerLat =
    turbines.reduce((sum, turbine) => sum + turbine.latitude, 0) /
    turbines.length;
  const centerLon =
    turbines.reduce((sum, turbine) => sum + turbine.longitude, 0) /
    turbines.length;
  const centerPosition: LatLngExpression = [centerLat, centerLon];

  return (
    <MapContainer
      center={centerPosition}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <MoveMap />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {turbines.map((turbine) => (
        <Marker
          key={turbine.id}
          position={[turbine.latitude, turbine.longitude]}
          icon={
            selectedTurbine === turbine.id ? selectedTurbinIcon : turbineIcon
          }
          eventHandlers={{
            click: () => {
              setSelectedTurbine(turbine.id);
              setTimeout(() => {
                setTurbineDetailModalOpen(true);
              }, 1000);
            },
          }}
        >
          <Popup>{turbine.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TurbineMap;
