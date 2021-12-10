import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""))

const pointsChecker: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

const pointsAutocomplete: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

const pairs: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const pairsReverse: { [key: string]: string } = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
}

const opening = Object.values(pairsReverse)
const closing = Object.keys(pairsReverse)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let score = 0

  for (const line of input) {
    const stack = []

    for (const token of line) {
      if (opening.includes(token)) {
        stack.push(token)
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop()
        } else {
          score += pointsChecker[token]
          break
        }
      }
    }
  }

  return score
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let scores = []

  for (const line of input) {
    const stack = []
    let corrupted = false

    for (const token of line) {
      if (opening.includes(token)) {
        stack.push(token)
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop()
        } else {
          corrupted = true
          break
        }
      }
    }

    if (!corrupted) {
      let score = 0

      while (stack.length > 0) {
        const missing = pairs[stack.pop() as string]
        score = score * 5 + pointsAutocomplete[missing]
      }

      scores.push(score)
    }
  }

  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2]
}

const testInput = `
  [({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
