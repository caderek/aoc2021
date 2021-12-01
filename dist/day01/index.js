import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split("\n").map(Number);
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let prev = -Infinity;
  let count = 0;
  for (const item of input) {
    if (item > prev) {
      count++;
    }
    prev = item;
  }
  return count - 1;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const threes = [];
  for (let i = 0; i < input.length; i++) {
    threes.push(input[i] + (input[i + 1] || 0) + (input[i + 2] || 0));
  }
  let prev = -Infinity;
  let count = 0;
  for (const item of threes) {
    if (item > prev) {
      count++;
    }
    prev = item;
  }
  return count - 1;
};
run({
  part1: {
    tests: [
      {
        input: `
          199
          200
          208
          210
          200
          207
          240
          269
          260
          263
        `,
        expected: 7
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
          199
          200
          208
          210
          200
          207
          240
          269
          260
          263
        `,
        expected: 5
      }
    ],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
