// שני סגנונות כפתור בלבד באתר, ושניהם עוברים ניגודיות:
// primary   — רקע cover (#1F877F) + לבן. 4.35:1, ולכן רק כטקסט גדול: 20px מודגש (size="lg").
// secondary — מסגרת ותווית בצבע ink על לבן (14.3:1).
// כפתורים קטנים (size="sm": כותרת, תפריט) לעולם לא בסגנון primary — dark (ink + לבן) או secondary.
const VARIANT_CLASSES = {
  primary: 'bg-cover text-white hover:bg-ink shadow-[0_10px_24px_-12px_rgba(10,46,58,0.6)]',
  secondary: 'bg-white border-2 border-ink text-ink hover:bg-mist',
  dark: 'bg-ink text-white hover:bg-cover',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
};

const SIZE_CLASSES = {
  sm: 'min-h-11 px-4 text-body',
  lg: 'min-h-14 px-7 text-[20px]',
};

export default function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...rest
}) {
  if (variant === 'primary' && size !== 'lg') {
    throw new Error('Button: primary is only allowed at size="lg" (large text keeps contrast ≥ 3:1)');
  }
  return (
    <As
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}
