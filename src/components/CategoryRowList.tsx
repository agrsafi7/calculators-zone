import { Link } from "react-router-dom";
import { getCategoryIcon } from "@/data/calculators";

export interface RowItem {
  name: string;
  href: string;
  icon: string;
  count?: number;
  description?: string;
}

interface Props {
  items: RowItem[];
  countSuffix?: string;
}

const CategoryRowList = ({ items, countSuffix = "calculators" }: Props) => {
  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const Icon = getCategoryIcon(item.icon);
        return (
          <Link
            key={item.href}
            to={item.href}
            className="group flex items-center gap-4 bg-card border border-border rounded-xl px-4 sm:px-5 py-4 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-foreground truncate group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-xs text-muted-foreground truncate hidden sm:block">{item.description}</p>
              )}
            </div>
            {item.count !== undefined && (
              <span className="text-sm sm:text-base text-muted-foreground font-medium shrink-0 whitespace-nowrap">
                {item.count} {countSuffix}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryRowList;
