import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import type { Tour } from '../data/tours';
import Scene from './Scene';

type Props = { tour: Tour; fav: boolean; onFav: () => void; onOpen: () => void };

const TourCard = forwardRef<HTMLElement, Props>(function TourCard({ tour, fav, onFav, onOpen }, ref) {
  const { t, lang, money, num } = useI18n();

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="tcard"
    >
      <div className="tcard__media">
        <Scene config={tour.scene} className="tcard__scene" />
        {tour.tag && <span className="tcard__tag">{tour.tag[lang]}</span>}
        <motion.button
          className={`heart${fav ? ' is-on' : ''}`}
          onClick={onFav}
          whileTap={{ scale: 0.8 }}
          aria-pressed={fav}
          aria-label={`${fav ? t('card.unfav') : t('card.fav')}: ${tour.title[lang]}`}
        >
          <motion.svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" key={String(fav)} initial={fav ? { scale: 0.4 } : false} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
            <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3.2 4.5 6.8 4.5c2 0 3.5 1.1 4.2 2.5.7-1.4 2.2-2.5 4.2-2.5 3.6 0 5.6 3.7 4 6.9C19 15.6 12 20 12 20Z" />
          </motion.svg>
        </motion.button>
        <span className="tcard__days">{t('card.days', { n: tour.days })}</span>
      </div>

      <div className="tcard__body">
        <div className="tcard__row">
          <span className="tcard__place">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="10" r="2.3" fill="currentColor" />
            </svg>
            {tour.place[lang]}
          </span>
          <span className="tcard__rating">
            ★ {num(tour.rating, 1)} <small>({tour.reviews})</small>
          </span>
        </div>
        <h3 className="tcard__title">{tour.title[lang]}</h3>
        <p className="tcard__blurb">{tour.blurb[lang]}</p>
        <div className="tcard__meta">
          <span>👥 {t('card.group', { n: tour.group })}</span>
          <span className="level" title={t('card.level')}>
            {[1, 2, 3].map((i) => (
              <i key={i} className={i <= tour.level ? 'on' : ''} />
            ))}
            {t(`lvl.${tour.level}`)}
          </span>
        </div>
        <div className="tcard__foot">
          <p className="tcard__price">
            <small>{t('card.from')}</small> {money(tour.price)}
          </p>
          <button className="btn btn--dark btn--sm" onClick={onOpen}>
            {t('card.more')}
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export default TourCard;
