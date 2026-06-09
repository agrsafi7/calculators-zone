import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import type { ScienceCalculatorConfig } from "@/data/science/types";

interface Props {
  config: ScienceCalculatorConfig;
  values: Record<string, string>;
  units: Record<string, string>;
}

const ScienceChart = ({ config, values, units }: Props) => {
  const chart = config.chart!;

  const data = useMemo(() => {
    // Build base inputs (current values, converted to SI).
    const base: Record<string, number> = {};
    for (const v of config.variables) {
      const u = v.units.find((x) => x.label === units[v.key]) ?? v.units[0];
      const raw = Number(values[v.key]);
      if (isFinite(raw)) base[v.key] = raw * u.toBase;
    }

    const xCurrent = base[chart.xKey];
    if (!isFinite(xCurrent) || xCurrent === 0) {
      // Pick a fallback sweep range
      const lo = 0;
      const hi = 10;
      return sweep(lo, hi);
    }

    const lo = 0;
    const hi = xCurrent * 2;
    return sweep(lo, hi);

    function sweep(lo: number, hi: number) {
      const N = 40;
      const out: { x: number; y: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const x = lo + ((hi - lo) * i) / N;
        const b = { ...base, [chart.xKey]: x };
        try {
          const r = config.solve(chart.yKey, b, units);
          if (isFinite(r.value)) out.push({ x, y: r.value });
        } catch {
          /* skip */
        }
      }
      return out;
    }
  }, [config, values, units, chart]);

  const currentX = useMemo(() => {
    const v = config.variables.find((x) => x.key === chart.xKey)!;
    const u = v.units.find((x) => x.label === units[v.key]) ?? v.units[0];
    return Number(values[v.key]) * u.toBase;
  }, [config, values, units, chart.xKey]);

  const currentY = useMemo(() => {
    const point = data.find((d) => Math.abs(d.x - currentX) < (data[1]?.x ?? 1) / 2);
    return point?.y;
  }, [data, currentX]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, bottom: 8, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="x"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => Number(v).toPrecision(3)}
            label={{ value: chart.xLabel, position: "insideBottom", offset: -2, fontSize: 11 }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
          />
          <YAxis
            tickFormatter={(v) => Number(v).toPrecision(3)}
            label={{ value: chart.yLabel, angle: -90, position: "insideLeft", fontSize: 11 }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number) => Number(v).toPrecision(4)}
            labelFormatter={(v: number) => `${chart.xLabel}: ${Number(v).toPrecision(4)}`}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          {isFinite(currentX) && currentY !== undefined && (
            <ReferenceDot
              x={currentX}
              y={currentY}
              r={5}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScienceChart;
