type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
}: PrimaryButtonProps) {
  const baseClasses =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg",

    outline:
      "border border-white text-white hover:bg-white hover:text-slate-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}