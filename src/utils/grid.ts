const create = (w?: number, h?: number, fill: any = null) => {
  const grid = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => fill),
  )

  return Object.assign(grid, {
    width: w,
    height: h,
  })
}

type Grid = any[][]
type Mapper = (definition: string) => Grid

const from = (definition: string, mapper?: Mapper) => {
  const grid = mapper
    ? mapper(definition)
    : definition.split("\n").map((line) => line.split(""))

  return Object.assign(grid, {
    height: grid.length,
    width: grid[0].length,
  })
}

const neighborsWithDiagonals = (x: number, y: number, grid: Grid) => {
  return [
    grid[y - 1]?.[x],
    grid[y - 1]?.[x + 1],
    grid[y][x + 1],
    grid[y + 1]?.[x + 1],
    grid[y + 1]?.[x],
    grid[y + 1]?.[x - 1],
    grid[y][x - 1],
    grid[y - 1]?.[x - 1],
  ].filter((n) => n !== undefined)
}

const neighbors = (x: number, y: number, grid: Grid) => {
  return [
    grid[y - 1]?.[x],
    grid[y][x + 1],
    grid[y + 1]?.[x],
    grid[y][x - 1],
  ].filter((n) => n !== undefined)
}

export default {
  create,
  from,
  neighbors,
  neighborsWithDiagonals,
}
