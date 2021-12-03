interface Array<T> {
  chain(fn: (arg: T[]) => any): any
  tap(fn: (arg: T[]) => any): T[]
}

type Fn = (input: {}) => any

Object.defineProperty(Array.prototype, "chain", {
  value: function (fn: <T>(arr: T[]) => any) {
    return fn(this)
  },
})

Object.defineProperty(Array.prototype, "tap", {
  value: function (fn: <T>(arr: T[]) => T[]) {
    fn(this)
    return this
  },
})

interface String {
  chain(fn: (arg: string) => any): any
  tap(fn: (arg: string) => any): string
}

Object.defineProperty(String.prototype, "chain", {
  value: function (fn: (arg: string) => any) {
    return fn(this)
  },
})

Object.defineProperty(String.prototype, "tap", {
  value: function (fn: (arg: string) => string) {
    fn(this)
    return this
  },
})
