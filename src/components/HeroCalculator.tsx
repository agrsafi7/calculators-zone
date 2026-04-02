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

  const showTabs = isMobile;

  const btn = "flex items-center justify-center rounded font-semibold transition-all active:scale-95 select-none border border-border/50";
  const btnNum = `${btn} bg-secondary text-foreground hover:bg-secondary/80 text-[11px] lg:text-sm`;
  const btnOp = `${btn} bg-foreground text-background hover:opacity-90 text-[11px] lg:text-sm`;
  const btnFunc = `${btn} bg-muted text-muted-foreground hover:bg-muted/80 text-[10px] lg:text-xs`;
  const btnEquals = `${btn} bg-primary text-primary-foreground hover:opacity-90 text-sm lg:text-base font-bold`;
  const btnSci = `${btn} bg-secondary/70 text-muted-foreground hover:bg-secondary text-[10px] lg:text-xs`;

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden max-w-full">
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

      <div className="p-2 lg:p-3 space-y-1.5 lg:space-y-2">
        {/* Display */}
        <div className="bg-secondary rounded-lg p-2 lg:p-3 text-right border border-border">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowHistory(!showHistory)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Clock className="w-3.5 h-3.5" />
              </button>
              {memory !== 0 && <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 rounded">M</span>}
            </div>
            {expression && <p className="text-[11px] text-muted-foreground truncate ml-2">{expression}</p>}
          </div>
          <p className="text-2xl font-bold text-foreground truncate">{display}</p>
          {preview && (
            <p className="text-xs text-primary/70 mt-0.5 truncate">= {preview}</p>
          )}
        </div>

        {/* History panel */}
        {showHistory && (
          <div className="bg-secondary/50 rounded-lg border border-border max-h-24 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">No calculations yet</p>
            ) : (
              <>
                <div className="flex items-center justify-between px-3 pt-1.5 pb-0.5">
                  <span className="text-xs font-medium text-muted-foreground">Recent</span>
                  <button onClick={() => setHistory([])} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => { setDisplay(h.result); setExpression(h.result); setShowHistory(false); }}
                    className="w-full text-right px-3 py-1 hover:bg-secondary transition-colors"
                  >
                    <p className="text-[11px] text-muted-foreground truncate">{h.expression}</p>
                    <p className="text-xs font-semibold text-foreground">= {h.result}</p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {/* Scientific mode: horizontal 10-column grid like calculator.net */}
        {mode === "scientific" && (
          <div className="grid grid-cols-10 gap-0.5 lg:gap-1" style={{ gridAutoRows: "minmax(28px, 32px)" }}>
            {/* Row 1: sin cos tan | Deg○ Rad○ | 7 8 9 + Back */}
            <button className={btnSci} onClick={() => handleInput("sin(")}>sin</button>
            <button className={btnSci} onClick={() => handleInput("cos(")}>cos</button>
            <button className={btnSci} onClick={() => handleInput("tan(")}>tan</button>
            <div className="col-span-2 flex items-center justify-center gap-2 text-[11px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle" checked={angleMode === "deg"} onChange={() => setAngleMode("deg")} className="w-3 h-3 accent-primary" />
                <span className={angleMode === "deg" ? "font-bold text-foreground" : "text-muted-foreground"}>Deg</span>
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle" checked={angleMode === "rad"} onChange={() => setAngleMode("rad")} className="w-3 h-3 accent-primary" />
                <span className={angleMode === "rad" ? "font-bold text-foreground" : "text-muted-foreground"}>Rad</span>
              </label>
            </div>
            <button className={btnNum} onClick={() => handleInput("7")}>7</button>
            <button className={btnNum} onClick={() => handleInput("8")}>8</button>
            <button className={btnNum} onClick={() => handleInput("9")}>9</button>
            <button className={btnOp} onClick={() => handleOperator("+")}>+</button>
            <button className={btnFunc} onClick={handleBackspace}>Back</button>

            {/* Row 2: sin⁻¹ cos⁻¹ tan⁻¹ π e | 4 5 6 - Ans */}
            <button className={btnSci} onClick={() => handleInput("asin(")}>sin⁻¹</button>
            <button className={btnSci} onClick={() => handleInput("acos(")}>cos⁻¹</button>
            <button className={btnSci} onClick={() => handleInput("atan(")}>tan⁻¹</button>
            <button className={btnSci} onClick={() => handleInput("π")}>π</button>
            <button className={btnSci} onClick={() => handleInput("e")}>e</button>
            <button className={btnNum} onClick={() => handleInput("4")}>4</button>
            <button className={btnNum} onClick={() => handleInput("5")}>5</button>
            <button className={btnNum} onClick={() => handleInput("6")}>6</button>
            <button className={btnOp} onClick={() => handleOperator("-")}>−</button>
            <button className={btnFunc} onClick={() => handleInput("Ans")}>Ans</button>

            {/* Row 3: xʸ x³ x² eˣ 10ˣ | 1 2 3 × M+ */}
            <button className={btnSci} onClick={() => handleInput("^")}>xʸ</button>
            <button className={btnSci} onClick={() => handleInput("^3")}>x³</button>
            <button className={btnSci} onClick={() => handleInput("^2")}>x²</button>
            <button className={btnSci} onClick={() => handleInput("e^")}>eˣ</button>
            <button className={btnSci} onClick={() => handleInput("10^")}>10ˣ</button>
            <button className={btnNum} onClick={() => handleInput("1")}>1</button>
            <button className={btnNum} onClick={() => handleInput("2")}>2</button>
            <button className={btnNum} onClick={() => handleInput("3")}>3</button>
            <button className={btnOp} onClick={() => handleOperator("×")}>×</button>
            <button className={btnFunc} onClick={handleMemoryAdd}>M+</button>

            {/* Row 4: ʸ√x ³√x √x ln log | 0 . EXP ÷ M- */}
            <button className={btnSci} onClick={() => handleInput("^(1/")}>ʸ√x</button>
            <button className={btnSci} onClick={() => handleInput("^(1/3)")}>³√x</button>
            <button className={btnSci} onClick={() => handleInput("√(")}>√x</button>
            <button className={btnSci} onClick={() => handleInput("ln(")}>ln</button>
            <button className={btnSci} onClick={() => handleInput("log(")}>log</button>
            <button className={btnNum} onClick={() => handleInput("0")}>0</button>
            <button className={btnNum} onClick={() => handleInput(".")}>.</button>
            <button className={btnFunc} onClick={() => handleInput("e")}>EXP</button>
            <button className={btnOp} onClick={() => handleOperator("÷")}>÷</button>
            <button className={btnFunc} onClick={handleMemorySub}>M-</button>

            {/* Row 5: ( ) 1/x % n! | ± RND AC = MR */}
            <button className={btnSci} onClick={() => handleInput("(")}>{"("}</button>
            <button className={btnSci} onClick={() => handleInput(")")}>{")"}</button>
            <button className={btnSci} onClick={() => { const v = parseFloat(display); if (v !== 0) { setDisplay((1/v).toString()); setExpression((1/v).toString()); } }}>1/x</button>
            <button className={btnSci} onClick={() => handleInput("%")}>%</button>
            <button className={btnSci} onClick={() => handleInput("!")}>n!</button>
            <button className={btnFunc} onClick={handleToggleSign}>±</button>
            <button className={btnFunc} onClick={handleRandom}>RND</button>
            <button className={`${btnFunc} text-destructive font-bold`} onClick={handleClear}>AC</button>
            <button className={btnEquals} onClick={handleEquals}>=</button>
            <button className={btnFunc} onClick={handleMemoryRecall}>MR</button>
          </div>
        )}

        {/* Basic mode: compact 4-column grid for mobile */}
        {mode === "basic" && (
          <div className="grid grid-cols-4 gap-1.5">
            <button className={`${btnFunc} h-11 text-destructive font-bold`} onClick={handleClear}>AC</button>
            <button className={`${btnFunc} h-11`} onClick={handleBackspace}>Back</button>
            <button className={`${btnFunc} h-11`} onClick={() => handleInput("%")}>%</button>
            <button className={`${btnOp} h-11`} onClick={() => handleOperator("÷")}>÷</button>

            <button className={`${btnNum} h-11`} onClick={() => handleInput("7")}>7</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("8")}>8</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("9")}>9</button>
            <button className={`${btnOp} h-11`} onClick={() => handleOperator("×")}>×</button>

            <button className={`${btnNum} h-11`} onClick={() => handleInput("4")}>4</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("5")}>5</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("6")}>6</button>
            <button className={`${btnOp} h-11`} onClick={() => handleOperator("-")}>−</button>

            <button className={`${btnNum} h-11`} onClick={() => handleInput("1")}>1</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("2")}>2</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("3")}>3</button>
            <button className={`${btnOp} h-11`} onClick={() => handleOperator("+")}>+</button>

            <button className={`${btnNum} h-11`} onClick={handleToggleSign}>±</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput("0")}>0</button>
            <button className={`${btnNum} h-11`} onClick={() => handleInput(".")}>.</button>
            <button className={`${btnEquals} h-11`} onClick={handleEquals}>=</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCalculator;
