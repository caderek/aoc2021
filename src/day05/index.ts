import run from "aocrunner"
import { Flat2 } from "../utils/flat.js"

type Coords = [[number, number], [number, number]]

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((entry) => entry.split(",").map(Number)),
    ) as Coords[]

const solve = (rawInput: string, filterFn?: (item: Coords) => boolean) => {
  let input = parseInput(rawInput)

  if (filterFn) {
    input = input.filter(filterFn)
  }

  const size = Math.max(...input.flat(2)) + 1
  const grid = new Flat2(size, size, Int8Array)

  input.forEach(([[fromX, fromY], [toX, toY]]) => {
    const deltaY = fromY === toY ? 0 : fromY > toY ? -1 : 1
    const deltaX = fromX === toX ? 0 : fromX > toX ? -1 : 1

    for (
      let y = fromY, x = fromX;
      (fromY > toY ? y >= toY : y <= toY) &&
      (fromX > toX ? x >= toX : x <= toX);
      y += deltaY, x += deltaX
    ) {
      grid.set(x, y, grid.get(x, y) + 1)
    }
  })

  return grid.data.filter((x) => x > 1).length
}

const part1 = (rawInput: string) => {
  return solve(
    rawInput,
    ([[fromX, fromY], [toX, toY]]) => fromX === toX || fromY === toY,
  )
}

const part2 = (rawInput: string) => {
  return solve(rawInput)
}

const testInput = `
  0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
