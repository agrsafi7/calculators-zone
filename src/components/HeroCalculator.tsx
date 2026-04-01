import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Clock, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

    const openParens = (e.match(/\(/g) || []).length;
    const closeParens = (e.match(/\)/g) || []).length;
    if (openParens > closeParens) return null;
    if (/[+\-*/%]$/.test(e.trim())) return null;

    const result = new Function("return " + e)();
    if (!Number.isFinite(result)) return null;
    return parseFloat(result.toFixed(10)).toString();
  } catch {
    return null;
  }
};

const HeroCalculator = () => {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<Mode>("scientific");
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("0");
  const [inv, setInv] = useState(false);
  const [memory, setMemory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Set default mode based on screen size
  useEffect(() => {
    setMode(isMobile ? "basic" : "scientific");
  }, [isMobile]);

  const preview = useMemo(() => {
    if (!expression || expression === display) return null;
    const result = safeEvaluate(expression, angleMode, lastAnswer);
    if (result && result !== expression && result !== display) return result;
    return null;
  }, [expression, angleMode, lastAnswer, display]);

  const handleInput = useCallback((val: string) => {
    if (display === "0" && val !== "." && !"sincostanlogln√(".includes(val[0])) {
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

  const handleMemoryAdd = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) setMemory(prev => prev + val);
  }, [display]);

  const handleMemorySub = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) setMemory(prev => prev - val);
  }, [display]);

  const handleMemoryRecall = useCallback(() => {
    const memStr = memory.toString();
    setDisplay(memStr);
    setExpression(prev => prev + memStr);
  }, [memory]);

  const handleToggleSign = useCallback(() => {
    const current = expression || display;
    if (current.startsWith("-")) {
      setExpression(current.slice(1));
      setDisplay(display.startsWith("-") ? display.slice(1) : display);
    } else {
      setExpression("-" + current);
      setDisplay("-" + display);
    }
  }, [expression, display]);

  const handleRandom = useCallback(() => {
    const r = Math.random().toFixed(6);
    setDisplay(r);
    setExpression(prev => prev + r);
  }, []);

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

  // On desktop, don't show basic/scientific tabs - always scientific
  const showTabs = isMobile;

  const btn = "flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 select-none";
  const btnNum = `${btn} bg-secondary text-foreground hover:bg-secondary/80 h-12 text-sm`;
  const btnOp = `${btn} bg-foreground text-background hover:opacity-90 h-12 text-sm`;
  const btnFunc = `${btn} bg-muted text-muted-foreground hover:bg-muted/80 h-12 text-xs`;
  const btnEquals = `${btn} bg-primary text-primary-foreground hover:opacity-90 h-12 text-base font-bold`;
  const btnSci = `${btn} bg-secondary text-muted-foreground hover:bg-secondary/80 h-9 text-xs`;

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Tabs - only on mobile */}
      {showTabs && (
        <div className="flex">
          <button
            onClick={() => { setMode("basic"); setInv(false); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
              mode === "basic"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setMode("scientific")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
              mode === "scientific"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Scientific
          </button>
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Display */}
        <div className="bg-secondary rounded-xl p-4 text-right border border-border">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowHistory(!showHistory)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Clock className="w-4 h-4" />
              </button>
              {memory !== 0 && <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 rounded">M</span>}
            </div>
            {expression && <p className="text-xs text-muted-foreground truncate ml-2">{expression}</p>}
          </div>
          <p className="text-3xl font-bold text-foreground truncate">{display}</p>
          {preview && (
            <p className="text-sm text-primary/70 mt-1 truncate">= {preview}</p>
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
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-1.5">
              <button className={btnSci} onClick={() => handleInput(inv ? "asin(" : "sin(")}>{inv ? "sin⁻¹" : "sin"}</button>
              <button className={btnSci} onClick={() => handleInput(inv ? "acos(" : "cos(")}>{inv ? "cos⁻¹" : "cos"}</button>
              <button className={btnSci} onClick={() => handleInput(inv ? "atan(" : "tan(")}>{inv ? "tan⁻¹" : "tan"}</button>
              {/* Deg/Rad toggle */}
              <div className="col-span-2 flex h-9 rounded-xl bg-muted border border-border overflow-hidden">
                <button
                  onClick={() => setAngleMode("deg")}
                  className={`flex-1 text-xs font-bold transition-all ${
                    angleMode === "deg"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Deg
                </button>
                <button
                  onClick={() => setAngleMode("rad")}
                  className={`flex-1 text-xs font-bold transition-all ${
                    angleMode === "rad"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Rad
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("asin(")}>sin⁻¹</button>
              <button className={btnSci} onClick={() => handleInput("acos(")}>cos⁻¹</button>
              <button className={btnSci} onClick={() => handleInput("atan(")}>tan⁻¹</button>
              <button className={btnSci} onClick={() => handleInput("π")}>π</button>
              <button className={btnSci} onClick={() => handleInput("e")}>e</button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("^")}>xʸ</button>
              <button className={btnSci} onClick={() => handleInput("^3")}>x³</button>
              <button className={btnSci} onClick={() => handleInput("^2")}>x²</button>
              <button className={btnSci} onClick={() => handleInput("e^")}>eˣ</button>
              <button className={btnSci} onClick={() => handleInput("10^")}>10ˣ</button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("^(1/")}>ʸ√x</button>
              <button className={btnSci} onClick={() => handleInput("^(1/3)")}>³√x</button>
              <button className={btnSci} onClick={() => handleInput("√(")}>√x</button>
              <button className={btnSci} onClick={() => handleInput("ln(")}>ln</button>
              <button className={btnSci} onClick={() => handleInput("log(")}>log</button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              <button className={btnSci} onClick={() => handleInput("(")}>{"("}</button>
              <button className={btnSci} onClick={() => handleInput(")")}>{")"}</button>
              <button className={btnSci} onClick={() => { const v = parseFloat(display); if (v !== 0) { setDisplay((1/v).toString()); setExpression((1/v).toString()); } }}>1/x</button>
              <button className={btnSci} onClick={() => handleInput("%")}>%</button>
              <button className={btnSci} onClick={() => handleInput("!")}>n!</button>
            </div>
          </div>
        )}

        {/* Main grid — 6 columns */}
        <div className="grid grid-cols-6 gap-1.5">
          {/* Row 1 */}
          <button className={btnNum} onClick={() => handleInput("7")}>7</button>
          <button className={btnNum} onClick={() => handleInput("8")}>8</button>
          <button className={btnNum} onClick={() => handleInput("9")}>9</button>
          <button className={btnOp} onClick={() => handleOperator("+")}>+</button>
          <button className={btnFunc} onClick={handleBackspace}>Back</button>
          <button className={btnFunc} onClick={() => handleInput("Ans")}>Ans</button>

          {/* Row 2 */}
          <button className={btnNum} onClick={() => handleInput("4")}>4</button>
          <button className={btnNum} onClick={() => handleInput("5")}>5</button>
          <button className={btnNum} onClick={() => handleInput("6")}>6</button>
          <button className={btnOp} onClick={() => handleOperator("-")}>−</button>
          <button className={btnFunc} onClick={() => handleInput("(")}>{"("}</button>
          <button className={btnFunc} onClick={() => handleInput(")")}>{")"}</button>

          {/* Row 3 */}
          <button className={btnNum} onClick={() => handleInput("1")}>1</button>
          <button className={btnNum} onClick={() => handleInput("2")}>2</button>
          <button className={btnNum} onClick={() => handleInput("3")}>3</button>
          <button className={btnOp} onClick={() => handleOperator("×")}>×</button>
          <button className={btnFunc} onClick={handleMemoryAdd}>M+</button>
          <button className={btnFunc} onClick={handleMemorySub}>M-</button>

          {/* Row 4 */}
          <button className={btnNum} onClick={() => handleInput("0")}>0</button>
          <button className={btnNum} onClick={() => handleInput(".")}>.</button>
          <button className={btnFunc} onClick={() => handleInput("e")}>EXP</button>
          <button className={btnOp} onClick={() => handleOperator("÷")}>÷</button>
          <button className={btnFunc} onClick={handleMemoryRecall}>MR</button>
          <button className={btnFunc} onClick={() => setMemory(0)}>MC</button>

          {/* Row 5 */}
          <button className={btnFunc} onClick={handleToggleSign}>±</button>
          <button className={btnFunc} onClick={handleRandom}>RND</button>
          <button className={`${btnFunc} text-destructive font-bold`} onClick={handleClear}>AC</button>
          <button className={`${btnEquals} col-span-2`} onClick={handleEquals}>=</button>
          <button className={btnFunc} onClick={() => handleInput("%")}>%</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCalculator;
