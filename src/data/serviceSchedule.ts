import type { Lang } from "@/i18n/translations";

export type Action = "I" | "R" | "I/R" | "—";
/** I = Inspect/adjust/top-up, R = Replace */

export interface ScheduleItem {
  /** Translation key for the item label (e.g. "sched.engineOil") */
  labelKey: string;
  /** Notes superscript markers from the manual, e.g. "(1)(2)(8)" */
  notes?: string;
  /** Actions aligned to COBALT_INTERVALS_KM */
  actions: Action[];
}

/** Mileage milestones (x1000 km) from the official Cobalt service manual */
export const COBALT_INTERVALS_KM = [
  2.5, 10, 17.5, 25, 32.5, 40, 47.5, 55, 62.5, 70, 77.5, 85, 92.5, 100,
];

/** Or the equivalent in months */
export const COBALT_INTERVALS_MONTHS = [
  3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81,
];

/** Service schedule for Chevrolet Cobalt 1.5L — transcribed from the official UZ service manual. */
export const COBALT_SCHEDULE: ScheduleItem[] = [
  {
    labelKey: "sched.generatorAcBelt",
    actions: ["—", "—", "—", "—", "—", "—", "R", "—", "—", "—", "—", "—", "—", "—"],
  },
  {
    labelKey: "sched.engineOil",
    notes: "(1)(2)(8)",
    actions: ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  },
  {
    labelKey: "sched.coolingSealing",
    actions: ["I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
  },
  {
    labelKey: "sched.coolant",
    notes: "(2)(3)",
    actions: ["I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
  },
  {
    labelKey: "sched.fuelFilter",
    notes: "(1)(2)",
    actions: ["—", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R"],
  },
  {
    labelKey: "sched.fuelLines",
    actions: ["—", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
  },
  {
    labelKey: "sched.airFilter",
    notes: "(1)(2)",
    actions: ["I", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R"],
  },
  {
    labelKey: "sched.sparkPlugs",
    notes: "(2)",
    actions: ["—", "—", "—", "—", "R", "—", "—", "—", "R", "—", "—", "—", "R", "—"],
  },
  {
    labelKey: "sched.cabinFilter",
    notes: "(1)",
    actions: ["I", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R", "I", "R"],
  },
  {
    labelKey: "sched.brakeFluid",
    notes: "(1)(2)(4)",
    actions: ["I", "I", "I", "I", "R", "I", "I", "I", "R", "I", "I", "I", "R", "I"],
  },
  {
    labelKey: "sched.frontBrakes",
    notes: "(5)",
    actions: ["I", "I", "I", "I", "R", "I", "I", "I", "R", "I", "I", "I", "R", "I"],
  },
  {
    labelKey: "sched.rearBrakes",
    notes: "(5)",
    actions: ["I", "I", "I", "I", "R", "I", "I", "I", "R", "I", "I", "I", "R", "I"],
  },
  {
    labelKey: "sched.parkingBrake",
    actions: ["I", "I", "I", "I", "I", "I", "I", "R", "I", "I", "I", "I", "I", "I"],
  },
  {
    labelKey: "sched.suspension",
    actions: ["I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
  },
];
