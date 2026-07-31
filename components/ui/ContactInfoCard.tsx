import { ReactNode } from "react";

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

export default function ContactInfoCard({
  icon,
  title,
  value,
}: ContactInfoCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-gray-600">
          {value}
        </p>
      </div>
    </div>
  );
}