// מסגרות מכשיר גנריות (בלי צורה או לוגו של יצרן), באותה שפה עיצובית: מסגרת ink ופינות מעוגלות.
// התוכן בפנים שומר על יחס הצלם המקורי (aspect) — כך אין קפיצת layout בזמן הטעינה.

export function PhoneFrame({ children, className = '' }) {
  return (
    <div
      className={`rounded-[2.4rem] bg-ink p-[0.55rem] shadow-[0_40px_80px_-30px_rgba(10,46,58,0.45),0_14px_30px_-12px_rgba(10,46,58,0.3)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-white aspect-[540/1054]">{children}</div>
    </div>
  );
}

export function LaptopFrame({ children, className = '' }) {
  return (
    <div className={`${className}`}>
      <div className="rounded-t-[1.1rem] bg-ink p-[0.6rem] pb-[0.8rem] shadow-[0_40px_80px_-30px_rgba(10,46,58,0.45)]">
        <div className="relative overflow-hidden rounded-[0.35rem] bg-white aspect-video">{children}</div>
      </div>
      {/* בסיס המקלדת: פס רחב מעט יותר מהמסך, עם שקע קטן במרכז */}
      <div className="relative mx-[-4%] h-[0.9rem] rounded-b-[0.9rem] bg-gradient-to-b from-ink/25 to-ink/45">
        <div className="absolute inset-x-[40%] top-0 h-[0.35rem] rounded-b-md bg-ink/30" />
      </div>
    </div>
  );
}

// תמונת מסך בתוך מסגרת: ממלאת את המסך כולו
export function ScreenImage({ alt, className = '', ...rest }) {
  return <img alt={alt} decoding="async" className={`absolute inset-0 h-full w-full object-cover object-top ${className}`} {...rest} />;
}
