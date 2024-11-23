import { qualityLevels, type QualityCounts } from "./types.js";

export function multiply(counts: QualityCounts, factor: number): QualityCounts {
  return Object.fromEntries(
    Object.entries(counts).map(([quality, count]) => [quality, count * factor])
  ) as QualityCounts;
}

export function add(a: QualityCounts, b: QualityCounts): QualityCounts {
  return Object.fromEntries(
    qualityLevels.map((quality) => [quality, a[quality] + b[quality]])
  ) as QualityCounts;
}

export function total(counts: QualityCounts): number {
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
}
