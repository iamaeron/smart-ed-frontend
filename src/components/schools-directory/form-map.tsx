import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Grid, Paper, Text, TextInput } from "@mantine/core";
import { useAddressStore } from "@/stores/address.store";
import { useEffect, useMemo, useRef } from "react";
import provicesJson from "@/data/provinces.json";
import { Controller, useFormContext } from "react-hook-form";
import type { SchoolData } from "@/types/form/school.schema";
import { cacheFetch } from "@/lib/cache-store";

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 20);
  return null;
}

export default function FormMap() {
  const centerPosition: [number, number] = [15.04, 120.6667];

  const coordinates = useAddressStore((state) => state.coordinates);
  const isPinDraggable = useAddressStore((state) => state.isPinDraggable);
  const selectedBarangay = useAddressStore((state) => state.barangay);
  const selectedCity = useAddressStore((state) => state.city);
  const selectedProvince = useAddressStore((state) => state.province);
  const setId = useAddressStore((state) => state.setId);
  const markerRef = useRef(null);

  const { control, setValue } = useFormContext<SchoolData>();

  useEffect(() => {
    setValue("latitude", String(coordinates[0]), { shouldValidate: true });
    setValue("longitude", String(coordinates[1]), { shouldValidate: true });
  }, [coordinates, setValue]);

  useEffect(() => {
    if (
      !selectedBarangay.length ||
      !selectedCity.length ||
      !selectedProvince.length
    )
      return;

    setId("isPinDraggable", true);

    const prov = provicesJson.find(
      (p) => p.name === selectedProvince.toUpperCase(),
    );

    setId("region", prov?.reg_code);

    const fetchLoc = async () => {
      const fullAddress = `${selectedBarangay}, ${selectedCity.replace("city", "")}, ${selectedProvince}, Philippines`;

      try {
        const data: any = await cacheFetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
        );

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          setId("coordinates", [lat, lon]);
        }
      } catch (error) {
        console.error("Geocoding failed:", error);
      }
    };

    fetchLoc();
  }, [selectedBarangay, selectedCity, selectedProvince]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setId("coordinates", [newPos.lat, newPos.lng]);
        }
      },
    }),
    [],
  );

  return (
    <Box>
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

          <Marker
            eventHandlers={eventHandlers}
            ref={markerRef}
            draggable={isPinDraggable}
            position={coordinates}
          />
          <ChangeMapView center={coordinates} />
          {/* <DraggableMarker center={coordinates} /> */}
        </MapContainer>
      </Paper>

      <Grid mt="sm">
        <Grid.Col span={6}>
          <Controller
            name="latitude"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                leftSection={<Text size="sm">X :</Text>}
                labelProps={{
                  mb: 2,
                  fw: 400,
                  c: "dark",
                }}
                radius="sm"
                value={coordinates[0].toFixed(5)}
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            name="longitude"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                leftSection={<Text size="sm">Y :</Text>}
                labelProps={{
                  mb: 2,
                  fw: 400,
                  c: "dark",
                }}
                radius="sm"
                value={coordinates[1].toFixed(5)}
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
