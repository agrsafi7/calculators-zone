import { useState } from "react";

type Mode = "basic" | "scientific";

const HeroCalculator = () => {
  const [mode, setMode] = useState<Mode>("basic");
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");

  const handleInput = (val: string) => {
    if (display === "0" && val !== ".") {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
    setExpression(expression + val);
  };

  const handleOperator = (op: string) => {
    setDisplay(op);
    setExpression(expression + op);
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
    setExpression(expression.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      let expr = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![x])/g, String(Math.E));

      if (mode === "scientific") {
        const toRad = angleMode === "deg" ? (v: number) => (v * Math.PI) / 180 : (v: number) => v;
        expr = expr
          .replace(/sin\(([^)]+)\)/g, (_, v) => String(Math.sin(toRad(parseFloat(v)))))
          .replace(/cos\(([^)]+)\)/g, (_, v) => String(Math.cos(toRad(parseFloat(v)))))
          .replace(/tan\(([^)]+)\)/g, (_, v) => String(Math.tan(toRad(parseFloat(v)))))
          .replace(/√\(([^)]+)\)/g, (_, v) => String(Math.sqrt(parseFloat(v))))
          .replace(/log\(([^)]+)\)/g, (_, v) => String(Math.log10(parseFloat(v))))
          .replace(/ln\(([^)]+)\)/g, (_, v) => String(Math.log(parseFloat(v))));
      }

      const result = new Function("return " + expr)();
      const formatted = Number.isFinite(result)
        ? parseFloat(result.toFixed(10)).toString()
        : "Error";
      setDisplay(formatted);
      setExpression(formatted);
    } catch {
      setDisplay("Error");
      setExpression("");
    }
  };

  const btnBase = "flex items-center justify-center rounded-lg font-semibold text-sm transition-colors active:scale-95 select-none";
  const btnNum = `${btnBase} bg-card border border-border text-foreground hover:bg-secondary h-10`;
  const btnOp = `${btnBase} bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 h-10`;
  const btnAction = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90 h-10`;
  const btnSci = `${btnBase} bg-secondary text-muted-foreground border border-border hover:bg-muted h-9 text-xs`;

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setMode("basic")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            mode === "basic"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setMode("scientific")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
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
        <div className="bg-secondary rounded-lg p-3 text-right">
          <p className="text-xs text-muted-foreground h-4 truncate">{expression || "\u00A0"}</p>
          <p className="text-2xl font-bold text-foreground truncate">{display}</p>
        </div>

        {/* Scientific buttons */}
        {mode === "scientific" && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 mb-1">
              <button
                onClick={() => setAngleMode("deg")}
                className={`text-xs px-2 py-0.5 rounded ${angleMode === "deg" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
              >
                Deg
              </button>
              <button
                onClick={() => setAngleMode("rad")}
                className={`text-xs px-2 py-0.5 rounded ${angleMode === "rad" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
              >
                Rad
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {["sin(", "cos(", "tan(", "π", "e"].map((b) => (
                <button key={b} className={btnSci} onClick={() => handleInput(b)}>{b.replace("(", "")}</button>
              ))}
              {["√(", "log(", "ln(", "(", ")"].map((b) => (
                <button key={b} className={btnSci} onClick={() => handleInput(b)}>{b.replace("(", "")}</button>
              ))}
            </div>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-4 gap-1.5">
          <button className={btnOp} onClick={handleClear}>AC</button>
          <button className={btnOp} onClick={handleBackspace}>⌫</button>
          <button className={btnOp} onClick={() => handleInput("%")}>%</button>
          <button className={btnOp} onClick={() => handleOperator("÷")}>÷</button>

          {["7", "8", "9"].map((n) => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("×")}>×</button>

          {["4", "5", "6"].map((n) => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("-")}>−</button>

          {["1", "2", "3"].map((n) => (
            <button key={n} className={btnNum} onClick={() => handleInput(n)}>{n}</button>
          ))}
          <button className={btnOp} onClick={() => handleOperator("+")}>+</button>

          <button className={btnNum} onClick={() => handleInput("0")} style={{ gridColumn: "span 2" }}>0</button>
          <button className={btnNum} onClick={() => handleInput(".")}>.</button>
          <button className={btnAction} onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCalculator;
