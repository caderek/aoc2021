import run from "aocrunner"
import mem from "mem"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number)

const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const solve = (days: number) => (rawInput: string) => {
  const input = parseInput(rawInput)
  const unique = [...new Set(input)]

  const startCounts = unique.map((x) => [
    x,
    input.filter((v) => v === x).length,
  ])

  const recur = (fish: number, days: number) => {
    let fishes = 1

    while (days > 0) {
      fish = mod(fish - 1, 7)
      if (fish === 6) {
        fishes += recur(6, days - 3)
      }
      days--
    }

    return fishes
  }

  const count = mem(recur, {
    cacheKey: (arguments_) => arguments_.join(","),
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
  // part2: {
  //   tests: [
  //     {
  //       input: `3,4,3,1,2`,
  //       expected: 26984457539,
  //     },
  //   ],
  //   solution: solve(256),
  // },
  trimTestInputs: true,
  // onlyTests: true,
})
