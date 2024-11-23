import { describe, expect, it } from "vitest";
import { calculateQualityProbabilities } from "../src/quality";
import { qualityLevels, type QualityCounts } from "../src/types";

describe("quality", () => {
  describe("calculateQualityProbabilities", () => {
    it("should calculate probabilities for zero quality", () => {
      const probabilities = calculateQualityProbabilities(0, "normal");
      assertQualityCounts(probabilities, {
        normal: 1,
        uncommon: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
      });
    });

    it("should calculate probabilities for base quality of normal", () => {
      const probabilities = calculateQualityProbabilities(0.248, "normal");
      assertQualityCounts(probabilities, {
        normal: 0.752,
        uncommon: 0.2232,
        rare: 0.02232,
        epic: 0.002232,
        legendary: 0.000248,
      });
    });

    it("should calculate probabilities for base quality of rare", () => {
      const probabilities = calculateQualityProbabilities(0.248, "rare");
      assertQualityCounts(probabilities, {
        normal: 0,
        uncommon: 0,
        rare: 0.752,
        epic: 0.2232,
        legendary: 0.0248,
      });
    });

    it("should calculate probabilities for base quality of legendary", () => {
      const probabilities = calculateQualityProbabilities(0.248, "legendary");
      assertQualityCounts(probabilities, {
        normal: 0,
        uncommon: 0,
        rare: 0,
        epic: 0,
        legendary: 1,
      });
    });
  });
});

function assertQualityCounts(actual: QualityCounts, expected: QualityCounts) {
  for (const qualityLevel of qualityLevels) {
    expect(actual[qualityLevel], qualityLevel).toBeCloseTo(
      expected[qualityLevel],
      5
    );
  }
}
