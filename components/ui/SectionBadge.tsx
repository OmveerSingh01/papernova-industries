import { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
};

export default function SectionBadge({
  children,
}: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
        {children}
      </span>
    </div>
  );
}