import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Navigation, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ServiceProvider } from '@/data/services';
import { serviceDirectionsUrl } from '@/lib/service-directions';
import { loadServiceMap } from '@/lib/google-map-loader';

export function ServiceDirectionsButton({ provider }: { provider: ServiceProvider }) {
  const { t } = useLanguage();
  const url = serviceDirectionsUrl(provider);
  if (!url) return null;
  return <Button asChild variant="secondary" className="h-11"><a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${t('svc.directions')}: ${provider.name}${provider.isDemo ? ` · ${t('svc.mapSample')}` : ''}`}><Navigation />{t('svc.directions')}</a></Button>;
}

export function ServiceMap({ providers }: { providers: ServiceProvider[] }) {
  const { t, lang } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selectedId, setSelectedId] = useState<string>();
  const valid = providers.filter(p => serviceDirectionsUrl(p));
  const selected = valid.find(p => p.id === selectedId) ?? valid[0];
  useEffect(() => {
    let disposed = false;
    let map: google.maps.Map | undefined;
    const markers: google.maps.Marker[] = [];
    setState('loading');
    if (!providers.length) return;
    loadServiceMap().then(maps => {
      if (disposed || !container.current) return;
      const locations = providers.filter(p => serviceDirectionsUrl(p));
      if (!locations.length) { setState('error'); return; }
      map = new maps.Map(container.current, { center: { lat: locations[0].latitude, lng: locations[0].longitude }, zoom: 14, clickableIcons: false, mapTypeControl: false, streetViewControl: false, gestureHandling: 'cooperative', styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }] });
      const groups = new Map<string, ServiceProvider[]>();
      locations.forEach(p => { const key = `${p.latitude},${p.longitude}`; groups.set(key, [...(groups.get(key) ?? []), p]); });
      const bounds = new maps.LatLngBounds();
      groups.forEach(group => {
        const first = group[0];
        const position = { lat: first.latitude, lng: first.longitude };
        bounds.extend(position);
        const marker = new maps.Marker({ map, position, title: group.map(p => p.name).join(' · '), label: group.length > 1 ? String(group.length) : undefined });
        marker.addListener('click', () => setSelectedId(first.id));
        markers.push(marker);
      });
      if (groups.size > 1) map.fitBounds(bounds, 40);
      setState('ready');
    }).catch(() => { if (!disposed) setState('error'); });
    return () => { disposed = true; markers.forEach(marker => { google.maps.event.clearInstanceListeners(marker); marker.setMap(null); }); if (map) google.maps.event.clearInstanceListeners(map); };
  }, [providers]);
  if (!selected) return null;
  return <section className="my-5">
    <div className="relative h-80 overflow-hidden rounded-2xl border border-border bg-secondary sm:h-96">
      <div ref={container} className="h-full w-full" aria-label={t('svc.interactiveMap')} />
      {state !== 'ready' && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary px-6 text-center text-sm text-muted-foreground"><MapPin className="h-7 w-7 text-primary"/>{t(state === 'error' ? 'svc.mapError' : 'svc.mapLoading')}</div>}
    </div>
    {valid.some(p => p.isDemo) && <p className="mt-2 text-xs text-muted-foreground">{t('svc.mapDemoWarning')}</p>}
    {valid.length > 1 && <div className="mt-3 flex flex-wrap gap-2">{valid.map(p => <Button key={p.id} size="sm" variant={p.id === selected.id ? 'default' : 'secondary'} aria-pressed={p.id === selected.id} onClick={() => setSelectedId(p.id)}>{p.name}</Button>)}</div>}
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4"><div className="min-w-0"><Link to="/maintenance/provider/$provider" params={{ provider: selected.id }} className="flex items-center gap-2 font-semibold hover:text-primary">{selected.name}<ArrowUpRight className="h-4 w-4"/></Link><p className="mt-1 text-xs text-muted-foreground">{selected.address[lang]}</p></div><ServiceDirectionsButton provider={selected}/></div>
  </section>;
}