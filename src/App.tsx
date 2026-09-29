import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from './i18n';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultFilters, type Filters } from './types';
import type { Tour } from './data/tours';
import Header from './components/Header';
import Hero from './components/Hero';
import Tours from './components/Tours';
import TourModal from './components/TourModal';
import { Footer, Newsletter, Reviews, Stats, Why } from './components/Sections';

export default function App() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [favs, setFavs] = useLocalStorage<string[]>('voyage-favs', []);
  const [open, setOpen] = useState<Tour | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>(undefined);

  const notify = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  const toggleFav = (id: string) => {
    const on = !favs.includes(id);
    setFavs(on ? [...favs, id] : favs.filter((f) => f !== id));
    notify(on ? t('toast.fav') : t('toast.unfav'));
  };

  const scrollToTours = () => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const search = (f: Partial<Filters>) => {
    setFilters({ ...defaultFilters, ...f });
    scrollToTours();
  };

  const showFavs = () => {
    setFilters({ ...defaultFilters, favsOnly: favs.length > 0 });
    scrollToTours();
  };

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  return (
    <>
      <Header favCount={favs.length} onFavs={showFavs} />
      <main>
        <Hero onSearch={search} />
        <Stats />
        <Tours filters={filters} setFilters={setFilters} favs={favs} toggleFav={toggleFav} onOpen={setOpen} />
        <Why />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />

      <AnimatePresence>{open && <TourModal key={open.id} tour={open} onClose={close} />}</AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" role="status" initial={{ y: 60, opacity: 0, x: '-50%' }} animate={{ y: 0, opacity: 1, x: '-50%' }} exit={{ y: 60, opacity: 0, x: '-50%' }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
