import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export const Map = ({ children }) => {
  const mapCenter = {
    lat: 9.930468664302493,
    lng: -84.07751083374025,
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
};
