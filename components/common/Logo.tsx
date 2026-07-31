import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex cursor-pointer items-center gap-3">
      <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-lg">
        <Image
          src="/logo.png"
          alt="PaperNova Industries"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Paper<span className="text-amber-600">Nova</span>
        </h2>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Industries
        </p>
      </div>
    </div>
  );
}