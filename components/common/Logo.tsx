export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white shadow-md">
        P
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          PaperNova
        </h2>

        <p className="text-sm text-slate-500">
          Industries
        </p>
      </div>

    </div>
  );
}