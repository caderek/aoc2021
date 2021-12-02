import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(" "))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let depth = 0
  let horizontal = 0

  for (const [dir, amount] of input) {
    const x = Number(amount)

    if (dir === "forward") {
      horizontal += x
    } else if (dir === "up") {
      depth = Math.max(depth - x, 0)
    } else {
      depth += x
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
    const x = Number(amount)

    if (dir === "forward") {
      horizontal += x
      depth += aim * x
    } else if (dir === "up") {
      aim -= x
    } else {
      aim += x
    }
  }

  return depth * horizontal
}

run({
  part1: {
    tests: [
      {
        input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
        `,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
        `,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
