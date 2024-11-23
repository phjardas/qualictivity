export const qualityLevels = [
  "normal",
  "uncommon",
  "rare",
  "epic",
  "legendary",
] as const;

export type QualityLevel = (typeof qualityLevels)[number];

export type QualityCounts = Record<QualityLevel, number>;
