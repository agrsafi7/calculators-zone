// Lazy-loaded chart for calculator result pages. recharts is ~400KB — it must
// not be in the main bundle. This component is React.lazy()'d by
// CalculatorTemplate and only downloads when a results chart actually renders.
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from "recharts";

const CHART_COLORS = [
  "hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(25, 95%, 53%)",
  "hsl(262, 83%, 58%)", "hsl(330, 81%, 60%)", "hsl(199, 89%, 48%)",
  "hsl(0, 84%, 60%)", "hsl(45, 93%, 47%)",
];

export interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

const parseNumericValue = (val: string): number | null => {
  if (/[a-zA-Z]{2,}/.test(val.replace(/[,$%()]/g, ""))) return null;
  if (val.includes(",") && val.split(",").length > 2) return null;
  const cleaned = val.replace(/[^0-9.\-]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};

const CalculatorChart = ({ results }: { results: ResultItem[] }) => {
  const chartData = results
    .filter((r) => !r.label.toLowerCase().includes("sorted") && !r.label.toLowerCase().includes("data"))
    .map((r) => ({ name: r.label, value: parseNumericValue(r.value) }))
    .filter((d): d is { name: string; value: number } => d.value !== null && d.value > 0);

  if (chartData.length < 2) return null;

  const usePie = chartData.length <= 4;
  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-5 mt-6">
      <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
        <span className="text-primary">📊</span> Visual Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        {usePie ? (
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
              {chartData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
            </Pie>
            <RechartsTooltip
              formatter={(value: number, name: string) => [`${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`, name]}
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} formatter={(value: string) => (<span className="text-foreground">{value}</span>)} />
          </PieChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} tickFormatter={(v) => v.toLocaleString()} />
            <RechartsTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => [value.toLocaleString(), "Value"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CalculatorChart;
