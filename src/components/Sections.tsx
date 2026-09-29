import { useEffect, useRef, useState, type FormEvent } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { useI18n } from '../i18n';
import { tours } from '../data/tours';
import Scene from './Scene';

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Counter({ to, digits = 0, suffix = '' }: { to: number; digits?: number; suffix?: string }) {
  const { num } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {num(value, digits)}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useI18n();
  const items = [
    { to: 14, key: 'stat.1' },
    { to: 38, key: 'stat.2' },
    { to: 24, suffix: 'k+', key: 'stat.3' },
    { to: 4.9, digits: 1, suffix: '★', key: 'stat.4' },
  ] as const;
  return (
    <section className="stats" aria-label="Voyage">
      {items.map((it, i) => (
        <motion.div key={it.key} className="stat" {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
          <strong>
            <Counter to={it.to} digits={'digits' in it ? it.digits : 0} suffix={'suffix' in it ? it.suffix : ''} />
          </strong>
          <span>{t(it.key)}</span>
        </motion.div>
      ))}
    </section>
  );
}

const icons = [
  <path key="1" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M12 20c0-3.3 2.7-6 6-6s4 1.6 4 4" />,
  <path key="2" d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  <path key="3" d="M20 12 12 20l-8-8V4h8l8 8ZM8 8h.01" />,
  <path key="4" d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 13v4a2 2 0 0 0 2 2h1v-6H4" />,
];

export function Why() {
  const { t } = useI18n();
  return (
    <section className="why" id="why">
      <div className="section-head section-head--center">
        <div>
          <p className="kicker">
            <span className="kicker__line" />
            {t('why.kicker')}
          </p>
          <h2 className="h2">{t('why.title')}</h2>
        </div>
      </div>
      <div className="why__grid">
        {([1, 2, 3, 4] as const).map((n, i) => (
          <motion.article key={n} className="why__card" {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
            <span className="why__icon">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                {icons[i]}
              </svg>
            </span>
            <h3>{t(`why.${n}t`)}</h3>
            <p>{t(`why.${n}p`)}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const { t } = useI18n();
  const scenes = ['iceland', 'altai', 'sahara'].map((id) => tours.find((x) => x.id === id)!.scene);
  return (
    <section className="reviews" id="reviews">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker__line" />
            {t('rev.kicker')}
          </p>
          <h2 className="h2">{t('rev.title')}</h2>
        </div>
      </div>
      <div className="reviews__grid">
        {([1, 2, 3] as const).map((n, i) => (
          <motion.figure key={n} className="review" {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
            <Scene config={scenes[i]} className="review__scene" />
            <span className="stars" aria-hidden="true">★★★★★</span>
            <blockquote>{t(`rev.${n}`)}</blockquote>
            <figcaption>{t(`rev.${n}a`)}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState(ok ? 'ok' : 'err');
    if (ok) setEmail('');
  };

  return (
    <section className="cta" id="contact">
      <motion.div className="cta__card" {...reveal}>
        <Scene config={tours.find((x) => x.id === 'maldives')!.scene} className="cta__scene" />
        <div className="cta__content">
          <h2 className="h2">{t('cta.title')}</h2>
          <p>{t('cta.text')}</p>
          <form className="cta__form" onSubmit={submit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setState('idle');
              }}
              placeholder={t('cta.placeholder')}
              aria-label={t('m.email')}
              aria-invalid={state === 'err'}
            />
            <button className="btn btn--coral">{t('cta.btn')}</button>
          </form>
          <p className={`cta__msg is-${state}`} role="status">
            {state === 'ok' ? t('cta.ok') : state === 'err' ? t('cta.err') : ''}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <a href="#top" className="logo">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <circle cx="22" cy="10" r="4.5" fill="var(--coral)" />
              <path d="M2 27 12 13l5 6 4-4 9 12Z" fill="currentColor" />
            </svg>
            Voyage
          </a>
          <p>{t('ft.about')}</p>
        </div>
        <div>
          <h4>{t('ft.company')}</h4>
          <a href="#why">{t('nav.why')}</a>
          <a href="#reviews">{t('nav.reviews')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </div>
        <div>
          <h4>{t('ft.help')}</h4>
          <a href="#tours">{t('ft.faq')}</a>
          <a href="#tours">{t('ft.insurance')}</a>
          <a href="#tours">{t('ft.visa')}</a>
        </div>
        <div>
          <h4>{t('ft.social')}</h4>
          <a href="#top">Telegram</a>
          <a href="#top">Instagram</a>
          <a href="#top">YouTube</a>
        </div>
      </div>
      <p className="footer__copy">{t('ft.copy')}</p>
    </footer>
  );
}
