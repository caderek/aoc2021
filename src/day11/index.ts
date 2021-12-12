import run from "aocrunner"
import { Grid2D } from "../utils/flatGrid.js"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split("").map(Number))
    .flat()

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const size = 10
  const grid = new Grid2D(size, size, input)

  let flashes = 0

  for (let i = 0; i < 100; i++) {
    const flashed = new Set()
    grid.update((v: number) => v + 1)

    let finished = false

    while (!finished) {
      finished = true
      grid.forEach((v: number, x: number, y: number) => {
        const id = `${x}:${y}`

        if (v > 9 && !flashed.has(id)) {
          finished = false
          flashed.add(id)

          grid.neighborsWithCoords(x, y, true).forEach(({ val, x, y }) => {
            grid.set(x, y, val + 1)
          })
        }
      })
    }

    flashes += flashed.size

    grid.update((v) => (v > 9 ? 0 : v))
  }

  return flashes
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const size = 10
  const grid = new Grid2D(size, size, input)

  let steps = 1

  while (true) {
    const flashed = new Set()
    grid.update((v: number) => v + 1)

    let finished = false

    while (!finished) {
      finished = true
      grid.forEach((v: number, x: number, y: number) => {
        const id = `${x}:${y}`

        if (v > 9 && !flashed.has(id)) {
          finished = false
          flashed.add(id)

          grid.neighborsWithCoords(x, y, true).forEach(({ val, x, y }) => {
            grid.set(x, y, val + 1)
          })
        }
      })
    }

    if (flashed.size === 100) {
      return steps
    }

    grid.update((v) => (v > 9 ? 0 : v))
    steps++
  }
}

const testInput = `
  5483143223
  2745854711
  5264556173
  6141336146
  6357385478
  4167524645
  2176841721
  6882881134
  4846848554
  5283751526
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
