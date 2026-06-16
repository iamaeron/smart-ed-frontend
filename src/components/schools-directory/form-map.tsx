import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SearchField from "./map-search-bar"; // Path to your search component
import "leaflet/dist/leaflet.css";
import { Paper } from "@mantine/core";
import DraggableMarker from "./draggable-marker";
import { useAddressStore } from "@/stores/address.store";
import { useEffect, useState } from "react";
import provicesJson from "@/data/provinces.json";

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 16);
  return null;
}

export default function FormMap() {
  const centerPosition: [number, number] = [15.04, 120.6667];
  const [coordinates, setCoordinates] =
    useState<[number, number]>(centerPosition);

  const selectedBarangay = useAddressStore((state) => state.barangay);
  const selectedCity = useAddressStore((state) => state.city);
  const selectedProvince = useAddressStore((state) => state.province);
  const street = useAddressStore((state) => state.street);
  const setId = useAddressStore((state) => state.setId);

  useEffect(() => {
    if (
      !selectedBarangay.length ||
      !selectedCity.length ||
      !selectedProvince.length
    )
      return;

    const prov = provicesJson.find(
      (p) => p.name === selectedProvince.toUpperCase(),
    );

    setId("region", prov?.reg_code);

    const fetchLoc = async () => {
      const fullAddress = `${street ? street : ""},${selectedBarangay}, ${selectedCity.replace("city", "")}, ${selectedProvince}, Philippines`;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
        );
        const data = await response.json();
        console.log(fullAddress);

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // 2. Update state to trigger map re-render
          setCoordinates([lat, lon]);
        }
      } catch (error) {
        console.error("Geocoding failed:", error);
      }
    };

    fetchLoc();
  }, [selectedBarangay, selectedCity, selectedProvince, street]);

  return (
    <Paper h={150} w="100%" radius="md" style={{ overflow: "hidden" }}>
      <MapContainer
        center={centerPosition as any}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Place the search box control here */}
        {/* <SearchField /> */}
        <Marker position={coordinates} />
        <ChangeMapView center={coordinates} />
        {/* <DraggableMarker center={coordinates} /> */}
      </MapContainer>
    </Paper>
  );
}
