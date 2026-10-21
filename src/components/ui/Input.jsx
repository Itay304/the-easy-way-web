export default function Input({ label, className = '', id, name, ...rest }) {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`min-h-12 w-full rounded-xl border border-ink/25 bg-white px-4 py-3 text-ink focus:border-ink ${className}`}
        {...rest}
      />
    </div>
  );
}
