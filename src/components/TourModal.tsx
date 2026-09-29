import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import type { Tour } from '../data/tours';
import Scene from './Scene';

type Errors = Partial<Record<'name' | 'email' | 'date', string>>;

const todayISO = () => new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10);

export default function TourModal({ tour, onClose }: { tour: Tour; onClose: () => void }) {
  const { t, lang, money } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Escape to close, lock page scroll, keep focus inside the dialog
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href]')].filter((el) => !el.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      prev?.focus();
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!date) next.date = t('m.err.date');
    if (name.trim().length < 2) next.name = t('m.err.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = t('m.err.email');
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        ref={dialogRef}
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <button className="modal__close" onClick={onClose} aria-label={t('m.close')} data-autofocus>
          ✕
        </button>

        <div className="modal__hero">
          <Scene config={tour.scene} className="modal__scene" />
          <div className="modal__heading">
            <span>{tour.place[lang]} · {t('card.days', { n: tour.days })}</span>
            <h2 id="modal-title">{tour.title[lang]}</h2>
          </div>
        </div>

        <div className="modal__body">
          <div className="modal__info">
            <p className="modal__blurb">{tour.blurb[lang]}</p>
            <h3>{t('m.highlights')}</h3>
            <ul className="checks">
              {tour.highlights[lang].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h3>{t('m.route')}</h3>
            <ol className="route">
              {tour.itinerary[lang].map(([place, what], i) => (
                <motion.li key={place} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
                  <span className="route__dot" />
                  <small>{t('m.day', { n: Math.round((i * tour.days) / tour.itinerary[lang].length) + 1 })}</small>
                  <strong>{place}</strong>
                  <span>{what}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="book">
            {sent ? (
              <motion.div className="book__ok" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <motion.span className="book__check" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}>
                  ✓
                </motion.span>
                <h3>{t('m.ok.title')}</h3>
                <p>{t('m.ok.text', { tour: tour.title[lang], email: email.trim() })}</p>
                <button className="btn btn--dark" onClick={onClose}>
                  {t('m.ok.btn')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3>{t('m.book')}</h3>
                <label className={`field${errors.date ? ' has-error' : ''}`}>
                  <span>{t('m.date')}</span>
                  <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={!!errors.date} />
                  {errors.date && <em role="alert">{errors.date}</em>}
                </label>
                <div className="field">
                  <span id="guests-label">{t('m.guests')}</span>
                  <div className="stepper" role="group" aria-labelledby="guests-label">
                    <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="−">
                      −
                    </button>
                    <output aria-live="polite">{guests}</output>
                    <button type="button" onClick={() => setGuests((g) => Math.min(tour.group, g + 1))} aria-label="+">
                      +
                    </button>
                  </div>
                </div>
                <label className={`field${errors.name ? ' has-error' : ''}`}>
                  <span>{t('m.name')}</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <em role="alert">{errors.name}</em>}
                </label>
                <label className={`field${errors.email ? ' has-error' : ''}`}>
                  <span>{t('m.email')}</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <em role="alert">{errors.email}</em>}
                </label>
                <div className="book__total">
                  <span>{t('m.total')}</span>
                  <motion.strong key={guests} initial={{ y: -6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }}>
                    {money(tour.price * guests)}
                  </motion.strong>
                </div>
                <button type="submit" className="btn btn--coral btn--block">
                  {t('m.submit')}
                </button>
                <small className="book__note">{t('m.note')}</small>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
