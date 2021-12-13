import run from "aocrunner"
import {
  A,
  pipe,
  compose,
  rail,
  curry,
  multi,
  method,
  dispatch,
  math,
  R,
  graph,
  log,
  delay,
  equal,
  grid,
  numSys,
  gen,
  crypto,
} from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("-"))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const g = new graph.Graph({ directed: true })

  input.forEach(([a, b]) => {
    a === "start" || b === "end"
      ? g.setEdge(a, b)
      : b === "start" || a === "end"
      ? g.setEdge(b, a)
      : g.setEdge(a, b) && g.setEdge(b, a)
  })

  console.log(g.edges())
  console.log(graph.alg.findCycles(g))

  console.log(g.outEdges("start"))

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const testInput = `
  start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: testInput,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
