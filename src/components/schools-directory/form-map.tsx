import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SearchField from "./map-search-bar"; // Path to your search component
import "leaflet/dist/leaflet.css";
import { Paper } from "@mantine/core";
import DraggableMarker from "./draggable-marker";

export default function FormMap() {
  const centerPosition = [15.04, 120.6667];

  return (
    <Paper h={200} w="100%" radius="md" style={{ overflow: "hidden" }}>
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
        <SearchField />
        <DraggableMarker />
      </MapContainer>
    </Paper>
  );
}
