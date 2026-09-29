import { useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import { continents, tours, type Tour } from '../data/tours';
import { PRICE_MAX, defaultFilters, type DaysFilter, type Filters, type SortKey } from '../types';
import TourCard from './TourCard';

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  favs: string[];
  toggleFav: (id: string) => void;
  onOpen: (t: Tour) => void;
};

const matchDays = (d: number, f: DaysFilter) => f === 'any' || (f === 'short' ? d <= 7 : f === 'mid' ? d >= 8 && d <= 10 : d >= 11);

const sorters: Record<SortKey, (a: Tour, b: Tour) => number> = {
  // curated order from the data file
  popular: (a, b) => tours.indexOf(a) - tours.indexOf(b),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  days: (a, b) => a.days - b.days,
};

export default function Tours({ filters, setFilters, favs, toggleFav, onOpen }: Props) {
  const { t, money } = useI18n();
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters({ ...filters, [k]: v });

  const list = useMemo(
    () =>
      tours
        .filter(
          (x) =>
            (filters.continent === 'all' || x.continent === filters.continent) &&
            x.price <= filters.maxPrice &&
            matchDays(x.days, filters.days) &&
            (!filters.favsOnly || favs.includes(x.id))
        )
        .sort(sorters[filters.sort]),
    [filters, favs]
  );

  const dirty = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <section className="tours" id="tours">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker__line" />
            {t('tours.kicker')}
          </p>
          <h2 className="h2">{t('tours.title')}</h2>
        </div>
        <p className="tours__count" aria-live="polite">
          {t('tours.found', { n: list.length })}
        </p>
      </div>

      <div className="filters">
        <div className="chips" role="group" aria-label={t('search.where')}>
          {(['all', ...continents] as const).map((c) => (
            <button key={c} className={`chip${filters.continent === c ? ' is-active' : ''}`} aria-pressed={filters.continent === c} onClick={() => set('continent', c)}>
              {c === 'all' ? t('f.all') : t(`c.${c}`)}
            </button>
          ))}
        </div>

        <div className="filters__row">
          <label className="range">
            <span>
              {t('f.price')} <strong>{filters.maxPrice >= PRICE_MAX ? '∞' : money(filters.maxPrice)}</strong>
            </span>
            <input
              type="range"
              min={800}
              max={PRICE_MAX}
              step={100}
              value={filters.maxPrice}
              onChange={(e) => set('maxPrice', Number(e.target.value))}
              style={{ '--p': `${((filters.maxPrice - 800) / (PRICE_MAX - 800)) * 100}%` } as React.CSSProperties}
            />
          </label>

          <label className="select">
            <span>{t('f.days')}</span>
            <select value={filters.days} onChange={(e) => set('days', e.target.value as DaysFilter)}>
              <option value="any">{t('search.anydays')}</option>
              <option value="short">{t('d.short')}</option>
              <option value="mid">{t('d.mid')}</option>
              <option value="long">{t('d.long')}</option>
            </select>
          </label>

          <label className="select">
            <span>{t('f.sort')}</span>
            <select value={filters.sort} onChange={(e) => set('sort', e.target.value as SortKey)}>
              {(Object.keys(sorters) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {t(`s.${k}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="switch">
            <input type="checkbox" checked={filters.favsOnly} onChange={(e) => set('favsOnly', e.target.checked)} />
            <span className="switch__ui" aria-hidden="true" />
            {t('f.favs')}
          </label>

          <AnimatePresence>
            {dirty && (
              <motion.button
                className="reset"
                onClick={() => setFilters(defaultFilters)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                ✕ {t('f.reset')}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((tour) => (
            <TourCard key={tour.id} tour={tour} fav={favs.includes(tour.id)} onFav={() => toggleFav(tour.id)} onOpen={() => onOpen(tour)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {list.length === 0 && (
          <motion.div className="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="empty__icon" aria-hidden="true">🧭</span>
            <h3>{t('empty.title')}</h3>
            <p>{t('empty.text')}</p>
            <button className="btn btn--dark" onClick={() => setFilters(defaultFilters)}>
              {t('f.reset')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
