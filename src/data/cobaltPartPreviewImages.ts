import airFilterCylinder from "@/assets/maintenance-previews/air-filter-cylinder.jpg";
import brakeFluidAsset from "@/assets/maintenance-previews/brake-fluid.png.asset.json";
import cabinFilterAsset from "@/assets/maintenance-previews/cabin-filter.png.asset.json";
import exhaustSystem from "@/assets/maintenance-previews/exhaust-system.jpg";
import fuelFilterAsset from "@/assets/maintenance-previews/fuel-filter.png.asset.json";
import sparkPlugAsset from "@/assets/maintenance-previews/spark-plug.png.asset.json";
import steeringMechanismAsset from "@/assets/maintenance-previews/steering-mechanism.png.asset.json";
import transmissionOilAsset from "@/assets/maintenance-previews/transmission-oil.png.asset.json";
import cobaltSuspension from "@/assets/parts/cobalt/suspension.jpg";

export const COBALT_PART_PREVIEW_IMAGES: Record<string, string> = {
  fuel_filter: fuelFilterAsset.url,
  cabin_filter: cabinFilterAsset.url,
  spark_plugs: sparkPlugAsset.url,
  brake_fluid: brakeFluidAsset.url,
  transmission: transmissionOilAsset.url,
  steering: steeringMechanismAsset.url,
  exhaust: exhaustSystem,
  airfilter: airFilterCylinder,
  suspension: cobaltSuspension,
};
