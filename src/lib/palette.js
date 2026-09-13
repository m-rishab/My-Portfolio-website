const EVT = 'paper-iris:open-palette';

export function openPalette() {
  window.dispatchEvent(new CustomEvent(EVT));
}

export function onOpenPalette(handler) {
  const listener = () => handler();
  window.addEventListener(EVT, listener);
  return () => window.removeEventListener(EVT, listener);
}