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

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const testInput = ``

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: "",
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
  onlyTests: true,
})
