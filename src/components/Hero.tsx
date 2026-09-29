import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useI18n } from '../i18n';
import { continents, tours } from '../data/tours';
import type { DaysFilter, Filters } from '../types';
import { PRICE_MAX } from '../types';
import Scene from './Scene';

const heroScene = tours.find((t) => t.id === 'patagonia')!.scene;

export default function Hero({ onSearch }: { onSearch: (f: Partial<Filters>) => void }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const [where, setWhere] = useState<Filters['continent']>('all');
  const [days, setDays] = useState<DaysFilter>('any');
  const [budget, setBudget] = useState(PRICE_MAX);

  // Pointer parallax across the SVG layers (data-depth set by <Scene layered>)
  useEffect(() => {
    const el = visualRef.current;
    if (!el || reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const layers = [...el.querySelectorAll<SVGElement>('[data-depth]')];
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          const d = Number(l.dataset.depth);
          l.style.transform = `translate(${nx * -24 * d}px, ${ny * -10 * d}px)`;
        });
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ continent: where, days, maxPrice: budget });
  };

  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.p className="kicker" {...fade(0.05)}>
          <span className="kicker__line" />
          {t('hero.kicker')}
        </motion.p>
        <motion.h1 className="hero__title" {...fade(0.15)}>
          {t('hero.t1')} <span className="script">{t('hero.t2')}</span>
        </motion.h1>
        <motion.p className="hero__lead" {...fade(0.3)}>
          {t('hero.lead')}
        </motion.p>

        <motion.form className="search" onSubmit={submit} {...fade(0.45)}>
          <label className="search__field">
            <span>{t('search.where')}</span>
            <select value={where} onChange={(e) => setWhere(e.target.value as Filters['continent'])}>
              <option value="all">{t('search.anywhere')}</option>
              {continents.map((c) => (
                <option key={c} value={c}>
                  {t(`c.${c}`)}
                </option>
              ))}
            </select>
          </label>
          <label className="search__field">
            <span>{t('search.days')}</span>
            <select value={days} onChange={(e) => setDays(e.target.value as DaysFilter)}>
              <option value="any">{t('search.anydays')}</option>
              <option value="short">{t('d.short')}</option>
              <option value="mid">{t('d.mid')}</option>
              <option value="long">{t('d.long')}</option>
            </select>
          </label>
          <label className="search__field">
            <span>{t('search.budget')}</span>
            <select value={budget} onChange={(e) => setBudget(Number(e.target.value))}>
              <option value={PRICE_MAX}>{t('search.anybudget')}</option>
              <option value={1000}>≤ $1 000</option>
              <option value={2000}>≤ $2 000</option>
              <option value={3000}>≤ $3 000</option>
            </select>
          </label>
          <button type="submit" className="btn btn--coral search__btn" aria-label={t('search.go')}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search__btn-text">{t('search.go')}</span>
          </button>
        </motion.form>
      </div>

      <motion.div
        className="hero__visual"
        ref={visualRef}
        initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Scene config={heroScene} layered className="hero__scene" />
        <div className="float float--rating">
          <strong>4.9</strong>
          <span className="stars" aria-hidden="true">★★★★★</span>
          <small>{t('hero.rating')}</small>
        </div>
        <div className="float float--group">
          <span className="avatars" aria-hidden="true">
            <i style={{ background: '#ffb4a2' }} />
            <i style={{ background: '#9bd0c3' }} />
            <i style={{ background: '#ffd166' }} />
          </span>
          <small>{t('hero.groups')}</small>
        </div>
        <span className="stamp" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="stamp-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text>
              <textPath href="#stamp-circle" textLength="236" lengthAdjust="spacing">VOYAGE • SINCE 2012 • TRAVEL CLUB •</textPath>
            </text>
          </svg>
          ✈
        </span>
      </motion.div>
    </section>
  );
}
