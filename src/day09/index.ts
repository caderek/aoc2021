import run from "aocrunner"
import { graph, grid } from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let riskLevelSum = 0
  const w = grid.width(input)
  const h = grid.height(input)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const item = input[y][x]
      const neighbors = grid.neighbors(x, y, input)

      if (neighbors.every((n) => n > item)) {
        riskLevelSum += 1 + item
      }
    }
  }

  return riskLevelSum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const g = new graph.Graph({ directed: false })

  for (let y = 0; y < grid.height(input); y++) {
    for (let x = 0; x < grid.width(input); x++) {
      const item = input[y][x]

      if (item !== 9) {
        grid
          .neighborsWithCoords(x, y, input)
          .filter(({ val }) => val !== 9)
          .forEach((item) => {
            if (item.val !== 9) {
              g.setEdge(`${x}:${y}`, `${item.x}:${item.y}`)
            }
          })
      }
    }
  }

  return graph.alg
    .components(g)
    .map((x) => x.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b)
}

const testInput = `
  2199943210
  3987894921
  9856789892
  8767896789
  9899965678
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
