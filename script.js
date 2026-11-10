const maps = [
  { id: 'mangystau', src: 'images/maps/map11.png', thumb: 'images/thumbs/map11.wbm', portrait: true, title: 'Мангистауская область', region: 'Мангистауская область', type: 'region', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'FABDEM' },
  { id: 'akmola', src: 'images/maps/map6.jpg', thumb: 'images/thumbs/map6.jpg', title: 'Акмолинская область', region: 'Акмолинская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'west-kazakhstan', src: 'images/maps/map7.jpg', thumb: 'images/thumbs/map7.jpg', title: 'Западно-Казахстанская область', region: 'Западно-Казахстанская область', type: 'region', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { id: 'atyrau', src: 'images/maps/map9.jpg', thumb: 'images/thumbs/map9.jpg', title: 'Атырауская область', region: 'Атырауская область', type: 'region', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { id: 'kostanay', src: 'images/maps/map1.jpg', thumb: 'images/thumbs/map1.jpg', title: 'Костанайская область', region: 'Костанайская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 41N', dem: 'Copernicus GLO-30' },
  { id: 'pavlodar', src: 'images/maps/map4.jpg', thumb: 'images/thumbs/map4.jpg', title: 'Павлодарская область', region: 'Павлодарская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 43N', dem: 'Copernicus GLO-30' },
  { id: 'north-kazakhstan', src: 'images/maps/map3.jpg', thumb: 'images/thumbs/map3.jpg', title: 'Северо-Казахстанская область', region: 'Северо-Казахстанская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'g-musrepov', src: 'images/maps/map2.jpg', thumb: 'images/thumbs/map2.jpg', title: 'Район имени Г. Мусрепова', region: 'Северо-Казахстанская область', parentRegionId: 'north-kazakhstan', type: 'district', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'aiyrtau', src: 'images/maps/map8.jpg', thumb: 'images/thumbs/map8.jpg', title: 'Айыртауский район', region: 'Северо-Казахстанская область', parentRegionId: 'north-kazakhstan', type: 'district', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'shal-akyn', src: 'images/maps/map10.jpg', thumb: 'images/thumbs/map10.jpg', title: 'Район Шал акына', region: 'Северо-Казахстанская область', parentRegionId: 'north-kazakhstan', type: 'district', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'sozak', src: 'images/maps/map5.jpg', thumb: 'images/thumbs/map5.jpg', title: 'Сузакский район', region: 'Туркестанская область', parentRegionId: 'turkistan', type: 'district', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' }
];


/* Билингвальный интерфейс: оригинальные названия карт хранятся для стабильной аналитики. */
const mapNamesKk = {
  'mangystau': { title: 'Маңғыстау облысы', region: 'Маңғыстау облысы' },
  'akmola': { title: 'Ақмола облысы', region: 'Ақмола облысы' },
  'west-kazakhstan': { title: 'Батыс Қазақстан облысы', region: 'Батыс Қазақстан облысы' },
  'atyrau': { title: 'Атырау облысы', region: 'Атырау облысы' },
  'kostanay': { title: 'Қостанай облысы', region: 'Қостанай облысы' },
  'pavlodar': { title: 'Павлодар облысы', region: 'Павлодар облысы' },
  'north-kazakhstan': { title: 'Солтүстік Қазақстан облысы', region: 'Солтүстік Қазақстан облысы' },
  'g-musrepov': { title: 'Ғабит Мүсірепов атындағы аудан', region: 'Солтүстік Қазақстан облысы' },
  'aiyrtau': { title: 'Айыртау ауданы', region: 'Солтүстік Қазақстан облысы' },
  'shal-akyn': { title: 'Шал ақын ауданы', region: 'Солтүстік Қазақстан облысы' },
  'sozak': { title: 'Созақ ауданы', region: 'Түркістан облысы' }
};

const translations = {
  ru: {
    pageTitle: 'LOCUS — цифровая картография Казахстана',
    metaDescription: 'LOCUS — авторская цифровая картография Казахстана. Карты рельефа областей и районов, раскрывающие пластику земной поверхности в административном контексте.',
    socialNav: 'Социальные сети',
    instagram: 'LOCUS в Instagram', facebook: 'LOCUS в Facebook', threads: 'LOCUS в Threads',
    goHome: 'LOCUS — на главную', brandDigital: 'Цифровая', brandCartography: 'Картография',
    mainNav: 'Основная навигация', navCatalog: 'Каталог', navContacts: 'Контакты', languageControl: 'Язык сайта',
    heroKicker: 'Цифровая картография Казахстана',
    heroTitle: 'Рельеф как образ территории',
    heroDescription: 'LOCUS — авторские карты рельефа Казахстана. Они показывают формы поверхности и перепады высот, дополняя их границами, населёнными пунктами, дорогами и гидрографией.',
    viewMaps: 'Смотреть карты', orderMap: 'Заказать карту',
    collectionStats: 'Статистика коллекции', mapsInCatalog: 'карт в каталоге', regionsRepresented: 'регионов представлены',
    supportSection: 'Поддержать LOCUS',
    supportMessage: 'Если карты вам нравятся, вы можете поддержать дальнейшую работу над проектом.',
    callPhone: 'Позвонить: +7 775 551 69 42',
    catalogHeading: 'Каталог карт', mapFilters: 'Фильтр карт',
    filterAll: 'Все', filterDistricts: 'Районы', filterRegions: 'Области',
    emptyCatalog: 'По вашему запросу карты не найдены.',
    catalogFuture: 'По мере работы карты всех областей Казахстана появятся в каталоге.',
    catalogOrderNote: 'Если вы хотите приобрести какую-либо из представленных карт или заказать другую — дайте знать! Я делаю цифровые карты. Если вам нужна бумажная карта или плакат — тоже дайте знать, и я посмотрю, что можно сделать.',
    contactKicker: 'Заказ и сотрудничество', contactTitle: 'Нужна карта для вашего проекта?',
    contactPhone: 'Телефон / WhatsApp:', contactEmail: 'Почта:',
    copyright: '© 2026 LOCUS · Барлық құқықтар қорғалған · Все права защищены · All rights reserved.',
    zoomOut: 'Уменьшить', zoomIn: 'Увеличить', resetZoom: 'Масштаб 100%', close: 'Закрыть',
    relatedMaps: 'Связанные карты', relatedTitle: 'Карты районов области',
    viewerHint: 'Колёсико мыши — масштаб · Esc — закрыть',
    passportLabel: 'Паспорт карты', passportYear: 'Год', passportProjection: 'Проекция', passportDem: 'Источник DEM',
    openMap: 'Открыть карту:', regionBadge: 'Область', districtBadge: 'Район'
  },
  kk: {
    pageTitle: 'LOCUS — Қазақстанның цифрлық картографиясы',
    metaDescription: 'LOCUS — Қазақстанның облыстары мен аудандарының жер бедерін көрсететін авторлық цифрлық карталар жобасы.',
    socialNav: 'Әлеуметтік желілер',
    instagram: 'LOCUS Instagram парақшасы', facebook: 'LOCUS Facebook парақшасы', threads: 'LOCUS Threads парақшасы',
    goHome: 'LOCUS — басты бетке', brandDigital: 'Цифрлық', brandCartography: 'Картография',
    mainNav: 'Негізгі мәзір', navCatalog: 'Каталог', navContacts: 'Байланыс', languageControl: 'Сайт тілі',
    heroKicker: 'Қазақстанның цифрлық картографиясы',
    heroTitle: 'Жер бедері — аумақтың бейнесі',
    heroDescription: 'LOCUS — Қазақстанның жер бедеріне арналған авторлық карталар. Олар жер бедерінің пішіндері мен биіктік айырмашылықтарын көрсетеді. Әкімшілік шекаралар, елді мекендер, жолдар мен гидрография карталарды толықтырады.',
    viewMaps: 'Карталарды көру', orderMap: 'Картаға тапсырыс беру',
    collectionStats: 'Карталар жинағының статистикасы', mapsInCatalog: 'каталогтағы карта', regionsRepresented: 'қамтылған өңір',
    supportSection: 'LOCUS жобасын қолдау',
    supportMessage: 'Егер карталар сізге ұнаса, жобаны әрі қарай дамытуға қолдау көрсете аласыз.',
    callPhone: 'Қоңырау шалу: +7 775 551 69 42',
    catalogHeading: 'Карталар каталогы', mapFilters: 'Карталарды сүзгілеу',
    filterAll: 'Барлығы', filterDistricts: 'Аудандар', filterRegions: 'Облыстар',
    emptyCatalog: 'Сұрауыңыз бойынша карталар табылмады.',
    catalogFuture: 'Уақыт өте келе каталогқа Қазақстанның барлық облыстарының карталары қосылады.',
    catalogOrderNote: 'Каталогтағы картаны сатып алғыңыз келсе немесе басқа аумақтың картасына тапсырыс бергіңіз келсе, хабарласыңыз! Мен цифрлық карталар жасаймын. Қағаз карта немесе плакат қажет болса, оны дайындау мүмкіндігін де қарастырамын.',
    contactKicker: 'Тапсырыс және ынтымақтастық', contactTitle: 'Жобаңызға карта қажет пе?',
    contactPhone: 'Телефон / WhatsApp:', contactEmail: 'Электрондық пошта:',
    copyright: '© 2026 LOCUS · Барлық құқықтар қорғалған.',
    zoomOut: 'Кішірейту', zoomIn: 'Үлкейту', resetZoom: 'Масштаб 100%', close: 'Жабу',
    relatedMaps: 'Байланысты карталар', relatedTitle: 'Облыс аудандарының карталары',
    viewerHint: 'Тінтуір дөңгелегі — масштабтау · Esc — жабу',
    passportLabel: 'Карта паспорты', passportYear: 'Жылы', passportProjection: 'Проекция', passportDem: 'DEM дереккөзі',
    openMap: 'Картаны ашу:', regionBadge: 'Облыс', districtBadge: 'Аудан'
  }
};

const urlLanguage = new URLSearchParams(window.location.search).get('lang');
let currentLanguage = ['ru', 'kk'].includes(urlLanguage) ? urlLanguage : 'ru';
if (!['ru', 'kk'].includes(urlLanguage)) {
  try {
    const savedLanguage = window.localStorage.getItem('locus-language');
    if (savedLanguage === 'ru' || savedLanguage === 'kk') currentLanguage = savedLanguage;
  } catch (_) { /* Режим приватного просмотра может запрещать хранение. */ }
}

function t(key) {
  return translations[currentLanguage][key] || translations.ru[key] || key;
}

function getMapTitle(map) {
  return currentLanguage === 'kk' ? (mapNamesKk[map.id]?.title || map.title) : map.title;
}

function getMapRegion(map) {
  return currentLanguage === 'kk' ? (mapNamesKk[map.id]?.region || map.region) : map.region;
}

function setLanguage(nextLanguage, fromUser = false) {
  if (nextLanguage !== 'ru' && nextLanguage !== 'kk') return;
  const changed = currentLanguage !== nextLanguage;
  currentLanguage = nextLanguage;
  document.documentElement.lang = nextLanguage;
  document.title = t('pageTitle');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = t('metaDescription');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelectorAll('.language-button').forEach(button => {
    const active = button.dataset.lang === nextLanguage;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  mapCollator = new Intl.Collator(nextLanguage === 'kk' ? 'kk' : 'ru', { sensitivity: 'base' });
  renderMaps();
  if (dialog.open && viewerImage.dataset.mapId) {
    const openedMap = getMapById(viewerImage.dataset.mapId);
    if (openedMap) applyMapLocale(openedMap);
  }
  if (fromUser) {
    try { window.localStorage.setItem('locus-language', nextLanguage); } catch (_) {}
    const url = new URL(window.location.href);
    if (nextLanguage === 'kk') url.searchParams.set('lang', 'kk');
    else url.searchParams.delete('lang');
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    if (changed) trackEvent('language_change', { language: nextLanguage });
  }
}

const grid = document.getElementById('mapGrid');
const emptyState = document.getElementById('emptyState');
const filterTabs = [...document.querySelectorAll('.filter-tab')];
const dialog = document.getElementById('mapDialog');
const viewerImage = document.getElementById('viewerImage');
const viewerStage = document.getElementById('viewerStage');
const dialogTitle = document.getElementById('dialogTitle');
const dialogRegion = document.getElementById('dialogRegion');
const zoomValue = document.getElementById('zoomValue');
const viewerShell = dialog.querySelector('.viewer-shell');
const relatedMaps = document.getElementById('relatedMaps');
const relatedMapsTitle = document.getElementById('relatedMapsTitle');
const relatedMapsList = document.getElementById('relatedMapsList');
const relatedBackButton = document.getElementById('relatedBackButton');

const passport = document.createElement('dl');
passport.className = 'map-passport';
passport.setAttribute('aria-label', 'Паспорт карты');
passport.dataset.i18nAria = 'passportLabel';
passport.innerHTML = `
  <div><dt data-i18n="passportYear">Год</dt><dd id="passportYear"></dd></div>
  <div><dt data-i18n="passportProjection">Проекция</dt><dd id="passportProjection"></dd></div>
  <div><dt data-i18n="passportDem">Источник DEM</dt><dd id="passportDem"></dd></div>
`;
viewerShell.appendChild(passport);

const passportYear = document.getElementById('passportYear');
const passportProjection = document.getElementById('passportProjection');
const passportDem = document.getElementById('passportDem');

let mapCollator = new Intl.Collator('ru', { sensitivity: 'base' });

function trackEvent(eventName, parameters = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, parameters);
}

let activeFilter = 'all';
let zoom = 1;
const minZoom = 1;
const maxZoom = 5;
const zoomStep = .2;

function getMapById(mapId) {
  return maps.find(map => map.id === mapId);
}

function sortMapsByTitle(items) {
  return [...items].sort((a, b) => mapCollator.compare(getMapTitle(a), getMapTitle(b)));
}

function getRegionMap(regionId) {
  return maps.find(map => map.type === 'region' && map.id === regionId);
}

function getDistrictsForRegion(regionId) {
  return sortMapsByTitle(
    maps.filter(map => map.type === 'district' && map.parentRegionId === regionId)
  );
}

function renderMaps() {
  let filtered;

  if (activeFilter === 'all') {
    filtered = maps.filter(map => {
      if (map.type === 'region') return true;
      return !getRegionMap(map.parentRegionId);
    });
  } else {
    filtered = maps.filter(map => map.type === activeFilter);
  }

  filtered = sortMapsByTitle(filtered);

  grid.innerHTML = filtered.map(map => `
    <article class="map-card${map.portrait ? ' map-card--portrait' : ''}">
      <button class="map-card-button" type="button" data-map-id="${map.id}" aria-label="${t('openMap')} ${getMapTitle(map)}">
        <span class="map-thumb">
          <img src="${map.thumb}" alt="${getMapTitle(map)}" loading="lazy" decoding="async" draggable="false"${map.portrait ? ` data-fallback-src="${map.src}"` : ''}>
        </span>
        <span class="map-label">
          <span class="map-title">${getMapTitle(map)}</span>
        </span>
      </button>
    </article>
  `).join('');

  emptyState.hidden = filtered.length !== 0;
}

function updateStats() {
  const representedRegions = new Set(
    maps.map(map => map.type === 'region' ? map.id : map.parentRegionId)
  );

  document.getElementById('mapCount').textContent = maps.length;
  document.getElementById('regionCount').textContent = representedRegions.size;
}

function resetZoom() {
  zoom = 1;
  viewerImage.style.transform = 'scale(1)';
  zoomValue.textContent = '100%';
  viewerStage.scrollTo({ left: 0, top: 0 });
}

function setZoom(nextZoom) {
  zoom = Math.min(maxZoom, Math.max(minZoom, nextZoom));
  viewerImage.style.transform = `scale(${zoom})`;
  zoomValue.textContent = `${Math.round(zoom * 100)}%`;
}

function renderRelatedMaps(map) {
  const regionMap = map.type === 'region' ? map : getRegionMap(map.parentRegionId);
  const districts = regionMap ? getDistrictsForRegion(regionMap.id) : [];

  if (!regionMap || districts.length === 0) {
    relatedMaps.hidden = true;
    relatedMapsList.innerHTML = '';
    relatedBackButton.hidden = true;
    relatedBackButton.removeAttribute('data-map-id');
    return;
  }

  relatedMapsTitle.textContent = t('relatedTitle');
  relatedMapsList.innerHTML = districts.map(district => `
    <button
      class="related-map-button${district.id === map.id ? ' active' : ''}"
      type="button"
      data-map-id="${district.id}"
      aria-label="${t('openMap')} ${getMapTitle(district)}"
      aria-current="${district.id === map.id ? 'true' : 'false'}"
    >
      <img src="${district.thumb}" alt="" loading="lazy" decoding="async" draggable="false">
      <span>${getMapTitle(district)}</span>
    </button>
  `).join('');

  if (map.type === 'district') {
    relatedBackButton.hidden = false;
    relatedBackButton.textContent = `← ${getMapTitle(regionMap)}`;
    relatedBackButton.dataset.mapId = regionMap.id;
  } else {
    relatedBackButton.hidden = true;
    relatedBackButton.removeAttribute('data-map-id');
  }

  relatedMaps.hidden = false;
}

function applyMapLocale(map) {
  const title = getMapTitle(map);
  const region = getMapRegion(map);
  viewerImage.alt = title;
  dialogTitle.textContent = title;
  const sameName = title === region;
  dialogRegion.hidden = sameName;
  dialogRegion.textContent = sameName ? '' : region;
  renderRelatedMaps(map);
}

function displayMap(map, openDialog = false, source = 'viewer') {
  if (!map) return;

  viewerImage.src = map.src;
  viewerImage.dataset.mapId = map.id;
  passportYear.textContent = map.year || '—';
  passportProjection.textContent = map.projection || '—';
  passportDem.textContent = map.dem || '—';

  applyMapLocale(map);
  resetZoom();

  trackEvent('view_map', {
    map_id: map.id,
    map_title: map.title,
    map_type: map.type,
    region: map.region,
    navigation_source: source
  });

  if (openDialog && !dialog.open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function openMap(button) {
  displayMap(getMapById(button.dataset.mapId), true, 'catalog');
}

function closeMap() {
  if (dialog.open) dialog.close();
  viewerImage.removeAttribute('src');
  document.body.style.overflow = '';
}

// If a thumbnail has an unsupported format, load the full image instead.
grid.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  const fallback = image.dataset.fallbackSrc;
  if (fallback && image.getAttribute('src') !== fallback) {
    image.src = fallback;
  }
}, true);

grid.addEventListener('click', event => {
  const button = event.target.closest('.map-card-button');
  if (button) openMap(button);
});

relatedMapsList.addEventListener('click', event => {
  const button = event.target.closest('.related-map-button');
  if (button) displayMap(getMapById(button.dataset.mapId), false, 'related_district');
});

relatedBackButton.addEventListener('click', () => {
  displayMap(getMapById(relatedBackButton.dataset.mapId), false, 'region_back');
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(item => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    activeFilter = tab.dataset.filter;
    trackEvent('select_map_filter', {
      filter: activeFilter
    });
    renderMaps();
  });
});

dialog.addEventListener('click', event => {
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === 'close') closeMap();
    if (action === 'zoom-in') setZoom(zoom + zoomStep);
    if (action === 'zoom-out') setZoom(zoom - zoomStep);
    if (action === 'reset') resetZoom();
    return;
  }

  if (event.target === dialog) closeMap();
});

dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeMap();
});

viewerStage.addEventListener('wheel', event => {
  if (!dialog.open) return;
  event.preventDefault();
  setZoom(zoom + (event.deltaY < 0 ? zoomStep : -zoomStep));
}, { passive: false });

dialog.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
  document.body.style.overflow = '';
});

document.querySelectorAll('.language-button').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
});

document.querySelectorAll('[data-analytics]').forEach(link => {
  link.addEventListener('click', () => {
    const intent = link.dataset.analytics;
    if (intent === 'catalog-intent') {
      trackEvent('catalog_intent');
    }
    if (intent === 'order-intent') {
      trackEvent('order_intent');
    }
  });
});

document.querySelectorAll('[data-social]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('social_click', {
      platform: link.dataset.social,
      link_url: link.href
    });
  });
});

updateStats();
setLanguage(currentLanguage);

/* ===== Защита интерфейса карт ===== */
function isProtectedTarget(target) {
  return target instanceof Element && !!target.closest('.map-card, .map-dialog, .viewer-stage');
}

['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach(eventName => {
  document.addEventListener(eventName, event => {
    if (isProtectedTarget(event.target)) {
      event.preventDefault();
    }
  });
});
