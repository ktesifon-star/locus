const maps = [
  { src: 'images/map6.png', title: 'Акмолинская область', region: 'Акмолинская область', type: 'region', typeLabel: 'Карта области', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { src: 'images/map7.png', title: 'Западно-Казахстанская область', region: 'Западно-Казахстанская область', type: 'region', typeLabel: 'Карта области', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { src: 'images/map9.png', title: 'Атырауская область', region: 'Атырауская область', type: 'region', typeLabel: 'Карта области', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { src: 'images/map1.png', title: 'Костанайская область', region: 'Костанайская область', type: 'region', typeLabel: 'Карта области', year: '2025', projection: 'WGS 84 / UTM zone 41N', dem: 'Copernicus GLO-30' },
  { src: 'images/map4.png', title: 'Павлодарская область', region: 'Павлодарская область', type: 'region', typeLabel: 'Карта области', year: '2025', projection: 'WGS 84 / UTM zone 43N', dem: 'Copernicus GLO-30' },
  { src: 'images/map3.png', title: 'Северо-Казахстанская область', region: 'Северо-Казахстанская область', type: 'region', typeLabel: 'Карта области', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { src: 'images/map2.png', title: 'Район имени Г. Мусрепова', region: 'Северо-Казахстанская область', type: 'district', typeLabel: 'Карта района', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { src: 'images/map8.png', title: 'Айыртауский район', region: 'Северо-Казахстанская область', type: 'district', typeLabel: 'Карта района', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { src: 'images/map5.png', title: 'Сузакский район', region: 'Туркестанская область', type: 'district', typeLabel: 'Карта района', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' }
];


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
passport.innerHTML = `
  <div><dt>Год</dt><dd id="passportYear"></dd></div>
  <div><dt>Проекция</dt><dd id="passportProjection"></dd></div>
  <div><dt>Источник DEM</dt><dd id="passportDem"></dd></div>
`;
viewerShell.appendChild(passport);

const passportYear = document.getElementById('passportYear');
const passportProjection = document.getElementById('passportProjection');
const passportDem = document.getElementById('passportDem');

let activeFilter = 'all';
let zoom = 1;
const minZoom = 1;
const maxZoom = 5;
const zoomStep = .2;

function getRegionMap(regionName) {
  return maps.find(map => map.type === 'region' && map.title === regionName);
}

function getDistrictsForRegion(regionName) {
  return maps.filter(map => map.type === 'district' && map.region === regionName);
}

function renderMaps() {
  let filtered;

  if (activeFilter === 'all') {
    filtered = maps.filter(map => {
      if (map.type === 'region') return true;
      return !getRegionMap(map.region);
    });
  } else {
    filtered = maps.filter(map => map.type === activeFilter);
  }

  grid.innerHTML = filtered.map(map => `
    <article class="map-card">
      <button class="map-card-button" type="button" data-src="${map.src}" data-title="${map.title}" data-region="${map.region}" aria-label="Открыть карту: ${map.title}">
        <span class="map-thumb">
          <img src="${map.src}" alt="${map.title}" loading="lazy" decoding="async">
        </span>
        <span class="map-type-badge">${map.type === 'region' ? 'Область' : 'Район'}</span>
        <span class="map-label">
          <span class="map-title">${map.title}</span>
        </span>
      </button>
    </article>
  `).join('');

  emptyState.hidden = filtered.length !== 0;
}
function updateStats() {
  document.getElementById('mapCount').textContent = maps.length;
  document.getElementById('regionCount').textContent = new Set(maps.map(map => map.region)).size;
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
  const regionMap = map.type === 'region' ? map : getRegionMap(map.region);
  const districts = regionMap ? getDistrictsForRegion(regionMap.title) : [];

  if (!regionMap || districts.length === 0) {
    relatedMaps.hidden = true;
    relatedMapsList.innerHTML = '';
    relatedBackButton.hidden = true;
    relatedBackButton.removeAttribute('data-src');
    return;
  }

  relatedMapsTitle.textContent = 'Карты районов области';
  relatedMapsList.innerHTML = districts.map(district => `
    <button class="related-map-button${district.src === map.src ? ' active' : ''}" type="button" data-related-src="${district.src}" aria-label="Открыть карту: ${district.title}">
      <img src="${district.src}" alt="" loading="lazy" decoding="async" draggable="false">
      <span>${district.title}</span>
    </button>
  `).join('');

  if (map.type === 'district') {
    relatedBackButton.hidden = false;
    relatedBackButton.textContent = `← ${regionMap.title}`;
    relatedBackButton.dataset.src = regionMap.src;
  } else {
    relatedBackButton.hidden = true;
    relatedBackButton.removeAttribute('data-src');
  }

  relatedMaps.hidden = false;
}

function displayMap(map, openDialog = false) {
  if (!map) return;

  viewerImage.src = map.src;
  viewerImage.alt = map.title;
  dialogTitle.textContent = map.title;

  const sameName = map.title === map.region;
  dialogRegion.hidden = sameName;
  dialogRegion.textContent = sameName ? '' : map.region;

  passportYear.textContent = map.year || '—';
  passportProjection.textContent = map.projection || '—';
  passportDem.textContent = map.dem || '—';

  renderRelatedMaps(map);
  resetZoom();

  if (openDialog && !dialog.open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function openMap(button) {
  const map = maps.find(item => item.src === button.dataset.src);
  displayMap(map, true);
}
function closeMap() {
  dialog.close();
  viewerImage.removeAttribute('src');
  document.body.style.overflow = '';
}

grid.addEventListener('click', event => {
  const button = event.target.closest('.map-card-button');
  if (button) openMap(button);
});

relatedMapsList.addEventListener('click', event => {
  const button = event.target.closest('.related-map-button');
  if (!button) return;

  const map = maps.find(item => item.src === button.dataset.relatedSrc);
  displayMap(map);
});

relatedBackButton.addEventListener('click', () => {
  const map = maps.find(item => item.src === relatedBackButton.dataset.src);
  displayMap(map);
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
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

viewerStage.addEventListener('wheel', event => {
  if (!dialog.open) return;
  event.preventDefault();
  setZoom(zoom + (event.deltaY < 0 ? zoomStep : -zoomStep));
}, { passive: false });

dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
});

viewerImage.addEventListener('contextmenu', event => event.preventDefault());
viewerImage.addEventListener('dragstart', event => event.preventDefault());

updateStats();
renderMaps();


/* ===== Усиленная защита интерфейса ===== */
function isProtectedTarget(target) {
  return !!target.closest('.map-card, .map-dialog, .viewer-stage');
}

['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach(eventName => {
  document.addEventListener(eventName, event => {
    if (isProtectedTarget(event.target)) {
      event.preventDefault();
    }
  });
});

document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();

  const blocked =
    key === 'f12' ||
    (event.ctrlKey && ['s', 'u', 'p', 'c'].includes(key)) ||
    (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key));

  if (blocked) {
    event.preventDefault();
    event.stopPropagation();
  }
});

const viewerShield = document.querySelector('.viewer-shield');

if (viewerShield) {
  ['contextmenu', 'dragstart', 'mousedown'].forEach(eventName => {
    viewerShield.addEventListener(eventName, event => {
      event.preventDefault();
    });
  });
}
