import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Shared calculator UI primitives implementing the two-column card design.
 * Pure presentation — no calculation logic. All colors use semantic tokens
 * so dark mode keeps working.
 *
 * Spec colors mapped to existing tokens:
 *   #3B82F6 → primary | #1E3A5F → navy | #F5F6FA → muted bg | #E5E7EB → border
 */

/* ------------------------------- Layout ----------------------------------- */

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface CalculatorLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  sidebar?: ReactNode;
  /** Slot rendered below the main two-column card (extra charts, FAQ, etc.) */
  belowCard?: ReactNode;
}

export function CalculatorLayout({
  title,
  description,
  breadcrumbs = [],
  children,
  sidebar,
  belowCard,
}: CalculatorLayoutProps) {
  return (
    <div className="bg-[hsl(220,20%,97%)] dark:bg-background min-h-[calc(100vh-200px)]">
      {breadcrumbs.length > 0 && (
        <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.url ? (
                <Link to={b.url} className="hover:text-foreground transition-colors">
                  {b.name}
                </Link>
              ) : (
                <span className="text-foreground">{b.name}</span>
              )}
              {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </nav>
      )}

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <header className="mb-5">
              <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-muted-foreground text-sm max-w-2xl">
                  {description}
                </p>
              )}
            </header>

            {/* Main two-column card */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {children}
              </div>
            </div>

            {belowCard}
          </div>

          {sidebar && (
            <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

/** Left input panel inside CalculatorLayout */
export function InputPanel({ children }: { children: ReactNode }) {
  return (
    <section className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border space-y-4">
      {children}
    </section>
  );
}

/** Right results panel inside CalculatorLayout */
export function ResultsPanel({ children }: { children: ReactNode }) {
  return (
    <section className="p-6 md:p-8 bg-[hsl(220,20%,98%)] dark:bg-card/50 space-y-5">
      {children}
    </section>
  );
}

/* ------------------------------- Inputs ----------------------------------- */

interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  prefix?: string;
  suffix?: string;
  step?: string | number;
  className?: string;
  placeholder?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = "number",
  prefix,
  suffix,
  step,
  className = "",
  placeholder,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${prefix ? "pl-7" : "pl-3"} ${
            suffix ? "pr-8" : "pr-3"
          } py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/** Two inputs displayed side by side (e.g. amount + percent) */
export function InputRow({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 [&>*]:flex-1">{children}</div>;
}

interface DropdownSelectProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

export function DropdownSelect<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: DropdownSelectProps<T>) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value as string | number}
          onChange={(e) => {
            const v = e.target.value;
            const matched = options.find((o) => String(o.value) === v);
            if (matched) onChange(matched.value);
          }}
          className="w-full pl-3 pr-9 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer"
        >
          {options.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: SliderInputProps) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
        />
        <div className="relative w-24">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full pl-3 ${suffix ? "pr-7" : "pr-3"} py-2 rounded-lg border border-border bg-card text-sm text-foreground text-right focus:outline-none focus:ring-2 focus:ring-primary/30`}
          />
          {suffix && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ label, value, onChange }: DateInputProps) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-3 pr-9 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

/** Pill toggle (e.g. Monthly / Annually) */
interface ToggleSwitchProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
}

export function ToggleSwitch<T extends string>({
  options,
  value,
  onChange,
  fullWidth = false,
}: ToggleSwitchProps<T>) {
  return (
    <div
      className={`inline-flex bg-secondary rounded-full p-1 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            className={`${
              fullWidth ? "flex-1" : ""
            } px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

interface AdvancedAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AdvancedAccordion({
  title,
  children,
  defaultOpen = false,
}: AdvancedAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? "item" : undefined}
      className="border-t border-border pt-2"
    >
      <AccordionItem value="item" className="border-0">
        <AccordionTrigger className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export function CTAButton({
  children,
  onClick,
  type = "button",
  className = "",
}: CTAButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Results ---------------------------------- */

interface LegendRowProps {
  color: string;
  label: string;
  value: string;
  meta?: string;
}

export function LegendRow({ color, label, value, meta }: LegendRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: color }}
        />
        <span className="text-sm text-muted-foreground truncate">{label}</span>
      </div>
      <div className="text-right shrink-0 ml-2">
        <div className="text-sm font-semibold text-foreground">{value}</div>
        {meta && <div className="text-[10px] text-muted-foreground">{meta}</div>}
      </div>
    </div>
  );
}

interface ResultStatRowProps {
  label: string;
  value: string;
  emphasize?: boolean;
}

export function ResultStatRow({
  label,
  value,
  emphasize = false,
}: ResultStatRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        emphasize ? "border-t border-border pt-3 mt-1" : ""
      }`}
    >
      <span
        className={`text-sm ${
          emphasize ? "font-bold text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
      <span
        className={`${
          emphasize ? "text-base font-black text-primary" : "text-sm font-semibold text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* Spec palette exposed for chart segments */
export const CHART_COLORS = {
  blue: "#3B82F6",
  navy: "#1E3A5F",
  lightBlue: "#93C5FD",
  green: "#4ADE80",
  pink: "#F9A8D4",
  yellow: "#FCD34D",
};
