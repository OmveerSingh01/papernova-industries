type StatsCardProps = {
  value: string;
  label: string;
};

export default function StatsCard({
  value,
  label,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-md">
      <h3 className="text-3xl font-bold text-green-400">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-200">
        {label}
      </p>
    </div>
  );
}