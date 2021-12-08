import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split(" | ").map((item) => item.split(" ")))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input
    .map(
      ([_, digits]) =>
        digits.filter((x) => [2, 4, 3, 7].includes(x.length)).length,
    )
    .reduce((a, b) => a + b)
}

/*
Segments for each number and relationships between them:

1 - c f            length 2 unique
4 - b c d f        length 4 unique
7 - a c f          length 3 unique
8 - a b c d e f g  length 7 unique

3 - a c d f g      length 5 contains 7
9 - a b c d f g    length 6 contains 4
5 - a b d f g      length 5 contained within 9
6 - a b d e f g    length 6 contains 5
2 - a c d e g      length 5 remaining
0 - a b c e f g    length 6 remaining
*/

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0

  for (const [p, d] of input) {
    const patterns = p.map((pattern) => pattern.split("").sort())
    const digits = d.map((digit) => digit.split("").sort().join(""))
    const indices: number[] = new Array(10)

    indices[1] = patterns.findIndex((p) => p.length === 2)
    indices[4] = patterns.findIndex((p) => p.length === 4)
    indices[7] = patterns.findIndex((p) => p.length === 3)
    indices[8] = patterns.findIndex((p) => p.length === 7)

    indices[3] = patterns.findIndex(
      (p) => p.length === 5 && patterns[indices[7]].every((x) => p.includes(x)),
    )

    indices[9] = patterns.findIndex(
      (p) => p.length === 6 && patterns[indices[4]].every((x) => p.includes(x)),
    )

    indices[5] = patterns.findIndex(
      (p, i) =>
        p.length === 5 &&
        p.every((x) => patterns[indices[9]].includes(x)) &&
        !indices.includes(i),
    )

    indices[2] = patterns.findIndex(
      (p, i) => p.length === 5 && !indices.includes(i),
    )

    indices[6] = patterns.findIndex(
      (p, i) =>
        p.length === 6 &&
        patterns[indices[5]].every((x) => p.includes(x)) &&
        !indices.includes(i),
    )

    indices[0] = patterns.findIndex(
      (p, i) => p.length === 6 && !indices.includes(i),
    )

    const deciphered = indices.map((index) => patterns[index].join(""))

    sum += Number(
      digits.map((digit) => deciphered.findIndex((x) => x === digit)).join(""),
    )
  }

  return sum
}

const testInput = `
  be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
  edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
  fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
  fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
  aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
  fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
  dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
  bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
  egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
  gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
