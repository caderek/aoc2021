import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const [rawDrawn, ...rawBoards] = rawInput.split("\n\n")

  const drawn = rawDrawn.split(",").map(Number)
  const boards = rawBoards.map((rawBoard) =>
    rawBoard.split("\n").map((line) =>
      line
        .split(" ")
        .filter((x) => x.trim().length !== 0)
        .map(Number),
    ),
  )

  return { drawn, boards }
}

const flipArray = (m: number[][]) => m[0].map((x, i) => m.map((x) => x[i]))

const checkIfWinning = (board: number[][], drawn: Set<number>) => {
  return (
    board.some((row) => row.every((item) => drawn.has(item))) ||
    flipArray(board).some((column) => column.every((item) => drawn.has(item)))
  )
}

const part1 = (rawInput: string) => {
  const { drawn, boards } = parseInput(rawInput)

  const drawnTilNow: Set<number> = new Set()
  let winningBoard
  let lastDrawn
  ;(() => {
    for (const num of drawn) {
      drawnTilNow.add(num)

      for (const board of boards) {
        if (checkIfWinning(board, drawnTilNow)) {
          winningBoard = board
          lastDrawn = num
          return
        }
      }
    }
  })()

  const notMarked = winningBoard
    ?.map((row) => row.filter((n) => !drawnTilNow.has(n)))
    .flat()

  return (notMarked?.reduce((a, b) => a + b) ?? 0) * (lastDrawn ?? 0)
}

const part2 = (rawInput: string) => {
  const { drawn, boards } = parseInput(rawInput)

  const drawnTilNow: Set<number> = new Set()
  let winningBoard: number[][] = []
  let lastDrawn
  let remainingBoards = boards
  ;(() => {
    for (const num of drawn) {
      drawnTilNow.add(num)

      remainingBoards = remainingBoards.filter((board) => {
        const isWinning = checkIfWinning(board, drawnTilNow)
        if (isWinning) {
          lastDrawn = num
          winningBoard = board
        }
        return !isWinning
      })

      if (remainingBoards.length === 0) {
        return
      }
    }
  })()

  const notMarked = winningBoard
    ?.map((row) => row.filter((n) => !drawnTilNow.has(n)))
    .flat()

  return (notMarked?.reduce((a, b) => a + b, 0) ?? 0) * (lastDrawn ?? 0)
}

const testInput = `
  7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

  22 13 17 11  0
  8  2 23  4 24
  21  9 14 16  7
  6 10  3 18  5
  1 12 20 15 19

  3 15  0  2 22
  9 18 13 17  5
  19  8  7 25 23
  20 11 10 24  4
  14 21 16 12  6

  14 21 17 24  4
  10 16 15  9 19
  18  8 23 26 20
  22 11 13  6  5
  2  0 12  3  7
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
