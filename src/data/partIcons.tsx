import {
  Disc3,
  AppWindow,
  Droplet,
  Cog,
  BatteryCharging,
  Disc2,
  Lightbulb,
  Snowflake,
  Wind,
  Waves,
  Fuel,
  Leaf,
  Zap,
  Droplets,
  Settings2,
  CircleDot,
  Cloud,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps each CarPart id to a crisp, consistent SVG icon instead of emoji.
 * Emoji rendering varies wildly across OS/browsers (some show as blank
 * "tofu" boxes, e.g. newer glyphs like 🛞/🪟 on older Windows fonts), so
 * every part icon in the UI should render through this map for a clean,
 * professional look on every platform.
 */
export const PART_ICONS: Record<string, LucideIcon> = {
  tires: Disc3,
  windows: AppWindow,
  oil: Droplet,
  engine: Cog,
  battery: BatteryCharging,
  brakes: Disc2,
  headlights: Lightbulb,
  cooling: Snowflake,
  airfilter: Wind,
  suspension: Waves,
  fuel_filter: Fuel,
  cabin_filter: Leaf,
  spark_plugs: Zap,
  brake_fluid: Droplets,
  transmission: Settings2,
  steering: CircleDot,
  exhaust: Cloud,
};

export function getPartIcon(partId: string): LucideIcon {
  return PART_ICONS[partId] ?? Cog;
}
