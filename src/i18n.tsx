import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from './data/tours';

const dict = {
  ru: {
    'meta.title': 'Voyage — путешествия, которые запоминаются',
    'nav.tours': 'Туры',
    'nav.why': 'Почему мы',
    'nav.reviews': 'Отзывы',
    'nav.contact': 'Контакты',
    'nav.menu': 'Меню',
    'fav.aria': 'Избранные туры: {n}',
    'hero.kicker': 'Авторские туры небольшими группами',
    'hero.t1': 'Мир ближе,',
    'hero.t2': 'чем кажется',
    'hero.lead': 'Продуманные маршруты, лучшие гиды и никаких очередей. Вы выбираете направление — мы берём на себя всё остальное.',
    'search.where': 'Куда',
    'search.anywhere': 'Куда угодно',
    'search.budget': 'Бюджет',
    'search.anybudget': 'Любой',
    'search.days': 'Срок',
    'search.anydays': 'Любая',
    'search.go': 'Найти туры',
    'hero.rating': '2 800+ отзывов',
    'hero.groups': 'Группы до 12 человек',
    'stat.1': 'лет организуем путешествия',
    'stat.2': 'стран в каталоге',
    'stat.3': 'довольных путешественников',
    'stat.4': 'средняя оценка туров',
    'tours.kicker': 'Каталог',
    'tours.title': 'Куда отправимся?',
    'tours.found': 'Найдено туров: {n}',
    'f.all': 'Все',
    'c.europe': 'Европа',
    'c.asia': 'Азия',
    'c.africa': 'Африка',
    'c.namerica': 'Сев. Америка',
    'c.samerica': 'Юж. Америка',
    'f.price': 'Бюджет до',
    'f.days': 'Дней',
    'd.short': 'до 7',
    'd.mid': '8–10',
    'd.long': '11+',
    'f.sort': 'Сортировка',
    's.popular': 'Популярные',
    's.priceAsc': 'Сначала дешевле',
    's.priceDesc': 'Сначала дороже',
    's.rating': 'По рейтингу',
    's.days': 'По длительности',
    'f.favs': 'Только избранное',
    'f.reset': 'Сбросить фильтры',
    'empty.title': 'Ничего не нашлось',
    'empty.text': 'Попробуйте смягчить фильтры — например, увеличить бюджет.',
    'card.days': '{n} дн.',
    'card.group': 'до {n} чел.',
    'card.from': 'от',
    'card.more': 'Подробнее',
    'card.fav': 'В избранное',
    'card.unfav': 'Убрать из избранного',
    'card.level': 'Сложность',
    'lvl.1': 'лёгкий',
    'lvl.2': 'средний',
    'lvl.3': 'сложный',
    'm.close': 'Закрыть',
    'm.highlights': 'Главное в туре',
    'm.route': 'Маршрут',
    'm.book': 'Бронирование',
    'm.date': 'Дата начала',
    'm.guests': 'Путешественников',
    'm.name': 'Ваше имя',
    'm.email': 'Эл. почта',
    'm.total': 'Итого',
    'm.submit': 'Отправить заявку',
    'm.note': 'Без предоплаты — менеджер свяжется в течение часа.',
    'm.err.name': 'Укажите имя',
    'm.err.email': 'Проверьте адрес почты',
    'm.err.date': 'Выберите дату',
    'm.ok.title': 'Заявка отправлена!',
    'm.ok.text': 'Мы забронировали для вас место в туре «{tour}» и скоро напишем на {email}.',
    'm.ok.btn': 'Отлично',
    'm.day': 'День {n}',
    'why.kicker': 'Почему Voyage',
    'why.title': 'Путешествие без забот — от идеи до возвращения',
    'why.1t': 'Маленькие группы',
    'why.1p': 'До 12 человек — больше внимания, меньше суеты и доступ туда, куда не пускают автобусы.',
    'why.2t': 'Гиды-местные',
    'why.2p': 'Мы работаем только с людьми, которые живут там, куда вы едете.',
    'why.3t': 'Честная цена',
    'why.3p': 'Всё включено в стоимость: трансферы, проживание, входные билеты. Никаких доплат на месте.',
    'why.4t': 'Поддержка 24/7',
    'why.4p': 'Живой человек на связи в любое время — даже если вы в палатке посреди Сахары.',
    'rev.kicker': 'Отзывы',
    'rev.title': 'Что говорят путешественники',
    'rev.1': 'Сияние появилось в первую же ночь, а гид знал, где встать, чтобы не было ни одного фонаря. Лучшая неделя года.',
    'rev.1a': 'Марина, Исландия',
    'rev.2': 'Алтай перевернул представление об отдыхе в России. Организация на уровне лучших зарубежных туров.',
    'rev.2a': 'Дмитрий, Горный Алтай',
    'rev.3': 'Заявку подтвердили за 20 минут, а в Марокко всё было ровно так, как в описании. Поеду с Voyage снова.',
    'rev.3a': 'Алина, Марокко',
    'cta.title': 'Получайте подборку горящих туров',
    'cta.text': 'Раз в неделю — лучшие предложения и идеи для путешествий. Без спама.',
    'cta.placeholder': 'you@example.com',
    'cta.btn': 'Подписаться',
    'cta.ok': 'Готово! Первое письмо придёт в понедельник ✈️',
    'cta.err': 'Введите корректный адрес почты',
    'ft.about': 'Авторские туры небольшими группами с 2012 года.',
    'ft.company': 'Компания',
    'ft.help': 'Помощь',
    'ft.faq': 'Частые вопросы',
    'ft.insurance': 'Страховка',
    'ft.visa': 'Визы',
    'ft.social': 'Соцсети',
    'ft.copy': '© 2026 Voyage · Концепт-сайт для портфолио, заявки не отправляются.',
    'toast.fav': 'Добавлено в избранное',
    'toast.unfav': 'Удалено из избранного',
  },
  en: {
    'meta.title': 'Voyage — journeys worth remembering',
    'nav.tours': 'Tours',
    'nav.why': 'Why us',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'fav.aria': 'Favourite tours: {n}',
    'hero.kicker': 'Small-group journeys, crafted by hand',
    'hero.t1': 'The world is',
    'hero.t2': 'closer than you think',
    'hero.lead': 'Thoughtful routes, the best local guides and zero queues. You pick the destination — we take care of everything else.',
    'search.where': 'Where',
    'search.anywhere': 'Anywhere',
    'search.budget': 'Budget',
    'search.anybudget': 'Any',
    'search.days': 'Duration',
    'search.anydays': 'Any',
    'search.go': 'Find tours',
    'hero.rating': '2,800+ reviews',
    'hero.groups': 'Groups of up to 12',
    'stat.1': 'years crafting journeys',
    'stat.2': 'countries in our catalogue',
    'stat.3': 'happy travellers',
    'stat.4': 'average tour rating',
    'tours.kicker': 'Catalogue',
    'tours.title': 'Where to next?',
    'tours.found': '{n} tours found',
    'f.all': 'All',
    'c.europe': 'Europe',
    'c.asia': 'Asia',
    'c.africa': 'Africa',
    'c.namerica': 'N. America',
    'c.samerica': 'S. America',
    'f.price': 'Budget up to',
    'f.days': 'Days',
    'd.short': 'up to 7',
    'd.mid': '8–10',
    'd.long': '11+',
    'f.sort': 'Sort by',
    's.popular': 'Most popular',
    's.priceAsc': 'Price: low to high',
    's.priceDesc': 'Price: high to low',
    's.rating': 'Top rated',
    's.days': 'Duration',
    'f.favs': 'Favourites only',
    'f.reset': 'Reset filters',
    'empty.title': 'Nothing found',
    'empty.text': 'Try loosening the filters — for example, raise your budget.',
    'card.days': '{n} days',
    'card.group': 'up to {n}',
    'card.from': 'from',
    'card.more': 'Details',
    'card.fav': 'Add to favourites',
    'card.unfav': 'Remove from favourites',
    'card.level': 'Difficulty',
    'lvl.1': 'easy',
    'lvl.2': 'moderate',
    'lvl.3': 'challenging',
    'm.close': 'Close',
    'm.highlights': 'Highlights',
    'm.route': 'Route',
    'm.book': 'Book this tour',
    'm.date': 'Start date',
    'm.guests': 'Travellers',
    'm.name': 'Your name',
    'm.email': 'Email',
    'm.total': 'Total',
    'm.submit': 'Request booking',
    'm.note': 'No prepayment — a travel manager will reply within the hour.',
    'm.err.name': 'Please enter your name',
    'm.err.email': 'Please check your email',
    'm.err.date': 'Please pick a date',
    'm.ok.title': 'Request sent!',
    'm.ok.text': 'We have held a spot for you on “{tour}” and will write to {email} shortly.',
    'm.ok.btn': 'Great',
    'm.day': 'Day {n}',
    'why.kicker': 'Why Voyage',
    'why.title': 'Carefree travel — from the first idea to the flight home',
    'why.1t': 'Small groups',
    'why.1p': 'Up to 12 people — more attention, less fuss and access to places tour buses can’t reach.',
    'why.2t': 'Local guides',
    'why.2p': 'We only work with people who actually live where you’re going.',
    'why.3t': 'Honest pricing',
    'why.3p': 'Transfers, stays and tickets are all included. No surprise fees on the ground.',
    'why.4t': '24/7 support',
    'why.4p': 'A real human on call at any hour — even if you’re in a tent in the middle of the Sahara.',
    'rev.kicker': 'Reviews',
    'rev.title': 'What travellers say',
    'rev.1': 'The aurora showed up on the very first night, and our guide knew a spot without a single street light. Best week of the year.',
    'rev.1a': 'Marina, Iceland',
    'rev.2': 'Altai completely changed how I see holidays in Russia. Organisation on par with the best tours abroad.',
    'rev.2a': 'Dmitry, Altai',
    'rev.3': 'They confirmed my request in 20 minutes, and Morocco was exactly as described. I’ll travel with Voyage again.',
    'rev.3a': 'Alina, Morocco',
    'cta.title': 'Get our weekly last-minute deals',
    'cta.text': 'Once a week — the best offers and travel ideas. No spam.',
    'cta.placeholder': 'you@example.com',
    'cta.btn': 'Subscribe',
    'cta.ok': 'Done! Your first email arrives on Monday ✈️',
    'cta.err': 'Please enter a valid email',
    'ft.about': 'Small-group journeys crafted by hand since 2012.',
    'ft.company': 'Company',
    'ft.help': 'Help',
    'ft.faq': 'FAQ',
    'ft.insurance': 'Insurance',
    'ft.visa': 'Visas',
    'ft.social': 'Social',
    'ft.copy': '© 2026 Voyage · Concept website for a portfolio, no requests are sent.',
    'toast.fav': 'Added to favourites',
    'toast.unfav': 'Removed from favourites',
  },
} satisfies Record<Lang, Record<string, string>>;

export type Key = keyof (typeof dict)['ru'];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key, vars?: Record<string, string | number>) => string;
  money: (n: number) => string;
  num: (n: number, digits?: number) => string;
};

const I18nContext = createContext<Ctx | null>(null);

function readLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* storage blocked */
  }
  return 'ru';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang]['meta.title'];
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    return {
      lang,
      setLang,
      t: (key, vars = {}) => dict[lang][key].replace(/\{(\w+)\}/g, (_, v: string) => String(vars[v] ?? '')),
      money: (n) => currency.format(n),
      num: (n, digits = 0) => n.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
