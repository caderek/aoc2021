const numSys = (symbols: string | any[]) => {
  symbols = Array.isArray(symbols) ? symbols : symbols.split("")

  const radix = symbols.length
  const values = Object.fromEntries(symbols.map((x, i) => [x, i]))

  return (num: string | any[]) => {
    let x = (Array.isArray(num) ? num : num.split("")).reduce(
      (sum, next, i) => sum + values[next] * radix ** (num.length - i - 1),
      0,
    )

    const pub = {
      increment() {
        x++
        return pub
      },
      getRaw() {
        const digits = []
        let temp = x
        let pos = 0

        while (temp !== 0) {
          const digit = (temp % radix ** (pos + 1)) / radix ** pos
          digits.unshift(digit)
          temp -= digit * radix ** pos
          pos++
        }

        return digits
      },
      get() {
        return pub
          .getRaw()
          .map((x) => symbols[x])
          .join("")
      },
    }

    return pub
  }
}

export default numSys
