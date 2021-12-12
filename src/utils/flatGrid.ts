const dirs2D = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
]
const dirs2DWithDiagonals = [...dirs2D, [1, 1], [1, -1], [-1, 1], [-1, -1]]

class Grid2D {
  #width
  #height
  #size
  data

  constructor(height: number, width: number, initialData?: any[]) {
    this.#size = width * height
    this.#width = width
    this.#height = height
    this.data = initialData ? initialData : new Array(width * height).fill(0)
  }

  get(x: number, y: number) {
    return x < 0 || y < 0 || x >= this.#width || y >= this.#height
      ? undefined
      : this.data[y * this.#height + x]
  }

  set(x: number, y: number, val: any) {
    if (x < 0 || y < 0 || x >= this.#width || y >= this.#height) {
      return
    }

    this.data[y * this.#height + x] = val
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

  get size() {
    return this.#size
  }

  update(mappingFn: (v: any, x: number, y: number) => any) {
    this.data.forEach((v, i) => {
      const y = Math.floor(i / this.#width)
      const x = i - y * this.#width
      this.data[i] = mappingFn(v, x, y)
    })

    return this
  }

  forEach(mappingFn: (v: any, x: number, y: number) => void) {
    this.data.forEach((v, i) => {
      const y = Math.floor(i / this.#width)
      const x = i - y * this.#width
      mappingFn(v, x, y)
    })

    return this
  }

  map(mappingFn: (v: any, x: number, y: number) => any) {
    const data = this.data.map((v, i) => {
      const y = Math.floor(i / this.#width)
      const x = i - y * this.#width
      this.data[i] = mappingFn(v, x, y)
    })

    return new Grid2D(this.#height, this.#width, data)
  }

  neighbors(x: number, y: number, diagonals = false) {
    const dirs = diagonals ? dirs2DWithDiagonals : dirs2D
    const neighbors = []

    for (const [dX, dY] of dirs) {
      const val = this.get(x + dX, y + dY)

      if (val !== undefined) {
        neighbors.push(val)
      }
    }

    return neighbors
  }

  neighborsWithCoords(x: number, y: number, diagonals = false) {
    const dirs = diagonals ? dirs2DWithDiagonals : dirs2D
    const neighbors = []

    for (const [dX, dY] of dirs) {
      const val = this.get(x + dX, y + dY)

      if (val !== undefined) {
        neighbors.push({ val, x: x + dX, y: y + dY })
      }
    }

    return neighbors
  }
}

export { Grid2D }
