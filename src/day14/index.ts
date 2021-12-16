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

const parseInput = (rawInput: string) => {
  const [rawPolymer, rawPairs] = rawInput.split("\n\n")

  const polymer = R.aperture(2, [...rawPolymer]).map((x) => x.join(""))

  const pairs = Object.fromEntries(
    rawPairs.split("\n").map((line) => line.split(" -> ")),
  )

  return { pairs, polymer }
}

const part1 = (rawInput: string) => {
  const { pairs, polymer } = parseInput(rawInput)

  log({ pairs, polymer })

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const testInput = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 1588,
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
