import run from "aocrunner"
import mem from "mem"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number)

const solve = (days: number) => (rawInput: string) => {
  const input = parseInput(rawInput)
  const unique = [...new Set(input)]

  const startCounts = unique.map((x) => [
    x,
    input.filter((v) => v === x).length,
  ])

  const recur = (fish: number, days: number) => {
    let counter = 1

    days = days - fish

    while (days > 0) {
      counter += recur(6, days - 3)
      days -= 7
    }

    return counter
  }

  const count = mem(recur, {
    cacheKey: (args) => args.join(","),
  })

  return startCounts
    .map(([fish, num]) => count(fish, days) * num)
    .reduce((a, b) => a + b)
}

run({
  part1: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 5934,
      },
    ],
    solution: solve(80),
  },
  part2: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 26984457539,
      },
    ],
    solution: solve(256),
  },
  trimTestInputs: true,
  // onlyTests: true,
})
