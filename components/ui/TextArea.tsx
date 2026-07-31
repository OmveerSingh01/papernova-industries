interface TextAreaProps {
  label: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export default function TextArea({
  label,
  placeholder,
  rows = 5,
  required = false,
  className = "",
}: TextAreaProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}