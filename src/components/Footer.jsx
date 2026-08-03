export default function Footer() {
  return (
    <footer className="bg-brand-text text-white/80 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/icons/icon-192.png" alt="The Easy Way" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-white">The Easy Way</span>
        </div>
        <p className="text-sm text-center">
          © {new Date().getFullYear()} The Easy Way — לימוד אוצר מילים באנגלית לבתי ספר
        </p>
        <a href="#contact" className="text-sm font-semibold text-brand-turquoise hover:underline">
          צור קשר
        </a>
      </div>
    </footer>
  );
}
