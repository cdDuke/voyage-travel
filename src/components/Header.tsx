import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import type { Lang } from '../data/tours';

const links = [
  ['#tours', 'nav.tours'],
  ['#why', 'nav.why'],
  ['#reviews', 'nav.reviews'],
  ['#contact', 'nav.contact'],
] as const;

export default function Header({ favCount, onFavs }: { favCount: number; onFavs: () => void }) {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="header__inner">
        <a href="#top" className="logo" aria-label="Voyage">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
            <circle cx="22" cy="10" r="4.5" fill="var(--coral)" />
            <path d="M2 27 12 13l5 6 4-4 9 12Z" fill="currentColor" />
          </svg>
          Voyage
        </a>

        <nav className="nav" aria-label="Main">
          {links.map(([href, key]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang" role="group" aria-label="Language">
            {(['ru', 'en'] as Lang[]).map((l) => (
              <button key={l} className={l === lang ? 'is-active' : ''} aria-pressed={l === lang} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="fav-btn" onClick={onFavs} aria-label={t('fav.aria', { n: favCount })}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3.2 4.5 6.8 4.5c2 0 3.5 1.1 4.2 2.5.7-1.4 2.2-2.5 4.2-2.5 3.6 0 5.6 3.7 4 6.9C19 15.6 12 20 12 20Z" fill={favCount ? 'var(--coral)' : 'none'} stroke="currentColor" strokeWidth="1.7" />
            </svg>
            {favCount > 0 && <span className="fav-btn__count">{favCount}</span>}
          </button>
          <button className="burger" aria-expanded={open} aria-controls="mnav" aria-label={t('nav.menu')} onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className="mnav" id="mnav" aria-label="Mobile" hidden={!open}>
        {links.map(([href, key]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {t(key)}
          </a>
        ))}
      </nav>
    </header>
  );
}
