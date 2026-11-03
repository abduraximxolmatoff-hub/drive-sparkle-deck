import { createServerFn } from "@tanstack/react-start";

export type FuelType = "petrol" | "methane" | "propane" | "electric";
export type FuelStation = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number | null;
  reviewCount: number;
};

// Fixed queries only: users can't send arbitrary text to the paid Maps API.
const QUERIES: Record<FuelType, string> = {
  petrol: "АЗС бензин Ташкент",
  methane: "метан заправка Ташкент",
  propane: "пропан заправка Ташкент",
  electric: "электрозаправка Ташкент",
};
const TTL = 12 * 60 * 60 * 1000;
const cache = new Map<FuelType, { at: number; data: FuelStation[] }>();

export const getFuelStations = createServerFn({ method: "GET" })
  .inputValidator((input: { type: FuelType }) => {
    if (!input || !(input.type in QUERIES)) throw new Error("Invalid fuel type");
    return { type: input.type };
  })
  .handler(async ({ data }): Promise<FuelStation[]> => {
    const hit = cache.get(data.type);
    if (hit && Date.now() - hit.at < TTL) return hit.data;
    const lovableKey = process.env.LOVABLE_API_KEY;
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey || !mapsKey) throw new Error("Map service is not configured");
    const res = await fetch(
      "https://connector-gateway.lovable.dev/google_maps/places/v1/places:searchText",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": mapsKey,
          "Content-Type": "application/json",
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount",
        },
        body: JSON.stringify({
          textQuery: QUERIES[data.type],
          maxResultCount: 20,
          languageCode: "uz",
          locationBias: {
            circle: { center: { latitude: 41.3111, longitude: 69.2797 }, radius: 20000 },
          },
        }),
      },
    );
    if (!res.ok) throw new Error(`Stations unavailable (${res.status})`);
    const json = (await res.json()) as {
      places?: {
        id: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        location?: { latitude: number; longitude: number };
        rating?: number;
        userRatingCount?: number;
      }[];
    };
    const stations = (json.places ?? [])
      .filter((p) => p.location)
      .map((p) => ({
        id: p.id,
        name: p.displayName?.text ?? "—",
        address: p.formattedAddress ?? "",
        latitude: p.location!.latitude,
        longitude: p.location!.longitude,
        rating: p.rating ?? null,
        reviewCount: p.userRatingCount ?? 0,
      }));
    cache.set(data.type, { at: Date.now(), data: stations });
    return stations;
  });
