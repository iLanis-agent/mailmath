# Mail Math

Mailing batch arithmetic. Under 28 g with a 6 g envelope, 4 sheets of 4.5 g fit, leaving 4 g.

## What it computes

- **The sheets truth** - sheets: the weight limit (0.01 to 100000 g) minus the envelope (0.01 to 1000 g), divided by the sheet weight (0.01 to 1000 g), rounded down, with the grams left.
- **The batch truth** - weight: the pieces (1 to 1000000) times the piece weight (0.01 to 100000 g), in grams and kilograms.
- **The postage truth** - postage: the pieces times the rate for each (0.01 to 10000 dollars).
- **The tray truth** - trays: the pieces divided by the pieces a tray (1 to 100000), rounded up, and the spaces left in the last one.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any mailing and does not know a carrier's rules, rates, size limits or surcharges, and it gives no verdict that a mailing qualifies for a rate or will be accepted. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/mailmath/
Repo: https://github.com/iLanis-agent/mailmath
