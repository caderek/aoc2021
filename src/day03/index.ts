import run from "aocrunner"

const flipArray = (m: number[][]) => m[0].map((x, i) => m.map((x) => x[i]))

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split("").map(Number))
}

const getCommonBits = (input: number[][]) => {
  const flipped = flipArray(input)
  const gammas = []
  const epsilons = []

  for (const column of flipped) {
    const is1common = column.filter((x) => x === 1).length >= column.length / 2

    gammas.push(is1common ? 1 : 0)
    epsilons.push(is1common ? 0 : 1)
  }

  return { epsilons, gammas }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const { gammas, epsilons } = getCommonBits(input)

  const gamma = parseInt(gammas.join(""), 2)
  const epsilon = parseInt(epsilons.join(""), 2)

  return gamma * epsilon
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let oxygenGenRatings = input

  {
    let pos = 0

    while (oxygenGenRatings.length > 1) {
      const { gammas } = getCommonBits(oxygenGenRatings)

      oxygenGenRatings = oxygenGenRatings.filter((x) => gammas[pos] === x[pos])

      pos++
    }
  }

  let co2GenRatings = input

  {
    let pos = 0

    while (co2GenRatings.length > 1) {
      const { gammas } = getCommonBits(co2GenRatings)

      co2GenRatings = co2GenRatings.filter((x) => gammas[pos] !== x[pos])

      pos++
    }
  }

  const oxygenGenRating = parseInt(oxygenGenRatings[0].join(""), 2)
  const co2GenRating = parseInt(co2GenRatings[0].join(""), 2)

  return oxygenGenRating * co2GenRating
}

run({
  part1: {
    tests: [
      {
        input: `
          00100
          11110
          10110
          10111
          10101
          01111
          00111
          11100
          10000
          11001
          00010
          01010
        `,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          00100
          11110
          10110
          10111
          10101
          01111
          00111
          11100
          10000
          11001
          00010
          01010
        `,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
