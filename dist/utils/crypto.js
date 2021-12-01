const egcd = (a, b) => {
  let x = 1n;
  let y = 0n;
  let r = 0n;
  let s = 1n;
  while (b !== 0n) {
    let c = a % b;
    let q = a / b;
    a = b;
    b = c;
    let rPrim = r;
    let sPrim = s;
    r = x - q * r;
    s = y - q * s;
    x = rPrim;
    y = sPrim;
  }
  return { a, x, y };
};
const mod = (a, b) => {
  const x = a % b;
  return x < 0n ? x + b : x;
};
const crt = (congruences) => {
  return mod(congruences.map(([modulus, remainder]) => {
    const N = congruences.filter(([currBus]) => currBus !== modulus).reduce((acc, [modulus2]) => acc * modulus2, 1n);
    return remainder * N * egcd(N, modulus).x;
  }).reduce((a, b) => a + b), congruences.reduce((acc, [modulus]) => acc * modulus, 1n));
};
var crypto_default = { egcd, mod, crt };
export {
  crypto_default as default
};
//# sourceMappingURL=crypto.js.map
