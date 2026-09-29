import type { SceneConfig } from '../components/Scene';

export type Lang = 'ru' | 'en';
export type Continent = 'europe' | 'asia' | 'africa' | 'namerica' | 'samerica';
type T = Record<Lang, string>;

export type Tour = {
  id: string;
  title: T;
  place: T;
  continent: Continent;
  days: number;
  price: number;
  rating: number;
  reviews: number;
  group: number;
  level: 1 | 2 | 3;
  tag?: T;
  blurb: T;
  highlights: Record<Lang, string[]>;
  itinerary: Record<Lang, [string, string][]>;
  scene: SceneConfig;
};

export const tours: Tour[] = [
  {
    id: 'iceland',
    title: { ru: 'Северное сияние Исландии', en: 'Northern Lights of Iceland' },
    place: { ru: 'Исландия', en: 'Iceland' },
    continent: 'europe',
    days: 7,
    price: 2190,
    rating: 4.9,
    reviews: 214,
    group: 10,
    level: 2,
    tag: { ru: 'Хит сезона', en: 'Season hit' },
    blurb: {
      ru: 'Ледники, чёрные пляжи и охота за сиянием с фотографом.',
      en: 'Glaciers, black-sand beaches and an aurora hunt with a photographer.',
    },
    highlights: {
      ru: ['Ночная охота за сиянием', 'Ледяные пещеры Ватнайёкюдля', 'Горячие источники под звёздами'],
      en: ['Night-time aurora hunt', 'Vatnajökull ice caves', 'Hot springs under the stars'],
    },
    itinerary: {
      ru: [['Рейкьявик', 'Встреча, ужин и брифинг'], ['Золотое кольцо', 'Гейзеры и водопад Гюдльфосс'], ['Южное побережье', 'Чёрный пляж Рейнисфьяра'], ['Ледник', 'Пещеры и лагуна Йокульсаурлоун']],
      en: [['Reykjavík', 'Welcome dinner and briefing'], ['Golden Circle', 'Geysers and Gullfoss falls'], ['South coast', 'Reynisfjara black beach'], ['Glacier', 'Ice caves and Jökulsárlón lagoon']],
    },
    scene: { kind: 'aurora', seed: 11, night: true, palette: { sky: ['#0b1026', '#1d2b53'], sun: '#e8f0ff', far: '#1a2340', mid: '#131a33', near: '#0a0f22', accent: '#5dffb0' } },
  },
  {
    id: 'santorini',
    title: { ru: 'Закаты Санторини', en: 'Santorini Sunsets' },
    place: { ru: 'Греция', en: 'Greece' },
    continent: 'europe',
    days: 6,
    price: 1540,
    rating: 4.8,
    reviews: 389,
    group: 12,
    level: 1,
    blurb: { ru: 'Белые домики, вулканические пляжи и яхтенный закат.', en: 'Whitewashed villages, volcanic beaches and a sunset sail.' },
    highlights: {
      ru: ['Закат в Ии', 'Прогулка на яхте к кальдере', 'Дегустация вин ассиртико'],
      en: ['Sunset in Oia', 'Sailing trip to the caldera', 'Assyrtiko wine tasting'],
    },
    itinerary: {
      ru: [['Фира', 'Заселение с видом на кальдеру'], ['Кальдера', 'Яхта, купание у горячих источников'], ['Ия', 'Прогулка и знаменитый закат']],
      en: [['Fira', 'Check-in with caldera views'], ['Caldera', 'Sailing and hot-spring swim'], ['Oia', 'Walk and the famous sunset']],
    },
    scene: { kind: 'sea', seed: 23, palette: { sky: ['#ff9a8b', '#ffd3a5'], sun: '#fff1c1', far: '#6aa6d6', mid: '#3d7fb8', near: '#e9d8c4', water: '#4f93c9', accent: '#2b6cb0' } },
  },
  {
    id: 'kyoto',
    title: { ru: 'Сакура в Киото', en: 'Cherry Blossom Kyoto' },
    place: { ru: 'Япония', en: 'Japan' },
    continent: 'asia',
    days: 9,
    price: 2850,
    rating: 4.9,
    reviews: 176,
    group: 8,
    level: 1,
    tag: { ru: 'Весна', en: 'Spring' },
    blurb: { ru: 'Храмы, чайная церемония и цветение сакуры с местным гидом.', en: 'Temples, a tea ceremony and blossom season with a local guide.' },
    highlights: {
      ru: ['Бамбуковая роща Арасиямы', 'Чайная церемония в мачия', 'Ночёвка в рёкане с онсэном'],
      en: ['Arashiyama bamboo grove', 'Tea ceremony in a machiya', 'Night in a ryokan with onsen'],
    },
    itinerary: {
      ru: [['Токио', 'Сибуя и Асакуса'], ['Хаконэ', 'Рёкан и вид на Фудзи'], ['Киото', 'Храмы и Гион'], ['Нара', 'Олени и храм Тодай-дзи']],
      en: [['Tokyo', 'Shibuya and Asakusa'], ['Hakone', 'Ryokan and Mt Fuji views'], ['Kyoto', 'Temples and Gion'], ['Nara', 'Deer and Tōdai-ji']],
    },
    scene: { kind: 'mountains', seed: 37, palette: { sky: ['#ffd6e0', '#fff4ec'], sun: '#ff7b9c', far: '#c9a3c8', mid: '#9c7aa8', near: '#f7a8c0', accent: '#d94873' } },
  },
  {
    id: 'sahara',
    title: { ru: 'Ночь в пустыне Сахара', en: 'A Night in the Sahara' },
    place: { ru: 'Марокко', en: 'Morocco' },
    continent: 'africa',
    days: 5,
    price: 980,
    rating: 4.7,
    reviews: 298,
    group: 14,
    level: 2,
    blurb: { ru: 'Караван верблюдов, лагерь среди дюн и небо, полное звёзд.', en: 'A camel caravan, a camp among the dunes and a sky full of stars.' },
    highlights: {
      ru: ['Дюны Эрг-Шебби на рассвете', 'Ночь в берберском лагере', 'Медина Марракеша'],
      en: ['Erg Chebbi dunes at sunrise', 'Night in a Berber camp', 'Marrakech medina'],
    },
    itinerary: {
      ru: [['Марракеш', 'Медина и площадь Джемаа-эль-Фна'], ['Атлас', 'Касба Айт-Бен-Хадду'], ['Сахара', 'Караван и лагерь в дюнах']],
      en: [['Marrakech', 'Medina and Jemaa el-Fnaa'], ['Atlas', 'Aït Benhaddou kasbah'], ['Sahara', 'Caravan and dune camp']],
    },
    scene: { kind: 'desert', seed: 41, palette: { sky: ['#f4a261', '#ffe8c2'], sun: '#fff3d6', far: '#e9a86b', mid: '#d98b4f', near: '#c56f38' } },
  },
  {
    id: 'patagonia',
    title: { ru: 'Треккинг по Патагонии', en: 'Patagonia Trek' },
    place: { ru: 'Чили и Аргентина', en: 'Chile & Argentina' },
    continent: 'samerica',
    days: 12,
    price: 3400,
    rating: 5,
    reviews: 97,
    group: 8,
    level: 3,
    tag: { ru: 'Экспедиция', en: 'Expedition' },
    blurb: { ru: 'Торрес-дель-Пайне, ледник Перито-Морено и ветер края света.', en: 'Torres del Paine, Perito Moreno glacier and the winds at the end of the world.' },
    highlights: {
      ru: ['Маршрут W в Торрес-дель-Пайне', 'Ледник Перито-Морено', 'Гора Фицрой на рассвете'],
      en: ['The W trek in Torres del Paine', 'Perito Moreno glacier', 'Mount Fitz Roy at dawn'],
    },
    itinerary: {
      ru: [['Пуэрто-Наталес', 'Подготовка и брифинг'], ['Торрес-дель-Пайне', '4 дня треккинга'], ['Эль-Калафате', 'Ледник'], ['Эль-Чальтен', 'Фицрой']],
      en: [['Puerto Natales', 'Gear-up and briefing'], ['Torres del Paine', '4 days of trekking'], ['El Calafate', 'The glacier'], ['El Chaltén', 'Fitz Roy']],
    },
    scene: { kind: 'mountains', seed: 53, palette: { sky: ['#8ec5fc', '#e0f2ff'], sun: '#ffffff', far: '#6b7fa3', mid: '#465a7e', near: '#2f3e5a', water: '#5fa8d3' } },
  },
  {
    id: 'bali',
    title: { ru: 'Острова Бали', en: 'Islands of Bali' },
    place: { ru: 'Индонезия', en: 'Indonesia' },
    continent: 'asia',
    days: 10,
    price: 1760,
    rating: 4.8,
    reviews: 452,
    group: 12,
    level: 1,
    blurb: { ru: 'Рисовые террасы, храмы у океана и серфинг на рассвете.', en: 'Rice terraces, ocean temples and sunrise surfing.' },
    highlights: {
      ru: ['Террасы Джатилувих', 'Рассвет на вулкане Батур', 'Снорклинг на Нуса-Пенида'],
      en: ['Jatiluwih rice terraces', 'Sunrise on Mount Batur', 'Snorkelling at Nusa Penida'],
    },
    itinerary: {
      ru: [['Убуд', 'Джунгли и террасы'], ['Батур', 'Восхождение на рассвете'], ['Нуса-Пенида', 'Скалы и мантры']],
      en: [['Ubud', 'Jungle and terraces'], ['Batur', 'Sunrise hike'], ['Nusa Penida', 'Cliffs and manta rays']],
    },
    scene: { kind: 'islands', seed: 67, palette: { sky: ['#36d1dc', '#c6f7e2'], sun: '#fffbd1', far: '#2bb3c0', mid: '#179a8e', near: '#f3e2b3', water: '#1fb5c4', accent: '#0f5132' } },
  },
  {
    id: 'newyork',
    title: { ru: 'Огни Нью-Йорка', en: 'New York City Lights' },
    place: { ru: 'США', en: 'USA' },
    continent: 'namerica',
    days: 5,
    price: 1990,
    rating: 4.6,
    reviews: 511,
    group: 16,
    level: 1,
    blurb: { ru: 'Бродвей, крыши Манхэттена и джаз в Гарлеме.', en: 'Broadway, Manhattan rooftops and jazz in Harlem.' },
    highlights: {
      ru: ['Шоу на Бродвее', 'Закат с крыши Манхэттена', 'Велопрогулка по Бруклину'],
      en: ['A Broadway show', 'Sunset from a Manhattan rooftop', 'Bike ride through Brooklyn'],
    },
    itinerary: {
      ru: [['Манхэттен', 'Центральный парк и Хай-Лайн'], ['Бруклин', 'Мост и DUMBO'], ['Гарлем', 'Джаз и соул-фуд']],
      en: [['Manhattan', 'Central Park and the High Line'], ['Brooklyn', 'The bridge and DUMBO'], ['Harlem', 'Jazz and soul food']],
    },
    scene: { kind: 'city', seed: 71, night: true, palette: { sky: ['#1b1f4b', '#f46b45'], sun: '#ffd28a', far: '#2a2f5c', mid: '#1c2046', near: '#12142e', accent: '#ffd66b' } },
  },
  {
    id: 'fjords',
    title: { ru: 'Норвежские фьорды', en: 'Norwegian Fjords' },
    place: { ru: 'Норвегия', en: 'Norway' },
    continent: 'europe',
    days: 8,
    price: 2450,
    rating: 4.9,
    reviews: 143,
    group: 10,
    level: 2,
    blurb: { ru: 'Скала Прекестулен, каяки по Гейрангерфьорду и тишина.', en: 'Preikestolen, kayaking the Geirangerfjord and a lot of silence.' },
    highlights: {
      ru: ['Скала-кафедра Прекестулен', 'Каяки по фьорду', 'Поезд Фломсбана'],
      en: ['Preikestolen pulpit rock', 'Kayaking the fjord', 'The Flåm railway'],
    },
    itinerary: {
      ru: [['Берген', 'Ганзейская набережная'], ['Флом', 'Поезд и фьорд'], ['Гейрангер', 'Каяки'], ['Ставангер', 'Прекестулен']],
      en: [['Bergen', 'Hanseatic wharf'], ['Flåm', 'Railway and fjord'], ['Geiranger', 'Kayaking'], ['Stavanger', 'Preikestolen']],
    },
    scene: { kind: 'mountains', seed: 83, palette: { sky: ['#a1c4fd', '#eef5ff'], sun: '#fff8e1', far: '#4f6d7a', mid: '#3a5561', near: '#253d46', water: '#35627a' } },
  },
  {
    id: 'maldives',
    title: { ru: 'Лагуны Мальдив', en: 'Maldives Lagoons' },
    place: { ru: 'Мальдивы', en: 'Maldives' },
    continent: 'asia',
    days: 7,
    price: 3100,
    rating: 4.9,
    reviews: 260,
    group: 6,
    level: 1,
    tag: { ru: 'Премиум', en: 'Premium' },
    blurb: { ru: 'Виллы над водой, китовые акулы и песчаные косы.', en: 'Overwater villas, whale sharks and sandbanks.' },
    highlights: {
      ru: ['Вилла над лагуной', 'Плавание с китовыми акулами', 'Ужин на песчаной косе'],
      en: ['Overwater villa', 'Swimming with whale sharks', 'Dinner on a sandbank'],
    },
    itinerary: {
      ru: [['Мале', 'Гидросамолёт на остров'], ['Атолл Ари', 'Снорклинг'], ['Коса', 'Закат и ужин']],
      en: [['Malé', 'Seaplane to the island'], ['Ari Atoll', 'Snorkelling'], ['Sandbank', 'Sunset dinner']],
    },
    scene: { kind: 'islands', seed: 97, palette: { sky: ['#4facfe', '#e0fbff'], sun: '#ffffff', far: '#41d1e0', mid: '#20b2c4', near: '#fff3d0', water: '#34d3e0', accent: '#155e63' } },
  },
  {
    id: 'altai',
    title: { ru: 'Горный Алтай', en: 'Altai Mountains' },
    place: { ru: 'Россия', en: 'Russia' },
    continent: 'asia',
    days: 8,
    price: 890,
    rating: 4.8,
    reviews: 331,
    group: 12,
    level: 2,
    tag: { ru: 'Выбор редакции', en: "Editor's pick" },
    blurb: { ru: 'Бирюзовая Катунь, Чуйский тракт и марсианские пейзажи Кызыл-Чина.', en: 'Turquoise Katun river, the Chuya highway and the Martian hills of Kyzyl-Chin.' },
    highlights: {
      ru: ['Чуйский тракт', 'Марс Кызыл-Чин', 'Гейзерное озеро'],
      en: ['Chuya highway road trip', 'Kyzyl-Chin "Mars" valley', 'Geyser lake'],
    },
    itinerary: {
      ru: [['Горно-Алтайск', 'Встреча'], ['Катунь', 'Бирюзовые перекаты'], ['Чуйский тракт', 'Перевал Кату-Ярык'], ['Кызыл-Чин', 'Цветные горы']],
      en: [['Gorno-Altaysk', 'Meet-up'], ['Katun', 'Turquoise rapids'], ['Chuya highway', 'Katu-Yaryk pass'], ['Kyzyl-Chin', 'Coloured hills']],
    },
    scene: { kind: 'forest', seed: 101, palette: { sky: ['#b8e1dd', '#f6fbf4'], sun: '#fff6d5', far: '#8fb3a9', mid: '#3e6b5a', near: '#244a3c', water: '#3fc1c9' } },
  },
  {
    id: 'kenya',
    title: { ru: 'Сафари в Кении', en: 'Kenya Safari' },
    place: { ru: 'Кения', en: 'Kenya' },
    continent: 'africa',
    days: 9,
    price: 3650,
    rating: 4.9,
    reviews: 188,
    group: 8,
    level: 1,
    blurb: { ru: 'Большая миграция в Масаи-Мара и шампанское на рассвете.', en: 'The Great Migration in the Masai Mara and champagne at dawn.' },
    highlights: {
      ru: ['Большая пятёрка', 'Полёт на воздушном шаре', 'Деревня масаев'],
      en: ['The Big Five', 'Hot-air balloon flight', 'Maasai village visit'],
    },
    itinerary: {
      ru: [['Найроби', 'Слоновий приют'], ['Масаи-Мара', 'Сафари и шар'], ['Накуру', 'Фламинго и носороги']],
      en: [['Nairobi', 'Elephant orphanage'], ['Masai Mara', 'Safari and balloon'], ['Nakuru', 'Flamingos and rhinos']],
    },
    scene: { kind: 'savanna', seed: 113, palette: { sky: ['#ff7e5f', '#feb47b'], sun: '#fff0c9', far: '#d88c4a', mid: '#c0763a', near: '#9c5a2a', accent: '#3b2415' } },
  },
  {
    id: 'banff',
    title: { ru: 'Озёра Банфа', en: 'Lakes of Banff' },
    place: { ru: 'Канада', en: 'Canada' },
    continent: 'namerica',
    days: 7,
    price: 2300,
    rating: 4.8,
    reviews: 205,
    group: 10,
    level: 2,
    blurb: { ru: 'Бирюзовое озеро Морейн, медведи гризли и хижины в лесу.', en: 'Turquoise Moraine Lake, grizzly bears and cabins in the woods.' },
    highlights: {
      ru: ['Озеро Морейн на рассвете', 'Трасса Айсфилдс-Парквей', 'Каноэ на Луизе'],
      en: ['Moraine Lake at sunrise', 'Icefields Parkway drive', 'Canoe on Lake Louise'],
    },
    itinerary: {
      ru: [['Калгари', 'Встреча'], ['Банф', 'Горячие источники'], ['Луиза', 'Каноэ'], ['Джаспер', 'Ледники']],
      en: [['Calgary', 'Meet-up'], ['Banff', 'Hot springs'], ['Lake Louise', 'Canoeing'], ['Jasper', 'Glaciers']],
    },
    scene: { kind: 'forest', seed: 127, palette: { sky: ['#89f7fe', '#dff9ff'], sun: '#ffffff', far: '#6f8fa6', mid: '#2f5d50', near: '#1d3b33', water: '#26c6da' } },
  },
];

export const continents: Continent[] = ['europe', 'asia', 'africa', 'namerica', 'samerica'];
