interface TextAreaProps {
  label: string;
  name?: string;
  placeholder: string;
  rows?: number;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function TextArea({
  label,
  name,
  placeholder,
  rows = 5,
  value = "",
  onChange,
  required = false,
  disabled = false,
  className = "",
}: TextAreaProps) {
  return (
    <div className={className}>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
      />

    </div>
  );
}