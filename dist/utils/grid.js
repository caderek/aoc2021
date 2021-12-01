const create = (w, h, fill = null) => {
  const grid = Array.from({ length: h }, () => Array.from({ length: w }, () => fill));
  return Object.assign(grid, {
    width: w,
    height: h
  });
};
const from = (definition, mapper) => {
  const grid = mapper ? mapper(definition) : definition.split("\n").map((line) => line.split(""));
  return Object.assign(grid, {
    height: grid.length,
    width: grid[0].length
  });
};
const neighborsWithDiagonals = (x, y, grid) => {
  var _a, _b, _c, _d, _e, _f;
  return [
    (_a = grid[y - 1]) == null ? void 0 : _a[x],
    (_b = grid[y - 1]) == null ? void 0 : _b[x + 1],
    grid[y][x + 1],
    (_c = grid[y + 1]) == null ? void 0 : _c[x + 1],
    (_d = grid[y + 1]) == null ? void 0 : _d[x],
    (_e = grid[y + 1]) == null ? void 0 : _e[x - 1],
    grid[y][x - 1],
    (_f = grid[y - 1]) == null ? void 0 : _f[x - 1]
  ].filter((n) => n !== void 0);
};
const neighbors = (x, y, grid) => {
  var _a, _b;
  return [
    (_a = grid[y - 1]) == null ? void 0 : _a[x],
    grid[y][x + 1],
    (_b = grid[y + 1]) == null ? void 0 : _b[x],
    grid[y][x - 1]
  ].filter((n) => n !== void 0);
};
var grid_default = {
  create,
  from,
  neighbors,
  neighborsWithDiagonals
};
export {
  grid_default as default
};
//# sourceMappingURL=grid.js.map
