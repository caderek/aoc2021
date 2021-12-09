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

const neighborsWithCoords = (x: number, y: number, grid: Grid) => {
  return [
    grid[y - 1]?.[x] ? { val: grid[y - 1][x], x, y: y - 1 } : undefined,
    grid[y][x + 1] ? { val: grid[y][x + 1], x: x + 1, y } : undefined,
    grid[y + 1]?.[x] ? { val: grid[y + 1][x], x, y: y + 1 } : undefined,
    grid[y][x - 1] ? { val: grid[y][x - 1], x: x - 1, y } : undefined,
  ].filter((n) => n !== undefined) as { val: any; x: number; y: number }[]
}

const height = (grid: Grid) => grid.length
const width = (grid: Grid) => grid[0].length

export default {
  create,
  from,
  neighbors,
  neighborsWithCoords,
  neighborsWithDiagonals,
  width,
  height,
}
