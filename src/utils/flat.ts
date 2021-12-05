class Flat2 {
  #width
  #height
  #size
  data

  constructor(
    height: number,
    width: number,
    container:
      | ArrayConstructor
      | Uint8ArrayConstructor
      | Uint16ArrayConstructor
      | Uint32ArrayConstructor
      | Int8ArrayConstructor
      | Int16ArrayConstructor
      | Int32ArrayConstructor = Array,
  ) {
    this.#size = width * height
    this.#width = width
    this.#height = height
    this.data = new container(this.#size)
  }

  get(x: number, y: number) {
    return this.data[y * this.#height + x]
  }

  set(x: number, y: number, val: any) {
    this.data[y * this.#height + x] = val
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }
}

class Flat3 {
  #width
  #height
  #depth
  #size
  data

  constructor(
    height: number,
    width: number,
    depth: number,
    container:
      | ArrayConstructor
      | Uint8ArrayConstructor
      | Uint16ArrayConstructor
      | Uint32ArrayConstructor
      | Int8ArrayConstructor
      | Int16ArrayConstructor
      | Int32ArrayConstructor = Array,
  ) {
    this.#size = width * height * depth
    this.#width = width
    this.#height = height
    this.#depth = depth
    this.data = new container(this.#size)
  }

  get(x: number, y: number, z: number) {
    return this.data[z * this.#depth + y * this.#height + x]
  }

  set(x: number, y: number, z: number, val: any) {
    this.data[z * this.#depth + y * this.#height + x] = val
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

  get depth() {
    return this.#depth
  }
}

class Flat {
  #dimensions
  #size
  data

  constructor(
    dimensions: number[],
    container:
      | ArrayConstructor
      | Uint8ArrayConstructor
      | Uint16ArrayConstructor
      | Uint32ArrayConstructor
      | Int8ArrayConstructor
      | Int16ArrayConstructor
      | Int32ArrayConstructor = Array,
  ) {
    this.#size = dimensions.reduce((a, b) => a * b, 1)
    this.#dimensions = dimensions
    this.data = new container(this.#size)
  }

  #pos(coords: number[]) {
    return coords.reduce((a, b, i) => {
      return a + b * (i < coords.length - 1 ? this.#dimensions[i] : 1)
    }, 0)
  }

  get(coords: number[]) {
    return this.data[this.#pos(coords)]
  }

  set(coords: number[], val: any) {
    return (this.data[this.#pos(coords)] = val)
  }

  get dimensions() {
    return [...this.#dimensions]
  }
}

export { Flat2, Flat3, Flat }
