import { test, expect } from 'bun:test';
import { matchingCategories, filterProviders, serviceCategories } from './services';
test('all 12 requested categories are present',()=>expect(serviceCategories).toHaveLength(12));
test('shina finds tire repair and balancing providers',()=>{expect(matchingCategories('shina').map(c=>c.id)).toContain('tires');expect(filterProviders({query:'balansirovka'}).map(p=>p.id)).toContain('tirelab');});
test('moy and filter replacement find oil providers',()=>{expect(matchingCategories('moy').map(c=>c.id)).toContain('oil');expect(filterProviders({query:'filtr almashtirish'}).map(p=>p.id)).toContain('automaster');});
test('open and 24/7 filters only include matching providers',()=>{expect(filterProviders({query:'',openNow:true}).some(p=>!p.isOpen)).toBe(false);expect(filterProviders({query:'',alwaysOpen:true}).map(p=>p.id)).toEqual(['recovery']);});
test('distance rating and price thresholds are enforced',()=>{expect(filterProviders({query:'',distance:3,rating:4.8,price:60000}).map(p=>p.id)).toEqual(['tirelab']);});
test('sorting supports reviews rating and distance',()=>{expect(filterProviders({query:'',sort:'reviews'})[0].id).toBe('recovery');expect(filterProviders({query:'',sort:'nearest'})[0].id).toBe('tirelab');expect(filterProviders({query:'',sort:'rating'})[0].rating).toBe(4.9);});
