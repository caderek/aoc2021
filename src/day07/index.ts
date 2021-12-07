import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split(",")
    .map(Number)
    .sort((a, b) => a - b)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const n = input.length

  const median =
    n % 2 != 0
      ? input[n / 2]
      : (input[Math.floor((n - 1) / 2)] + input[n / 2]) / 2

  return input.map((x) => Math.abs(x - median)).reduce((a, b) => a + b)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const min = input[0]
  const max = input[input.length - 1]

  let minFuelUsage = Infinity

  for (let i = min; i <= max; i++) {
    const fuelUsage = input
      .map((x) => {
        const n = Math.abs(x - i)
        return (n * (n + 1)) / 2
      })
      .reduce((a, b) => a + b)

    minFuelUsage = fuelUsage < minFuelUsage ? fuelUsage : minFuelUsage
  }

  return minFuelUsage
}

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})