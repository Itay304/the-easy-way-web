import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// עמודים שרונדרו מראש (scripts/prerender.mjs; <html data-prerendered="/books" וכו'>) — "מחיים" אותם במקום לצייר
// מחדש. בנתיב שאינו תואם ל-HTML המוכן מציירים מאפס (והוא מוסתר עד אז — data-route ב-index.html).
const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const prerendered = document.documentElement.dataset.prerendered || '/'
const path = window.location.pathname.replace(/\/+$/, '') || '/'

if (container.hasChildNodes() && path === prerendered) {
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
