const ScientificNotationExplanation = () => {
  return (
    <section className="mb-8 border-t border-border pt-6">
      <h2 className="text-2xl font-bold mb-4">How to Add Scientific Notation in Calculator?</h2>
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          Adding numbers in scientific notation on a calculator is simple once you know the <strong>EE</strong> (or
          <strong> EXP</strong>) key. This key replaces typing "× 10^". Here is the step-by-step:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Switch your calculator to <strong>scientific mode</strong> (on phones: rotate to landscape, or open the Sci tab).</li>
          <li>
            Type the first number's coefficient, then press <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">EE</code>
            {" "}or <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">EXP</code>, then type the exponent.
            For example, to enter <strong>6.022 × 10²³</strong>, press: <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">6.022 EE 23</code>.
          </li>
          <li>Press <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">+</code>.</li>
          <li>Type the second number the same way: coefficient, then <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">EE</code>, then exponent.</li>
          <li>Press <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">=</code>. The calculator returns the result, often in E notation (e.g., <strong>6.04E23</strong>).</li>
        </ol>

        <h3 className="text-lg font-semibold text-foreground mt-6">Worked Examples</h3>

        <div className="bg-secondary/40 border border-border rounded-lg p-4 space-y-2">
          <p className="font-semibold text-foreground">Example 1: Write 9,460,000,000,000,000 in scientific notation.</p>
          <p>Move the decimal 15 places to the left → <strong>9.46 × 10¹⁵</strong>. (This is 1 light-year in meters.)</p>
        </div>

        <div className="bg-secondary/40 border border-border rounded-lg p-4 space-y-2">
          <p className="font-semibold text-foreground">Example 2: Write 60,500 in scientific notation.</p>
          <p>Move the decimal 4 places left → <strong>6.05 × 10⁴</strong>.</p>
        </div>

        <div className="bg-secondary/40 border border-border rounded-lg p-4 space-y-2">
          <p className="font-semibold text-foreground">Example 3: Write 16,900,000 in scientific notation.</p>
          <p>Move the decimal 7 places left → <strong>1.69 × 10⁷</strong>.</p>
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-6">Operations With Scientific Notation</h3>
        <ul className="list-disc list-inside space-y-1.5 ml-2">
          <li><strong>Multiplication:</strong> (a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10^(m + n)</li>
          <li><strong>Division:</strong> (a × 10ᵐ) ÷ (b × 10ⁿ) = (a ÷ b) × 10^(m − n)</li>
          <li><strong>Addition / Subtraction:</strong> rewrite both numbers with the same exponent, then add or subtract the coefficients.</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mt-6">How to Use Scientific Notation on a Calculator (Quick Reference)</h3>
        <p>
          Most physical calculators (Casio, TI-30, TI-84) use <strong>EE</strong> or <strong>EXP</strong>. The Windows
          calculator uses an <strong>Exp</strong> button in scientific mode. iPhone and Android calculators show
          <strong> EE</strong> after rotating to landscape. Always remember: do not press
          {" "}<code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">×</code> 10
          {" "}<code className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">^</code> — that creates a
          different (sometimes wrong) order of operations. Use the dedicated EE / EXP key.
        </p>

        <h3 className="text-lg font-semibold text-foreground mt-6">How to Work Out Force (Bonus)</h3>
        <p>
          Force uses Newton's Second Law: <strong>F = m × a</strong>, where m is mass in kilograms and a is acceleration in m/s².
          A 1,500 kg car accelerating at 9.8 m/s² produces 1,500 × 9.8 = <strong>14,700 N</strong>. For very large or very small
          forces, express them in scientific notation, e.g. 1.47 × 10⁴ N.
        </p>
      </div>
    </section>
  );
};

export default ScientificNotationExplanation;
