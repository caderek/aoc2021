import "./monkey.js"
import A from "@arrows/array"
import { multi, method } from "@arrows/multimethod"
import { pipe, compose, rail, curry } from "@arrows/composition"
import dispatch from "@arrows/dispatch"
import * as math from "mathjs"
import * as R from "ramda"
import graph from "graphlib"
import { isDeepStrictEqual } from "util"
// @ts-ignore
import * as gen from "generatorics"

import crypto from "./crypto.js"
import grid from "./grid.js"
import numSys from "./num-sys.js"
import mod from "./mod.js"

const log = (data: any) => console.dir(data, { colors: true, depth: 99 })
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const equal = curry(isDeepStrictEqual)

const day = process.argv[2]

export {
  A,
  pipe,
  compose,
  rail,
  curry,
  multi,
  method,
  dispatch,
  math,
  R,
  graph,
  log,
  delay,
  equal,
  grid,
  numSys,
  gen,
  crypto,
  mod,
}
