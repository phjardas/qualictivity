# Factorio Quality/Productivity Calculator

This is a simple calculator that simulates crafting with quality and productivity modules in Factorio. It is based on the idea of crafting items with quality and/or productivity modules, and the recycling items of lower quality using recyclers with quality modules. The simulation repeats this process until all simulated input ingredients are used up.

The term "ingredient" refers to the raw materials used to craft one single product. For example, an electronic circuit requires 1 iron plate and 3 copper cables as ingredients, so these are considered "1 ingredient" in the calculations.

## Installation

This tool requires [Node.js](https://nodejs.org/) to run.

Install the tool with `npm install -g qualictivity`.

## Usage

```
qualictivity [options]

Options:
  --version                 Show version number                        [boolean]
  --help                    Show help                                  [boolean]
  --ingredients             The number of ingredients to start with.
                                                       [number] [default: 10000]
  --ingredient-quality      The quality of the base ingredients
  [string] [choices: "normal", "uncommon", "rare", "epic", "legendary"] [default
                                                                     : "normal"]
  --recycling-quality       The quality factor of the recycling process
                                                           [number] [default: 0]
  --recycled-qualities      The qualities of products that are recycled instead
                            of retained
  [array] [choices: "normal", "uncommon", "rare", "epic", "legendary"] [default:
                                                                             []]
  --normal-productivity     The productivity when crafting a normal product
                                                           [number] [default: 1]
  --normal-quality          The quality factor when crafting a normal product
                                                           [number] [default: 0]
  --uncommon-productivity   The productivity when crafting an uncommon product
                                                           [number] [default: 1]
  --uncommon-quality        The quality factor when crafting an uncommon product
                                                           [number] [default: 0]
  --rare-productivity       The productivity when crafting a rare product
                                                           [number] [default: 1]
  --rare-quality            The quality factor when crafting a rare product
                                                           [number] [default: 0]
  --epic-productivity       The productivity when crafting an epic product
                                                           [number] [default: 1]
  --epic-quality            The quality factor when crafting an epic product
                                                           [number] [default: 0]
  --legendary-productivity  The productivity when crafting a legendary product
                                                           [number] [default: 1]
  --legendary-quality       The quality factor when crafting a legendary product
                                                           [number] [default: 0]
  --format                  The output format
                             [string] [choices: "text", "csv"] [default: "text"]
```

## Example

Inspired by [Nilaus' "Crafting with Quality"](https://youtu.be/jJrGHIwfCMQ): Craft with 150% productivity and 31% quality, except for legendary products with 275% productivity and 0% quality. Recycle all normal, uncommon, and rare products with a quality of 24.8%.

```
qualictivity --normal-productivity 1.5 --normal-quality .31 --uncommon-productivity 1.5 --uncommon-quality .31 --rare-productivity 1.5 --rare-quality .31 --epic-productivity 1.5 --epic-quality .31 --legendary-productivity 2.75 --recycling-quality .248 --recycled-qualities normal uncommon rare

The simulation took 8 iterations.

Final products per 1000 ingredients:
epic: 71
legendary: 20

Total crafted products per 1000 ingredients:
normal: 1285 (55%)
uncommon: 737 (31%)
rare: 236 (10%)
epic: 71 (3%)
legendary: 20 (1%)
```

The total crafted products gives you an indication how to scale the production of each tier. In this example, about 55% of your factory buildings should build normal products, 31% should build uncommon products, and so on.
