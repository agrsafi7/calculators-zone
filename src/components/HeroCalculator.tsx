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
  const btnNum = `${btn} bg-secondary text-foreground hover:bg-secondary/80`;
  const btnOp = `${btn} bg-foreground text-background hover:opacity-90`;
  const btnFunc = `${btn} bg-muted text-muted-foreground hover:bg-muted/80`;
  const btnEquals = `${btn} bg-primary text-primary-foreground hover:opacity-90 font-bold`;
  const btnSci = `${btn} bg-secondary/70 text-muted-foreground hover:bg-secondary`;

  // Display section (shared)
  const displaySection = (
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
      <p className="text-xl lg:text-2xl font-bold text-foreground truncate">{display}</p>
      {preview && (
        <p className="text-xs text-primary/70 mt-0.5 truncate">= {preview}</p>
      )}
    </div>
  );

  const historyPanel = showHistory && (
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
  );

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
        {displaySection}
        {historyPanel}

        {/* DESKTOP: Scientific mode - horizontal 10-column grid */}
        {mode === "scientific" && !isMobile && (
          <div className="grid grid-cols-10 gap-0.5 lg:gap-1" style={{ gridAutoRows: "minmax(28px, 32px)" }}>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("sin(")}>sin</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("cos(")}>cos</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("tan(")}>tan</button>
            <div className="col-span-2 flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-[11px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle" checked={angleMode === "deg"} onChange={() => setAngleMode("deg")} className="w-2.5 h-2.5 lg:w-3 lg:h-3 accent-primary" />
                <span className={angleMode === "deg" ? "font-bold text-foreground" : "text-muted-foreground"}>Deg</span>
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle" checked={angleMode === "rad"} onChange={() => setAngleMode("rad")} className="w-2.5 h-2.5 lg:w-3 lg:h-3 accent-primary" />
                <span className={angleMode === "rad" ? "font-bold text-foreground" : "text-muted-foreground"}>Rad</span>
              </label>
            </div>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("7")}>7</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("8")}>8</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("9")}>9</button>
            <button className={`${btnOp} text-[11px] lg:text-sm`} onClick={() => handleOperator("+")}>+</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleBackspace}>Back</button>

            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("asin(")}>sin⁻¹</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("acos(")}>cos⁻¹</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("atan(")}>tan⁻¹</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("π")}>π</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("e")}>e</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("4")}>4</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("5")}>5</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("6")}>6</button>
            <button className={`${btnOp} text-[11px] lg:text-sm`} onClick={() => handleOperator("-")}>−</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={() => handleInput("Ans")}>Ans</button>

            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("^")}>xʸ</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("^3")}>x³</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("^2")}>x²</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("e^")}>eˣ</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("10^")}>10ˣ</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("1")}>1</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("2")}>2</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("3")}>3</button>
            <button className={`${btnOp} text-[11px] lg:text-sm`} onClick={() => handleOperator("×")}>×</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleMemoryAdd}>M+</button>

            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("^(1/")}>ʸ√x</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("^(1/3)")}>³√x</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("√(")}>√x</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("ln(")}>ln</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("log(")}>log</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput("0")}>0</button>
            <button className={`${btnNum} text-[11px] lg:text-sm`} onClick={() => handleInput(".")}>.</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={() => handleInput("e")}>EXP</button>
            <button className={`${btnOp} text-[11px] lg:text-sm`} onClick={() => handleOperator("÷")}>÷</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleMemorySub}>M-</button>

            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("(")}>{"("}</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput(")")}>{")"}</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => { const v = parseFloat(display); if (v !== 0) { setDisplay((1/v).toString()); setExpression((1/v).toString()); } }}>1/x</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("%")}>%</button>
            <button className={`${btnSci} text-[10px] lg:text-xs`} onClick={() => handleInput("!")}>n!</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleToggleSign}>±</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleRandom}>RND</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs text-destructive font-bold`} onClick={handleClear}>AC</button>
            <button className={`${btnEquals} text-sm lg:text-base`} onClick={handleEquals}>=</button>
            <button className={`${btnFunc} text-[10px] lg:text-xs`} onClick={handleMemoryRecall}>MR</button>
          </div>
        )}

        {/* MOBILE: Scientific mode - portrait 5-column grid */}
        {mode === "scientific" && isMobile && (
          <div className="grid grid-cols-5 gap-1" style={{ gridAutoRows: "minmax(36px, 40px)" }}>
            {/* Row 1: Deg/Rad toggle + scientific functions */}
            <div className="col-span-2 flex items-center justify-center gap-1.5 text-[10px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle-m" checked={angleMode === "deg"} onChange={() => setAngleMode("deg")} className="w-2.5 h-2.5 accent-primary" />
                <span className={angleMode === "deg" ? "font-bold text-foreground" : "text-muted-foreground"}>Deg</span>
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input type="radio" name="angle-m" checked={angleMode === "rad"} onChange={() => setAngleMode("rad")} className="w-2.5 h-2.5 accent-primary" />
                <span className={angleMode === "rad" ? "font-bold text-foreground" : "text-muted-foreground"}>Rad</span>
              </label>
            </div>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("sin(")}>sin</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("cos(")}>cos</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("tan(")}>tan</button>

            {/* Row 2 */}
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("asin(")}>sin⁻¹</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("acos(")}>cos⁻¹</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("atan(")}>tan⁻¹</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("ln(")}>ln</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("log(")}>log</button>

            {/* Row 3 */}
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("^")}>xʸ</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("^2")}>x²</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("√(")}>√x</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("π")}>π</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("e")}>e</button>

            {/* Row 4 */}
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("(")}>{"("}</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput(")")}>{")"}</button>
            <button className={`${btnSci} text-[10px]`} onClick={() => handleInput("!")}>n!</button>
            <button className={`${btnFunc} text-[10px]`} onClick={handleMemoryAdd}>M+</button>
            <button className={`${btnFunc} text-[10px]`} onClick={handleMemorySub}>M-</button>

            {/* Row 5: AC Back % ÷ MR */}
            <button className={`${btnFunc} text-[11px] text-destructive font-bold`} onClick={handleClear}>AC</button>
            <button className={`${btnFunc} text-[11px]`} onClick={handleBackspace}>Back</button>
            <button className={`${btnFunc} text-[11px]`} onClick={() => handleInput("%")}>%</button>
            <button className={`${btnOp} text-[11px]`} onClick={() => handleOperator("÷")}>÷</button>
            <button className={`${btnFunc} text-[10px]`} onClick={handleMemoryRecall}>MR</button>

            {/* Row 6: 7 8 9 × */}
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("7")}>7</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("8")}>8</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("9")}>9</button>
            <button className={`${btnOp} text-sm`} onClick={() => handleOperator("×")}>×</button>
            <button className={`${btnFunc} text-[10px]`} onClick={() => handleInput("Ans")}>Ans</button>

            {/* Row 7: 4 5 6 - */}
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("4")}>4</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("5")}>5</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("6")}>6</button>
            <button className={`${btnOp} text-sm`} onClick={() => handleOperator("-")}>−</button>
            <button className={`${btnFunc} text-[10px]`} onClick={handleToggleSign}>±</button>

            {/* Row 8: 1 2 3 + */}
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("1")}>1</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("2")}>2</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput("3")}>3</button>
            <button className={`${btnOp} text-sm`} onClick={() => handleOperator("+")}>+</button>
            <button className={`${btnFunc} text-[10px]`} onClick={handleRandom}>RND</button>

            {/* Row 9: 0 . = */}
            <button className={`${btnNum} text-sm col-span-2`} onClick={() => handleInput("0")}>0</button>
            <button className={`${btnNum} text-sm`} onClick={() => handleInput(".")}>.</button>
            <button className={`${btnEquals} text-base col-span-2`} onClick={handleEquals}>=</button>
          </div>
        )}

        {/* Basic mode: compact 4-column grid for mobile */}
        {mode === "basic" && (
          <div className="grid grid-cols-4 gap-1.5">
            <button className={`${btnFunc} h-11 text-destructive font-bold text-sm`} onClick={handleClear}>AC</button>
            <button className={`${btnFunc} h-11 text-sm`} onClick={handleBackspace}>Back</button>
            <button className={`${btnFunc} h-11 text-sm`} onClick={() => handleInput("%")}>%</button>
            <button className={`${btnOp} h-11 text-sm`} onClick={() => handleOperator("÷")}>÷</button>

            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("7")}>7</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("8")}>8</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("9")}>9</button>
            <button className={`${btnOp} h-11 text-sm`} onClick={() => handleOperator("×")}>×</button>

            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("4")}>4</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("5")}>5</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("6")}>6</button>
            <button className={`${btnOp} h-11 text-sm`} onClick={() => handleOperator("-")}>−</button>

            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("1")}>1</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("2")}>2</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("3")}>3</button>
            <button className={`${btnOp} h-11 text-sm`} onClick={() => handleOperator("+")}>+</button>

            <button className={`${btnNum} h-11 text-sm`} onClick={handleToggleSign}>±</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput("0")}>0</button>
            <button className={`${btnNum} h-11 text-sm`} onClick={() => handleInput(".")}>.</button>
            <button className={`${btnEquals} h-11 text-base`} onClick={handleEquals}>=</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCalculator;
