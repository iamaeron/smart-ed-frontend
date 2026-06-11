import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Import the required CSS globally or in this component
import "leaflet-geosearch/dist/geosearch.css";

export default function SearchField() {
  const map = useMap();

  useEffect(() => {
    // 1. Configure the provider (OpenStreetMap)
    const provider = new OpenStreetMapProvider();

    // 2. Initialize the Search Control
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: "bar", // Alternatives: 'button'
      showMarker: true, // Places a marker on found location
      showPopup: false, // Doesn't open a popup automatically
      autoClose: true, // Closes suggestion list after selection
      retainZoomLevel: false, // Zooms into the location
      animateZoom: true,
      keepResult: true, // Keeps text in search input after selection
    });

    // 3. Add control to the map
    map.addControl(searchControl);

    // 4. Cleanup control on component unmount
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null; // This component doesn't render HTML directly
}
