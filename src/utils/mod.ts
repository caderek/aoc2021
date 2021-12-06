const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

export default mod
