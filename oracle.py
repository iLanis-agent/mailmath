import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def sheets(s, e, l):
    if e >= l: return f"The envelope of {dec(e)} g alone reaches the limit of {dec(l)} g, so no sheets fit."
    n = (l-e)//s; left = l-e-n*s
    return f"Under {dec(l)} g with a {dec(e)} g envelope, {pl(n,' sheet',' sheets')} of {dec(s)} g fit, leaving {dec(left)} g."
def batch(n, g):
    t = n*g
    return f"The {pl(n,' piece',' pieces')} at {dec(g)} g weigh {dec(t)} g, or {dec(hu(t,1000))} kg."
def postage(n, r):
    return f"The {pl(n,' piece',' pieces')} at ${dec(r)} cost ${money(n*r)} in postage."
def tray(n, p):
    t = (n+p-1)//p
    return f"The {pl(n,' piece',' pieces')} in trays of {p} takes {pl(t,' tray',' trays')}, leaving {pl(t*p-n,' space',' spaces')} in the last one."
random.seed(757)
R=random.randint
cases = [
 dict(fn="sheets", args=["4.5","6","28"], expect=sheets(450,600,2800)),
 dict(fn="batch", args=["120","28.5"], expect=batch(120,2850)),
 dict(fn="postage", args=["120","0.73"], expect=postage(120,73)),
 dict(fn="tray", args=["120","50"], expect=tray(120,50)),
]
for _ in range(25):
    s,e,l=R(1,100000),R(1,100000),R(1,10000000)
    cases.append(dict(fn="sheets", args=[dec(s),dec(e),dec(l)], expect=sheets(s,e,l)))
for _ in range(25):
    s,e=R(1,2000),R(1,5000); l=e+R(1,100000)
    cases.append(dict(fn="sheets", args=[dec(s),dec(e),dec(l)], expect=sheets(s,e,l)))
for _ in range(20):
    n,g=R(1,1000000),R(1,10000000); cases.append(dict(fn="batch", args=[str(n),dec(g)], expect=batch(n,g)))
for _ in range(15):
    n,r=R(1,1000000),R(1,1000000); cases.append(dict(fn="postage", args=[str(n),dec(r)], expect=postage(n,r)))
for _ in range(15):
    n,p=R(1,1000000),R(1,100000); cases.append(dict(fn="tray", args=[str(n),str(p)], expect=tray(n,p)))
errs=[["sheets",["0","6","28"]],["sheets",["4.5","0","28"]],["sheets",["4.5","6","0"]],["sheets",["4.555","6","28"]],["batch",["0","28.5"]],["batch",["120","0"]],
 ["postage",["0","0.73"]],["postage",["120","0"]],["tray",["0","50"]],["tray",["120","0"]],["postage",["120","0.733"]],["tray",["120","100001"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
