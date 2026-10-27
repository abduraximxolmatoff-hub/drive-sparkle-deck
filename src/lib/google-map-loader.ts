let pending: Promise<typeof google.maps> | undefined;
export function loadServiceMap(): Promise<typeof google.maps> {
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    const key = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'];
    const channel = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID'];
    if (!key) { reject(new Error('Map configuration missing')); return; }
    const callbackName = 'autoInfoServiceMapReady';
    const callbacks = window as unknown as Record<string, unknown>;
    let finished = false;
    const timer = window.setTimeout(() => fail(), 20000);
    const fail = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      delete callbacks[callbackName];
      reject(new Error('Map unavailable'));
    };
    callbacks[callbackName] = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      delete callbacks[callbackName];
      resolve(google.maps);
    };
    const params = new URLSearchParams({ key, loading: 'async', callback: callbackName, channel: channel ?? '' });
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return pending;
}