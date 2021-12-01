import "./monkey.js";
import A from "@arrows/array";
import { multi, method } from "@arrows/multimethod";
import { pipe, compose, rail, curry } from "@arrows/composition";
import dispatch from "@arrows/dispatch";
import * as math from "mathjs";
import * as R from "ramda";
import * as graph from "graphlib";
import { isDeepStrictEqual } from "util";
import * as gen from "generatorics";
import crypto from "./crypto.js";
import grid from "./grid.js";
import numSys from "./num-sys.js";
const log = (data) => console.dir(data, { colors: true, depth: 99 });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const equal = curry(isDeepStrictEqual);
const day = process.argv[2];
export {
  A,
  R,
  compose,
  crypto,
  curry,
  delay,
  dispatch,
  equal,
  gen,
  graph,
  grid,
  log,
  math,
  method,
  multi,
  numSys,
  pipe,
  rail
};
//# sourceMappingURL=index.js.map
