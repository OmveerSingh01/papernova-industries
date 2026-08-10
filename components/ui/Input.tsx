interface InputProps {
  label: string;
  name?: string;
  type?: "text" | "email" | "tel";
  placeholder: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value = "",
  onChange,
  required = false,
  disabled = false,
  className = "",
}: InputProps) {
  return (
    <div className={className}>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
      />

    </div>
  );
}