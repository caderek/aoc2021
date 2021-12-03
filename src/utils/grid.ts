const create = (w?: number, h?: number, fill: any = null) => {
  return new Array(h).fill(null).map(() => new Array(w).fill(fill))
}

type Grid = any[][]
type Mapper = (definition: string) => Grid

const from = (definition: string, mapper?: Mapper) => {
  return mapper
    ? mapper(definition)
    : definition.split("\n").map((line) => line.split(""))
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

const grid = create(5, 5, 0)
