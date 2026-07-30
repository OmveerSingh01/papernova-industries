import { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}