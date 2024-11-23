import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  runSimulation,
  type SimulationResult,
  type SimulationSpec,
} from "./simulation.js";
import { total } from "./tools.js";
import { type QualityLevel, qualityLevels } from "./types.js";

const args = await yargs(hideBin(process.argv))
  .version(process.env.npm_package_version as string)
  .help()
  .option("ingredients", {
    describe: "The number of ingredients to start with.",
    type: "number",
    default: 10000,
  })
  .option("ingredient-quality", {
    describe: "The quality of the base ingredients",
    type: "string",
    choices: qualityLevels,
    default: "normal" as QualityLevel,
  })
  .option("recycling-quality", {
    describe: "The quality factor of the recycling process",
    type: "number",
    default: 0,
  })
  .option("recycled-qualities", {
    describe: "The qualities of products that are recycled instead of retained",
    type: "array",
    choices: qualityLevels,
    default: [],
  })
  .option("normal-productivity", {
    describe: "The productivity when crafting a normal product",
    type: "number",
    default: 1,
  })
  .option("normal-quality", {
    describe: "The quality factor when crafting a normal product",
    type: "number",
    default: 0,
  })
  .option("uncommon-productivity", {
    describe: "The productivity when crafting an uncommon product",
    type: "number",
    default: 1,
  })
  .option("uncommon-quality", {
    describe: "The quality factor when crafting an uncommon product",
    type: "number",
    default: 0,
  })
  .option("rare-productivity", {
    describe: "The productivity when crafting a rare product",
    type: "number",
    default: 1,
  })
  .option("rare-quality", {
    describe: "The quality factor when crafting a rare product",
    type: "number",
    default: 0,
  })
  .option("epic-productivity", {
    describe: "The productivity when crafting an epic product",
    type: "number",
    default: 1,
  })
  .option("epic-quality", {
    describe: "The quality factor when crafting an epic product",
    type: "number",
    default: 0,
  })
  .option("legendary-productivity", {
    describe: "The productivity when crafting a legendary product",
    type: "number",
    default: 1,
  })
  .option("legendary-quality", {
    describe: "The quality factor when crafting a legendary product",
    type: "number",
    default: 0,
  })
  .option("format", {
    describe: "The output format",
    type: "string",
    choices: ["text", "csv"],
    default: "text",
  }).argv;

const spec: SimulationSpec = {
  ingredients: args.ingredients,
  ingredientQuality: args.ingredientQuality,
  recycling: {
    quality: args.recyclingQuality,
    recycledQualities: args.recycledQualities,
  },
  modules: {
    normal: {
      productivity: args.normalProductivity,
      quality: args.normalQuality,
    },
    uncommon: {
      productivity: args.uncommonProductivity,
      quality: args.uncommonQuality,
    },
    rare: {
      productivity: args.rareProductivity,
      quality: args.rareQuality,
    },
    epic: {
      productivity: args.epicProductivity,
      quality: args.epicQuality,
    },
    legendary: {
      productivity: args.legendaryProductivity,
      quality: args.legendaryQuality,
    },
  },
};

const result = runSimulation(spec);
renderResult(result, args.format);

function renderResult(result: SimulationResult, format: string) {
  switch (format) {
    case "text":
      return renderText(result);
    case "csv":
      return renderCSV(result);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

function renderText(result: SimulationResult) {
  const out: Array<string> = [];
  out.push(`The simulation took ${result.iterations} iterations.`);

  out.push("");
  out.push("Final products per 1000 ingredients:");
  for (const quality of qualityLevels) {
    if (result.finalProducts[quality]) {
      out.push(
        `${quality}: ${Math.round((result.finalProducts[quality] / spec.ingredients) * 1000)}`
      );
    }
  }

  out.push("");
  out.push("Total crafted products per 1000 ingredients:");
  for (const quality of qualityLevels) {
    const totalCrafted = total(result.totalCraftedProducts);

    if (result.totalCraftedProducts[quality]) {
      out.push(
        `${quality}: ${Math.round((result.totalCraftedProducts[quality] / spec.ingredients) * 1000)} (${Math.round((result.totalCraftedProducts[quality] / totalCrafted) * 100)}%)`
      );
    }
  }

  console.log(out.join("\n"));
}

function renderCSV(result: SimulationResult) {
  const out: Array<string> = [];
  for (const quality of qualityLevels) {
    out.push(
      Math.round(
        (result.finalProducts[quality] / spec.ingredients) * 1000
      ).toString()
    );
  }

  for (const quality of qualityLevels) {
    out.push(
      Math.round(
        (result.totalCraftedProducts[quality] / spec.ingredients) * 1000
      ).toString()
    );
  }

  console.log(out.join(","));
}
