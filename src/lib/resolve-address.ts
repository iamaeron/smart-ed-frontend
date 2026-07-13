import provincesJson from "@/data/provinces.json";
import citiesJson from "@/data/city-mun.json";
import barangaysJson from "@/data/barangays.json";

export function resolveAddressIds({
  province,
  city,
  barangay,
}: {
  province?: string;
  city?: string;
  barangay?: string;
}) {
  const provinceEntry = provincesJson.find(
    (p) => p.name.toLowerCase() === province?.toLowerCase(),
  );
  const provinceId = provinceEntry?.prov_code ?? 0;
  const region = provinceEntry?.reg_code ?? "";

  const cityEntry = citiesJson.find(
    (c) =>
      c.prov_code === provinceId &&
      c.name.toLowerCase() === city?.toLowerCase(),
  );
  const cityId = cityEntry?.mun_code ?? 0;

  const barangayEntry = (barangaysJson as any[]).find(
    (b) =>
      b.mun_code === cityId && b.name.toLowerCase() === barangay?.toLowerCase(),
  );
  const barangayId = barangayEntry?.id ?? 0;

  return {
    provinceId,
    province: province?.toLowerCase() ?? "",
    region,
    cityId,
    city: city?.toLowerCase() ?? "",
    barangayId,
    barangay: barangay?.toLowerCase() ?? "",
  };
}
