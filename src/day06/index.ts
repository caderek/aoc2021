import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number)

const solve = (days: number) => (rawInput: string) => {
  const input = parseInput(rawInput)
  const fish = new Array(9).fill(0)

  input.forEach((x) => fish[x]++)

  for (let i = 0; i < days; i++) {
    const temp = fish[0]
    fish[0] = fish[1]
    fish[1] = fish[2]
    fish[2] = fish[3]
    fish[3] = fish[4]
    fish[4] = fish[5]
    fish[5] = fish[6]
    fish[6] = fish[7] + temp
    fish[7] = fish[8]
    fish[8] = temp
  }

  return fish.reduce((a, b) => a + b)
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
