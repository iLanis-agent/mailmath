// Mail Math engine: the sheets an envelope takes under a weight limit, the weight of a batch, the postage of a batch, and the trays it fills. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the scale and the rate sheet.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _SG = "the sheet weight must be from 0.01 to 1000 g with at most two decimal places";
var _EG = "the envelope weight must be from 0.01 to 1000 g with at most two decimal places";
var _LG = "the weight limit must be from 0.01 to 100000 g with at most two decimal places";
var _NP = "the piece count must be from 1 to 1000000 with no decimal places";
var _PG = "the piece weight must be from 0.01 to 100000 g with at most two decimal places";
var _PER = "the pieces a tray must be from 1 to 100000 with no decimal places";
var _PRICE = "the rate must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function sheetsTruth(sheetg, envg, limitg) {
  var s = _p(sheetg, _SG, 4, 2, 1, 100000), e = _p(envg, _EG, 4, 2, 1, 100000), l = _p(limitg, _LG, 6, 2, 1, 10000000);
  if (e >= l) return "The envelope of " + _dec(e, 2) + " g alone reaches the limit of " + _dec(l, 2) + " g, so no sheets fit.";
  var n = Math.floor((l - e) / s), left = l - e - n * s;
  return "Under " + _dec(l, 2) + " g with a " + _dec(e, 2) + " g envelope, " + _pl(n, " sheet", " sheets") + " of " + _dec(s, 2) + " g fit, leaving " + _dec(left, 2) + " g.";
}
function batchTruth(pieces, pieceg) {
  var n = _i(pieces, _NP, 7, 1, 1000000), g = _p(pieceg, _PG, 6, 2, 1, 10000000);
  var t = n * g;
  return "The " + _pl(n, " piece", " pieces") + " at " + _dec(g, 2) + " g weigh " + _dec(t, 2) + " g, or " + _dec(_hu(t, 1000), 2) + " kg.";
}
function postageTruth(pieces, rate) {
  var n = _i(pieces, _NP, 7, 1, 1000000), r = _p(rate, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(n, " piece", " pieces") + " at $" + _dec(r, 2) + " cost $" + _money(n * r) + " in postage.";
}
function trayTruth(pieces, per) {
  var n = _i(pieces, _NP, 7, 1, 1000000), p = _i(per, _PER, 6, 1, 100000);
  var t = Math.floor((n + p - 1) / p), spare = t * p - n;
  return "The " + _pl(n, " piece", " pieces") + " in trays of " + p + " takes " + _pl(t, " tray", " trays") + ", leaving " + _pl(spare, " space", " spaces") + " in the last one.";
}
