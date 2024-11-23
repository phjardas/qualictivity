import { calculateQualityProbabilities } from "./quality.js";
import { add, multiply, total } from "./tools.js";
import {
  qualityLevels,
  type QualityCounts,
  type QualityLevel,
} from "./types.js";

export type RecyclingSpec = {
  quality: number;
  recycledQualities: ReadonlyArray<QualityLevel>;
};

export type SimulationSpec = {
  ingredients: number;
  ingredientQuality: QualityLevel;
  recycling: RecyclingSpec;
  modules: Record<QualityLevel, { productivity: number; quality: number }>;
};

export type SimulationResult = {
  iterations: number;
  finalProducts: QualityCounts;
  totalCraftedProducts: QualityCounts;
};

const maxIterations = 100;

export function runSimulation(spec: SimulationSpec): SimulationResult {
  let ingredients: QualityCounts = {
    normal: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  ingredients[spec.ingredientQuality] = spec.ingredients;

  let products: QualityCounts = {
    normal: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  let totalCraftedProducts: QualityCounts = {
    normal: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  let iteration = 1;

  while (iteration <= maxIterations) {
    const crafted = craft(ingredients, spec);
    totalCraftedProducts = add(totalCraftedProducts, crafted);

    const recycled = recycle(crafted, spec.recycling);

    ingredients = recycled.ingredients;
    products = add(products, recycled.remainingProducts);

    const remainingIngredients = total(ingredients);
    if (remainingIngredients < 1) break;

    iteration++;
  }

  return {
    iterations: iteration,
    finalProducts: products,
    totalCraftedProducts,
  };
}

function craft(
  ingredients: QualityCounts,
  spec: SimulationSpec
): QualityCounts {
  return qualityLevels.reduce(
    (products, quality) =>
      add(
        products,
        multiply(
          calculateQualityProbabilities(spec.modules[quality].quality, quality),
          spec.modules[quality].productivity * ingredients[quality]
        )
      ),
    {
      normal: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    } as QualityCounts
  );
}

const recyclingProductivity = 0.25;

function recycle(
  products: QualityCounts,
  spec: RecyclingSpec
): { remainingProducts: QualityCounts; ingredients: QualityCounts } {
  const remainingProducts: QualityCounts = { ...products };
  let ingredients: QualityCounts = {
    normal: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  for (const quality of spec.recycledQualities) {
    const recycled = multiply(
      calculateQualityProbabilities(spec.quality, quality),
      recyclingProductivity * products[quality]
    );
    remainingProducts[quality] = 0;
    ingredients = add(ingredients, recycled);
  }

  return { remainingProducts, ingredients };
}
