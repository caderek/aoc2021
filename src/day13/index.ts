import run from "aocrunner"

type Coords = [number, number][]
type Folds = ["x" | "y", number][]

const parseInput = (rawInput: string) => {
  const [rawCoords, rawFolds] = rawInput.split("\n\n")

  const coords = rawCoords
    .split("\n")
    .map((line) => line.split(",").map(Number)) as Coords

  const folds = rawFolds
    .split("\n")
    .map((line) => line.replace("fold along ", "").split("="))
    .map(([axis, val]) => [axis, Number(val)]) as Folds

  return { coords, folds }
}

const createGrid = (coords: Coords) => {
  const w = Math.max(...coords.map(([x, y]) => x)) + 1
  const h = Math.max(...coords.map(([x, y]) => y)) + 1

  const grid = new Array(h).fill(0).map(() => new Array(w).fill(" "))

  coords.forEach(([x, y]) => {
    grid[y][x] = "#"
  })

  return grid as string[][]
}

const fold = (coords: Coords, folds: Folds) => {
  const folded = coords.map(([x, y]) => {
    folds.forEach(([axis, index]) => {
      if (axis === "y" && y > index) {
        y = index - (y - index)
      } else if (axis === "x" && x > index) {
        x = index - (x - index)
      }
    })

    return [x, y]
  }) as [number, number][]

  return createGrid(folded)
}

const part1 = (rawInput: string) => {
  const { coords, folds } = parseInput(rawInput)

  return fold(coords, folds.slice(0, 1))
    .flat()
    .filter((x) => x !== " ").length
}

const part2 = (rawInput: string) => {
  const { coords, folds } = parseInput(rawInput)

  return fold(coords, folds)
    .map((line) => line.join(""))
    .join("\n")
}

const testInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`

const testPattern = `
#####
#   #
#   #
#   #
#####
`.trim()

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 17,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: testPattern,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
