export default function Input({ label, className = '', id, name, ...rest }) {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-caption font-semibold text-brand-grey-text mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise ${className}`}
        {...rest}
      />
    </div>
  );
}
