let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
});

export function consumeDeferredPrompt() {
  const prompt = deferredPrompt;
  deferredPrompt = null;
  return prompt;
}

export function setManifest(href) {
  let link = document.querySelector('link[rel="manifest"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'manifest';
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
}

export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}
