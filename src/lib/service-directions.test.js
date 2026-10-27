import { test, expect } from "bun:test";
import { serviceDirectionsUrl } from "./service-directions";
test("directions open the provider coordinates in driving mode without requiring an origin", () => {
  const url = new URL(serviceDirectionsUrl({ latitude: 41.3111, longitude: 69.2797 }));
  expect(url.origin + url.pathname).toBe("https://www.google.com/maps/dir/");
  expect(url.searchParams.get("destination")).toBe("41.3111,69.2797");
  expect(url.searchParams.get("travelmode")).toBe("driving");
  expect(url.searchParams.has("origin")).toBe(false);
});
test("invalid coordinates never produce a directions link", () => {
  expect(serviceDirectionsUrl({ latitude: 91, longitude: 69 })).toBeNull();
  expect(serviceDirectionsUrl({ latitude: 41, longitude: NaN })).toBeNull();
});
