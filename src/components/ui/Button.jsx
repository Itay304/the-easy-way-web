const VARIANT_CLASSES = {
  primary: 'bg-brand-turquoise text-white hover:opacity-90',
  secondary: 'bg-white border-2 border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise/10',
  ghost: 'bg-transparent text-brand-text hover:bg-black/5',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-2 sm:px-4 text-caption',
  lg: 'px-8 py-4 text-body-lg',
};

export default function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...rest
}) {
  return (
    <As
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}
