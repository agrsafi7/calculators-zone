import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Clock, Trash2 } from "lucide-react";

type Mode = "basic" | "scientific";

interface HistoryEntry {
  expression: string;
  result: string;
}

const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

const safeEvaluate = (expr: string, angleMode: "deg" | "rad", lastAnswer: string): string | null => {
  try {
    let e = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, String(Math.PI))
      .replace(/e(?![x])/g, String(Math.E))
      .replace(/Ans/g, lastAnswer);

    const toRad = angleMode === "deg" ? (v: number) => (v * Math.PI) / 180 : (v: number) => v;
    const fromRad = angleMode === "deg" ? (v: number) => (v * 180) / Math.PI : (v: number) => v;

    e = e
      .replace(/asin\(([^)]+)\)/g, (_, v) => String(fromRad(Math.asin(parseFloat(v)))))
      .replace(/acos\(([^)]+)\)/g, (_, v) => String(fromRad(Math.acos(parseFloat(v)))))
      .replace(/atan\(([^)]+)\)/g, (_, v) => String(fromRad(Math.atan(parseFloat(v)))));

    e = e
      .replace(/sin\(([^)]+)\)/g, (_, v) => String(Math.sin(toRad(parseFloat(v)))))
      .replace(/cos\(([^)]+)\)/g, (_, v) => String(Math.cos(toRad(parseFloat(v)))))
      .replace(/tan\(([^)]+)\)/g, (_, v) => String(Math.tan(toRad(parseFloat(v)))))
      .replace(/√\(([^)]+)\)/g, (_, v) => String(Math.sqrt(parseFloat(v))))
      .replace(/log\(([^)]+)\)/g, (_, v) => String(Math.log10(parseFloat(v))))
      .replace(/ln\(([^)]+)\)/g, (_, v) => String(Math.log(parseFloat(v))))
      .replace(/(\d+)!/g, (_, v) => String(factorial(parseInt(v))));

    e = e.replace(/\^/g, "**");

    // Check if expression is complete enough to evaluate
    const openParens = (e.match(/\(/g) || []).length;
    const closeParens = (e.match(/\)/g) || []).length;
    if (openParens > closeParens) return null;

    // Don't evaluate if ends with an operator
    if (/[+\-*/%]$/.test(e.trim())) return null;

    const result = new Function("return " + e)();
    if (!Number.isFinite(result)) return null;
    return parseFloat(result.toFixed(10)).toString();
  } catch {
    return null;
  }
};

const HeroCalculator = () => {
  const [mode, setMode] = useState<Mode>("basic");
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("0");
  const [inv, setInv] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Real-time preview calculation
  const preview = useMemo(() => {
    if (!expression || expression === display) return null;
    const result = safeEvaluate(expression, angleMode, lastAnswer);
    if (result && result !== expression && result !== display) return result;
    return null;
  }, [expression, angleMode, lastAnswer, display]);

  const handleInput = useCallback((val: string) => {
    if (display === "0" && val !== "." && !"sincostanlogln√".includes(val[0])) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
    setExpression(prev => prev + val);
  }, [display]);

  const handleOperator = useCallback((op: string) => {
    setDisplay(op);
    setExpression(prev => prev + op);
  }, []);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setExpression("");
  }, []);

  const handleBackspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
    setExpression(prev => prev.slice(0, -1));
  }, [display]);

  const handleEquals = useCallback(() => {
    const result = safeEvaluate(expression, angleMode, lastAnswer);
    if (result) {
      setHistory(prev => [{ expression, result }, ...prev].slice(0, 10));
      setLastAnswer(result);
      setDisplay(result);
      setExpression(result);
    } else {
      setDisplay("Error");
      setExpression("");
    }
  }, [expression, angleMode, lastAnswer]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      if (/^[0-9]$/.test(key)) { handleInput(key); e.preventDefault(); }
      else if (key === ".") { handleInput("."); e.preventDefault(); }
      else if (key === "+") { handleOperator("+"); e.preventDefault(); }
      else if (key === "-") { handleOperator("-"); e.preventDefault(); }
      else if (key === "*") { handleOperator("×"); e.preventDefault(); }
      else if (key === "/") { handleOperator("÷"); e.preventDefault(); }
      else if (key === "%") { handleInput("%"); e.preventDefault(); }
      else if (key === "(") { handleInput("("); e.preventDefault(); }
      else if (key === ")") { handleInput(")"); e.preventDefault(); }
      else if (key === "Enter" || key === "=") { handleEquals(); e.preventDefault(); }
      else if (key === "Backspace") { handleBackspace(); e.preventDefault(); }
      else if (key === "Escape" || key === "c" || key === "C") { handleClear(); e.preventDefault(); }
      else if (key === "^") { handleInput("^"); e.preventDefault(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, handleOperator, handleEquals, handleBackspace, handleClear]);

  // Swipe gesture for mode switching
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 60) {
      if (deltaX < 0) { setMode("scientific"); }
      else { setMode("basic"); setInv(false); }
    }
  }, []);

  const btn = "flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 select-none";
  const btnNum = `${btn} bg-[hsl(var(--muted))] text-foreground hover:brightness-125 h-10 text-sm`;
  const btnOp = `${btn} bg-[hsl(220,25%,25%)] text-[hsl(220,60%,75%)] hover:brightness-125 h-10 text-sm`;
  const btnEquals = `${btn} bg-[hsl(210,60%,78%)] text-[hsl(220,30%,15%)] hover:brightness-110 h-10 text-base font-bold`;
  const btnSci = `${btn} bg-[hsl(var(--muted))] text-muted-foreground hover:brightness-125 h-9 text-xs`;
  const btnSciActive = `${btn} bg-primary/20 text-primary hover:brightness-125 h-9 text-xs`;

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => { setMode("basic"); setInv(false); }}
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            mode === "basic"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setMode("scientific")}
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            mode === "scientific"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          Scientific
        </button>
      </div>

      <div className="p-3 space-y-2">
        {/* Display */}
        <div className="bg-secondary rounded-lg p-3 text-right border border-border">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Clock className="w-4 h-4" />
            </button>
            {expression && <p className="text-[11px] text-muted-foreground truncate ml-2">{expression}</p>}
          </div>
          <p className="text-2xl font-bold text-foreground truncate">{display}</p>
          {/* Real-time preview */}
          {preview && (
            <p className="text-sm text-primary/70 mt-0.5 truncate">= {preview}</p>
          )}
        </div>

        {/* History panel */}
        {showHistory && (
          <div className="bg-secondary/50 rounded-lg border border-border max-h-28 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-3">No calculations yet</p>
            ) : (
              <>
                <div className="flex items-center justify-between px-3 pt-2 pb-1">
                  <span className="text-xs font-medium text-muted-foreground">Recent</span>
                  <button onClick={() => setHistory([])} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => { setDisplay(h.result); setExpression(h.result); setShowHistory(false); }}
                    className="w-full text-right px-3 py-1.5 hover:bg-secondary transition-colors"
                  >
                    <p className="text-xs text-muted-foreground truncate">{h.expression}</p>
                    <p className="text-sm font-semibold text-foreground">= {h.result}</p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {/* Scientific buttons */}
        {mode === "scientific" && (
          <div className="space-y-1.5">
            <div className="grid grid-cols-4 gap-1.5">
              <button
                className={`${btn} col-span-2 h-12 text-sm rounded-2xl bg-[hsl(var(--muted))]`}
                onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
              >
                <span className={`px-3 py-1 rounded-xl ${angleMode === "deg" ? "text-primary font-bold" : "text-muted-foreground"}`}>Deg</span>
                <span className="text-border mx-1">|</span>
                <span className={`px-3 py-1 rounded-xl ${angleMode === "rad" ? "text-primary font-bold" : "text-muted-foreground"}`}>Rad</span>
              </button>
              <button className={btnSci} onClick={() => handleInput("!")}>x!</button>
              <button className={inv ? btnSciActive : btnSci} onClick={() => setInv(!inv)}>Inv</button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button className={btnSci} onClick={() => handleInput(inv ? "asin(" : "sin(")}>{inv ? "sin⁻¹" : "sin"}</button>
              <button className={btnSci} onClick={() => handleInput("ln(")}>ln</button>
              <button className={btnSci} onClick={() => handleInput("π")}>π</button>
              <button className={btnSci} onClick={() => handleInput(inv ? "acos(" : "cos(")}>{inv ? "cos⁻¹" : "cos"}</button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("log(")}>log</button>
              <button className={btnSci} onClick={() => handleInput("e")}>e</button>
              <button className={btnSci} onClick={() => handleInput(inv ? "atan(" : "tan(")}>{inv ? "tan⁻¹" : "tan"}</button>
              <button className={btnSci} onClick={() => handleInput("√(")}>√</button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("Ans")}>Ans</button>
              <button className={btnSci} onClick={() => handleInput("e")}>EXP</button>
              <button className={btnSci} onClick={() => handleInput("^")}>xʸ</button>
              <button className={btnEquals} onClick={handleEquals}>=</button>
            </div>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-4 gap-1.5">
          <button className={btnOp} onClick={() => handleInput("(")}>{"("}</button>
          <button className={btnOp} onClick={() => handleInput(")")}>{")"}</button>
          <button className={btnOp} onClick={() => handleInput("%")}>%</button>
          <button className={btnOp} onClick={handleClear}>AC</button>

          {["7", "8", "9"].map(n => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("÷")}>÷</button>

          {["4", "5", "6"].map(n => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("×")}>×</button>

          {["1", "2", "3"].map(n => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("-")}>−</button>

          <button className={btnNum} onClick={() => handleInput("0")}>0</button>
          <button className={btnNum} onClick={() => handleInput(".")}>.</button>
          <button className={btnEquals} onClick={handleEquals}>=</button>
          <button className={btnOp} onClick={() => handleOperator("+")}>+</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCalculator;
