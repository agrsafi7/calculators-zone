import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Calculator, Delete, Equal, History, Trash2 } from "lucide-react";

// Scientific Engine — the working scientific calculator from the approved
// homepage design. Logic ported 1:1 from the design's reference script.
const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

const evalSafe = (exp: string): number => {
  // eslint-disable-next-line no-new-func
  return Function('"use strict";return (' + exp + ')')();
};

type KeyDef = { key: string; label: ReactNode; kind: "fn" | "num" | "op" | "clear" };

// Scientific function keys — grouped together, separate from the numpad
const SCI_FN_KEYS: KeyDef[] = [
  { key: "sin", label: "sin", kind: "fn" },
  { key: "cos", label: "cos", kind: "fn" },
  { key: "tan", label: "tan", kind: "fn" },
  { key: "pi", label: "π", kind: "fn" },
  { key: "e", label: "e", kind: "fn" },
  { key: "asin", label: <span>sin<sup>−1</sup></span>, kind: "fn" },
  { key: "acos", label: <span>cos<sup>−1</sup></span>, kind: "fn" },
  { key: "atan", label: <span>tan<sup>−1</sup></span>, kind: "fn" },
  { key: "pow", label: <span>x<sup>y</sup></span>, kind: "fn" },
  { key: "sq", label: <span>x<sup>2</sup></span>, kind: "fn" },
  { key: "ln", label: "ln", kind: "fn" },
  { key: "log", label: "log", kind: "fn" },
  { key: "sqrt", label: "√x", kind: "fn" },
  { key: "(", label: "(", kind: "fn" },
  { key: ")", label: ")", kind: "fn" },
  { key: "recip", label: "1/x", kind: "fn" },
  { key: "fact", label: "n!", kind: "fn" },
  { key: "mod", label: "%", kind: "fn" },
  { key: "sign", label: "±", kind: "fn" },
  { key: "clear", label: "AC", kind: "clear" },
];

// Scientific numpad — numbers always in one sequence
const SCI_NUM_KEYS: KeyDef[] = [
  { key: "7", label: "7", kind: "num" },
  { key: "8", label: "8", kind: "num" },
  { key: "9", label: "9", kind: "num" },
  { key: "/", label: "÷", kind: "op" },
  { key: "4", label: "4", kind: "num" },
  { key: "5", label: "5", kind: "num" },
  { key: "6", label: "6", kind: "num" },
  { key: "*", label: "×", kind: "op" },
  { key: "1", label: "1", kind: "num" },
  { key: "2", label: "2", kind: "num" },
  { key: "3", label: "3", kind: "num" },
  { key: "-", label: "−", kind: "op" },
  { key: "0", label: "0", kind: "num" },
  { key: ".", label: ".", kind: "num" },
  { key: "del", label: <Delete size={18} />, kind: "fn" },
  { key: "+", label: "+", kind: "op" },
];

const BASIC_KEYS: KeyDef[] = [
  { key: "clear", label: "AC", kind: "clear" },
  { key: "sign", label: "±", kind: "fn" },
  { key: "mod", label: "%", kind: "fn" },
  { key: "/", label: "÷", kind: "op" },
  { key: "7", label: "7", kind: "num" },
  { key: "8", label: "8", kind: "num" },
  { key: "9", label: "9", kind: "num" },
  { key: "*", label: "×", kind: "op" },
  { key: "4", label: "4", kind: "num" },
  { key: "5", label: "5", kind: "num" },
  { key: "6", label: "6", kind: "num" },
  { key: "-", label: "−", kind: "op" },
  { key: "1", label: "1", kind: "num" },
  { key: "2", label: "2", kind: "num" },
  { key: "3", label: "3", kind: "num" },
  { key: "+", label: "+", kind: "op" },
  { key: "0", label: "0", kind: "num" },
  { key: ".", label: ".", kind: "num" },
  { key: "del", label: <Delete size={18} />, kind: "fn" },
];

const keyClass = (kind: KeyDef["kind"]) => {
  switch (kind) {
    case "num":
      return "bg-surface hover:bg-surface-container text-ink font-numeric text-[15px] font-semibold";
    case "op":
      return "bg-surface-high hover:bg-surface-highest text-primary font-display text-[18px] font-semibold";
    case "clear":
      return "bg-destructive hover:opacity-90 text-destructive-foreground font-semibold text-[13px]";
    default:
      return "bg-surface-low hover:bg-surface-container text-ink text-[13px] font-medium";
  }
};

const ScientificEngine = () => {
  const [mode, setMode] = useState<"basic" | "scientific">("basic");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState("");
  const [isResultShown, setIsResultShown] = useState(false);
  const [useRad, setUseRad] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState<{ expr: string; result: string }[]>([]);
  // Load stored history after mount so the server render and the first client
  // render match (avoids hydration mismatches).
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("calc-history") || "[]");
      if (Array.isArray(stored) && stored.length > 0) setHistoryList(stored.slice(0, 20));
    } catch {
      // ignore
    }
  }, []);

  const pushHistory = (expr: string, result: string) => {
    setHistoryList((prev) => {
      const next = [{ expr, result }, ...prev].slice(0, 20);
      try {
        localStorage.setItem("calc-history", JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  const clearHistory = () => {
    setHistoryList([]);
    try {
      localStorage.removeItem("calc-history");
    } catch { /* ignore */ }
  };

  const angleMult = () => (useRad ? 1 : Math.PI / 180);

  const applyUnary = (fn: (x: number) => number, label?: string) => {
    try {
      const val = evalSafe(expression || "0");
      const res = Number(fn(val).toFixed(8)).toString();
      if (label) pushHistory(`${label}(${expression || "0"})`, res);
      setExpression(res);
      setIsResultShown(true);
    } catch {
      setExpression("Error");
      setIsResultShown(true);
    }
  };

  const press = (key: string) => {
    let expr = expression;
    let resultShown = isResultShown;
    if (resultShown && !["+", "-", "*", "/", "pow", "mod"].includes(key)) {
      expr = "";
      resultShown = false;
    }
    let hist = history;

    switch (key) {
      case "clear":
        expr = ""; hist = ""; resultShown = false;
        break;
      case "del":
        expr = expr.slice(0, -1);
        break;
      case "=": {
        if (!expr) break;
        try {
          hist = expr + " =";
          const sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/");
          const result = evalSafe(sanitized);
          if (typeof result === "number" && !isNaN(result)) {
            const resStr = Number(result.toFixed(8)).toString();
            pushHistory(expr, resStr);
            expr = resStr;
            resultShown = true;
          } else {
            expr = "Error";
            resultShown = true;
          }
        } catch {
          expr = "Error";
          resultShown = true;
        }
        break;
      }
      case "sin": case "cos": case "tan": {
        const fn = key === "sin" ? Math.sin : key === "cos" ? Math.cos : Math.tan;
        try {
          const val = evalSafe(expr || "0");
          const resStr = Number(fn(val * angleMult()).toFixed(8)).toString();
          pushHistory(`${key}(${(expr || "0")})`, resStr);
          expr = resStr;
          resultShown = true;
        } catch { expr = "Error"; }
        break;
      }
      case "asin": case "acos": case "atan": {
        const fn = key === "asin" ? Math.asin : key === "acos" ? Math.acos : Math.atan;
        try {
          const val = evalSafe(expr || "0");
          const resRad = fn(val);
          const res = useRad ? resRad : (resRad * 180) / Math.PI;
          const resStr = Number(res.toFixed(8)).toString();
          pushHistory(`${key}(${(expr || "0")})`, resStr);
          expr = resStr;
          resultShown = true;
        } catch { expr = "Error"; }
        break;
      }
      case "ln": applyUnary(Math.log, "ln"); return;
      case "log": applyUnary(Math.log10, "log"); return;
      case "sqrt": applyUnary(Math.sqrt, "√"); return;
      case "sq": applyUnary((x) => x * x, "sqr"); return;
      case "recip": applyUnary((x) => 1 / x, "1/"); return;
      case "fact": applyUnary(factorial, "fact"); return;
      case "pi": expr += Math.PI.toFixed(6); break;
      case "e": expr += Math.E.toFixed(6); break;
      case "sign":
        if (expr.startsWith("-")) expr = expr.slice(1);
        else if (expr) expr = "-" + expr;
        break;
      case "pow": expr += "**"; break;
      case "mod": expr += "%"; break;
      default: expr += key; break;
    }
    setExpression(expr);
    setHistory(hist);
    setIsResultShown(resultShown);
  };

  const renderKey = (k: KeyDef, spanZero = false) => (
    <button
      key={k.key}
      type="button"
      onClick={() => press(k.key)}
      className={`${keyClass(k.kind)} py-2 rounded transition-colors flex items-center justify-center ${spanZero && k.key === "0" ? "col-span-2" : ""}`}
      aria-label={k.key}
    >
      {k.label}
    </button>
  );

  return (
    <div className="bg-surface-lowest rounded-xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between pb-1 mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Calculator size={20} className="text-primary" />
          <span className="font-display text-[15px] font-semibold text-ink">
            {mode === "basic" ? "Basic Calculator" : "Scientific Engine"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-low rounded-lg p-0.5" role="tablist" aria-label="Calculator mode">
            {(["basic", "scientific"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors ${
                  mode === m ? "bg-primary text-white shadow-sm" : "text-ink-soft hover:text-ink"
                }`}
              >
                {m === "basic" ? "Basic" : "Scientific"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            aria-label="Calculation history"
            title="History"
            className={`p-1.5 rounded-lg transition-colors ${showHistory ? "bg-primary text-white" : "bg-surface-low text-ink-soft hover:text-ink"}`}
          >
            <History size={16} />
          </button>
          {mode === "scientific" && (
            <div className="flex items-center gap-2 bg-surface-low px-2 py-1 rounded">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio" name="angle_unit" value="deg" checked={!useRad}
              onChange={() => setUseRad(false)} className="accent-primary w-3.5 h-3.5"
            />
            <span className="text-[11px] text-ink">Deg</span>
          </label>
          <span className="text-[10px] opacity-40">|</span>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio" name="angle_unit" value="rad" checked={useRad}
              onChange={() => setUseRad(true)} className="accent-primary w-3.5 h-3.5"
            />
            <span className="text-[11px] text-ink-soft">Rad</span>
          </label>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface-highest rounded-lg p-3 mb-3 flex flex-col justify-end text-right">
        <div className="font-numeric text-[12px] text-ink-soft h-5 overflow-hidden whitespace-nowrap">{history}</div>
        <div className="font-numeric text-[26px] font-semibold text-ink tracking-tight overflow-x-auto whitespace-nowrap">
          {expression || "0"}
        </div>
      </div>

      {showHistory && (
        <div className="bg-surface-low rounded-lg p-3 mb-3 max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-ink">History</span>
            {historyList.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="flex items-center gap-1 text-[11px] text-ink-soft hover:text-destructive transition-colors"
              >
                <Trash2 size={12} /> Clear
              </button>
            )}
          </div>
          {historyList.length === 0 ? (
            <p className="text-[12px] text-ink-soft text-center py-2">No calculations yet</p>
          ) : (
            <ul className="space-y-1">
              {historyList.map((h, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => { setExpression(h.result); setIsResultShown(true); setShowHistory(false); }}
                    className="w-full text-right font-numeric text-[13px] px-2 py-1 rounded hover:bg-surface-container transition-colors"
                  >
                    <span className="text-ink-soft">{h.expr} = </span>
                    <span className="text-ink font-semibold">{h.result}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {mode === "basic" ? (
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 select-none">
          {BASIC_KEYS.map((k) => renderKey(k, true))}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 select-none">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1">
            {SCI_FN_KEYS.map((k) => renderKey(k))}
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sm:w-[38%]">
            {SCI_NUM_KEYS.map((k) => renderKey(k))}
          </div>
        </div>
      )}

      <div className="mt-2 pt-1 flex justify-end">
        <button
          type="button"
          onClick={() => press("=")}
          className="w-full sm:w-1/3 bg-primary hover:bg-tealbright text-white font-display text-[18px] font-semibold py-2 rounded flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Calculate Result</span>
          <Equal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ScientificEngine;
