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
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
      />

    </div>
  );
}