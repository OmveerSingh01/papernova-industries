interface InputProps {
  label: string;
  type?: "text" | "email" | "tel";
  placeholder: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: InputProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}