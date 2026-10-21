import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// דף הבית מגיע מרונדר מראש ב-dist/index.html (scripts/prerender.mjs) — "מחיים" אותו במקום לצייר מחדש.
// בשאר הנתיבים ה-HTML המוכן הוא של דף הבית, אז מציירים מאפס (והוא מוסתר עד אז — data-route ב-index.html).
const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.hasChildNodes() && window.location.pathname === '/') {
  hydrateRoot(container, app, {
    // #419 = גבול Suspense שלא רונדר בשרת (BelowFold ב-lazy) ולכן מרונדר בדפדפן — זה בכוונה, לא תקלה.
    onRecoverableError(error) {
      if (!String(error?.message).includes('419')) console.error(error)
    },
  })
} else {
  createRoot(container).render(app)
  delete document.documentElement.dataset.route
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
