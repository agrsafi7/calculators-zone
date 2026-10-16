// Renders blog post section bodies. Supports:
// - **bold** inline markers
// - "- " bullet lines (grouped into <ul>)
// - Markdown pipe tables (contiguous lines starting with |)
import React from "react";

const renderInline = (text: string, keyPrefix: string) => {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ink">
        {p}
      </strong>
    ) : (
      <React.Fragment key={`${keyPrefix}-${i}`}>{p}</React.Fragment>
    ),
  );
};

const renderTable = (lines: string[], keyPrefix: string) => {
  const rows = lines.map((l) =>
    l
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim()),
  );
  const isSeparator = (row: string[]) => row.every((c) => /^:?-+:?$/.test(c));
  const body = rows[0] && isSeparator(rows[0]) ? rows.slice(1) : rows.filter((r) => !isSeparator(r));
  const header = rows.length > 1 && !isSeparator(rows[0]) ? rows[0] : null;
  const data = header ? rows.slice(1).filter((r) => !isSeparator(r)) : body;
  return (
    <div key={keyPrefix} className="overflow-x-auto my-4 rounded-lg border border-border">
      <table className="w-full text-sm">
        {header && (
          <thead>
            <tr className="bg-surface-low">
              {header.map((c, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-semibold text-ink whitespace-nowrap">
                  {renderInline(c, `${keyPrefix}-h${i}`)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, r) => (
            <tr key={r} className={r % 2 === 0 ? "bg-card" : "bg-surface-low/50"}>
              {row.map((c, i) => (
                <td key={i} className="px-4 py-2.5 text-ink-soft border-t border-border whitespace-nowrap">
                  {renderInline(c, `${keyPrefix}-c${r}-${i}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BlogBody = ({ sections }: { sections: { heading: string; body: string[] }[] }) => {
  return (
    <div>
      {sections.map((s, si) => {
        const blocks: React.ReactNode[] = [];
        let i = 0;
        while (i < s.body.length) {
          const line = s.body[i];
          if (line.trim().startsWith("|")) {
            const tableLines: string[] = [];
            while (i < s.body.length && s.body[i].trim().startsWith("|")) {
              tableLines.push(s.body[i]);
              i++;
            }
            blocks.push(renderTable(tableLines, `t${si}-${blocks.length}`));
          } else if (line.trim().startsWith("- ")) {
            const items: string[] = [];
            while (i < s.body.length && s.body[i].trim().startsWith("- ")) {
              items.push(s.body[i].trim().slice(2));
              i++;
            }
            blocks.push(
              <ul key={`ul${si}-${blocks.length}`} className="list-disc pl-6 my-3 space-y-1.5 text-ink-soft leading-relaxed">
                {items.map((it, ii) => (
                  <li key={ii}>{renderInline(it, `li${si}-${ii}`)}</li>
                ))}
              </ul>,
            );
          } else {
            blocks.push(
              <p key={`p${si}-${blocks.length}`} className="my-3 text-ink-soft leading-relaxed">
                {renderInline(line, `p${si}-${i}`)}
              </p>,
            );
            i++;
          }
        }
        return (
          <section key={si} className="mb-8">
            <h2 className="text-xl font-bold text-ink mb-2">{s.heading}</h2>
            {blocks}
          </section>
        );
      })}
    </div>
  );
};

export default BlogBody;
