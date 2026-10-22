const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { sheets: sheetsTruth, batch: batchTruth, postage: postageTruth, tray: trayTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the sheet weight must be from 0.01 to 1000 g with at most two decimal places",
  "the envelope weight must be from 0.01 to 1000 g with at most two decimal places",
  "the weight limit must be from 0.01 to 100000 g with at most two decimal places",
  "the piece count must be from 1 to 1000000 with no decimal places",
  "the piece weight must be from 0.01 to 100000 g with at most two decimal places",
  "the pieces a tray must be from 1 to 100000 with no decimal places",
  "the rate must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
