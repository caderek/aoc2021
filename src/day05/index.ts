import run from "aocrunner"

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

  const grid: number[][] = []

  input.forEach(([[fromX, fromY], [toX, toY]]) => {
    const deltaY = fromY === toY ? 0 : fromY > toY ? -1 : 1
    const deltaX = fromX === toX ? 0 : fromX > toX ? -1 : 1

    const condY =
      fromY > toY ? (y: number) => y >= toY : (y: number) => y <= toY

    const condX =
      fromX > toX ? (x: number) => x >= toX : (x: number) => x <= toX

    for (
      let y = fromY, x = fromX;
      condY(y) && condX(x);
      y += deltaY, x += deltaX
    ) {
      if (!grid[y]) {
        grid[y] = []
      }

      grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1
    }
  })

  return grid.flat().filter((x) => x > 1).length
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

run({
  part1: {
    tests: [
      {
        input: `
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
      `,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
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
      `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
