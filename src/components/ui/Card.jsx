export default function Card({ padding = 'p-6', className = '', children, ...rest }) {
  return (
    <div className={`rounded-2xl border border-black/5 bg-white shadow-sm ${padding} ${className}`} {...rest}>
      {children}
    </div>
  );
}
