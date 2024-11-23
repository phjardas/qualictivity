import {
  qualityLevels,
  type QualityCounts,
  type QualityLevel,
} from "./types.js";

export function calculateQualityProbabilities(
  quality: number,
  baseQuality: QualityLevel
): QualityCounts {
  const probabilities: QualityCounts = {
    normal: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  // Legendary items cannot be upgraded
  if (baseQuality === "legendary") {
    probabilities.legendary = 1;
    return probabilities;
  }

  // Probability of not upgrading
  probabilities[baseQuality] = 1 - quality;

  const baseQualityIndex = qualityLevels.indexOf(baseQuality);
  probabilities[qualityLevels[baseQualityIndex + 1]] = quality;

  for (
    let i = qualityLevels.indexOf(baseQuality) + 2;
    i < qualityLevels.length;
    i++
  ) {
    probabilities[qualityLevels[i]] = probabilities[qualityLevels[i - 1]] * 0.1;
    probabilities[qualityLevels[i - 1]] *= 0.9;
  }

  return probabilities;
}
