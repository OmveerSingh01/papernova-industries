type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
};

export default function PrimaryButton({
  children,
  className = "",
  variant = "primary",
}: PrimaryButtonProps) {
  const baseClasses =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg",

    outline:
      "border border-white text-white hover:bg-white hover:text-slate-900",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}