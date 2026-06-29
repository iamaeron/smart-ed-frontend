import { cacheFetch } from "@/lib/cache-store";
import { useCallback, useMemo, useRef, useState, type Ref } from "react";
import { Marker } from "react-leaflet";

export default function DraggableMarker() {
  const center = {
    lat: 15.04,
    lng: 120.6667,
  };
  const [position, setPosition] = useState(center);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const markerRef = useRef(null);

  const fetchAddress = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const data: any = await cacheFetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      );

      // Nominatim returns a detailed display_name
      setAddress(data.display_name || "Address not found");
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Failed to fetch address details.");
    } finally {
      setIsLoading(false);
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          // fetchAddress(newPos.lat, newPos.lng);
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
}
