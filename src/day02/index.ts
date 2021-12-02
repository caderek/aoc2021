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
  rawInput.split("\n").map((x) => x.split(" "))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let depth = 0
  let horizontal = 0

  for (const [dir, amount] of input) {
    if (dir === "forward") {
      horizontal += Number(amount)
    } else if (dir === "up") {
      depth = Math.max(depth - Number(amount), 0)
    } else {
      depth += Number(amount)
    }
  }

  return depth * horizontal
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let depth = 0
  let aim = 0
  let horizontal = 0

  for (const [dir, amount] of input) {
    if (dir === "forward") {
      horizontal += Number(amount)
      depth += aim * Number(amount)
    } else if (dir === "up") {
      aim -= Number(amount)
    } else {
      aim += Number(amount)
    }
  }

  return depth * horizontal
}

run({
  part1: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
