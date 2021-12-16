import run from "aocrunner"
import { Grid2D } from "../utils/flatGrid.js"
import { graph } from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number))

const calculateRisk = (input: number[][]) => {
  const h = input.length
  const w = h

  const grid = new Grid2D(h, w, input.flat())
  const g = new graph.Graph({ directed: true })

  grid.forEach((_, xx, yy) => {
    grid.neighborsWithCoords(xx, yy).forEach(({ val, x, y }) => {
      g.setEdge(`${xx}:${yy}`, `${x}:${y}`, val)
    })
  })

  const paths = graph.alg.dijkstra(g, "0:0", (e) => g.edge(e))

  return paths[`${w - 1}:${h - 1}`].distance
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return calculateRisk(input)
}

const add = (x: number) => (line: number[]) =>
  line.map((n: number) => (n + x > 9 ? (n + x) % 9 : n + x))

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => [
    ...line,
    ...add(1)(line),
    ...add(2)(line),
    ...add(3)(line),
    ...add(4)(line),
  ])

  const data = [
    ...input,
    ...input.map(add(1)),
    ...input.map(add(2)),
    ...input.map(add(3)),
    ...input.map(add(4)),
  ]

  return calculateRisk(data)
}

const testInput = `
  1163751742
  1381373672
  2136511328
  3694931569
  7463417111
  1319128137
  1359912421
  3125421639
  1293138521
  2311944581
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 315,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
