import useInView from '../../hooks/useInView.js';

// עוטף תוכן שנחשף בעדינות כשהוא נכנס למסך (ראו .reveal ב-index.css; סטטי עם reduced-motion).
export default function Reveal({ as: As = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </As>
  );
}
