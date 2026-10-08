const maps = [
  { id: 'akmola', src: 'images/map6.png', title: 'Акмолинская область', region: 'Акмолинская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'west-kazakhstan', src: 'images/map7.png', title: 'Западно-Казахстанская область', region: 'Западно-Казахстанская область', type: 'region', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { id: 'atyrau', src: 'images/map9.png', title: 'Атырауская область', region: 'Атырауская область', type: 'region', year: '2026', projection: 'WGS 84 / UTM zone 39N', dem: 'Copernicus GLO-30' },
  { id: 'kostanay', src: 'images/map1.png', title: 'Костанайская область', region: 'Костанайская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 41N', dem: 'Copernicus GLO-30' },
  { id: 'pavlodar', src: 'images/map4.png', title: 'Павлодарская область', region: 'Павлодарская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 43N', dem: 'Copernicus GLO-30' },
  { id: 'north-kazakhstan', src: 'images/map3.png', title: 'Северо-Казахстанская область', region: 'Северо-Казахстанская область', type: 'region', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'g-musrepov', src: 'images/map2.png', title: 'Район имени Г. Мусрепова', region: 'Северо-Казахстанская область', parentRegionId: 'north-kazakhstan', type: 'district', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'aiyrtau', src: 'images/map8.png', title: 'Айыртауский район', region: 'Северо-Казахстанская область', parentRegionId: 'north-kazakhstan', type: 'district', year: '2026', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' },
  { id: 'sozak', src: 'images/map5.png', title: 'Сузакский район', region: 'Туркестанская область', parentRegionId: 'turkistan', type: 'district', year: '2025', projection: 'WGS 84 / UTM zone 42N', dem: 'Copernicus GLO-30' }
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

const mapCollator = new Intl.Collator('ru', { sensitivity: 'base' });

let activeFilter = 'all';
let zoom = 1;
const minZoom = 1;
const maxZoom = 5;
const zoomStep = .2;

function getMapById(mapId) {
  return maps.find(map => map.id === mapId);
}

function sortMapsByTitle(items) {
  return [...items].sort((a, b) => mapCollator.compare(a.title, b.title));
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
    <article class="map-card">
      <button class="map-card-button" type="button" data-map-id="${map.id}" aria-label="Открыть карту: ${map.title}">
        <span class="map-thumb">
          <img src="${map.src}" alt="${map.title}" loading="lazy" decoding="async" draggable="false">
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

  relatedMapsTitle.textContent = 'Карты районов области';
  relatedMapsList.innerHTML = districts.map(district => `
    <button
      class="related-map-button${district.id === map.id ? ' active' : ''}"
      type="button"
      data-map-id="${district.id}"
      aria-label="Открыть карту: ${district.title}"
      aria-current="${district.id === map.id ? 'true' : 'false'}"
    >
      <img src="${district.src}" alt="" loading="lazy" decoding="async" draggable="false">
      <span>${district.title}</span>
    </button>
  `).join('');

  if (map.type === 'district') {
    relatedBackButton.hidden = false;
    relatedBackButton.textContent = `← ${regionMap.title}`;
    relatedBackButton.dataset.mapId = regionMap.id;
  } else {
    relatedBackButton.hidden = true;
    relatedBackButton.removeAttribute('data-map-id');
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
  displayMap(getMapById(button.dataset.mapId), true);
}

function closeMap() {
  if (dialog.open) dialog.close();
  viewerImage.removeAttribute('src');
  document.body.style.overflow = '';
}

grid.addEventListener('click', event => {
  const button = event.target.closest('.map-card-button');
  if (button) openMap(button);
});

relatedMapsList.addEventListener('click', event => {
  const button = event.target.closest('.related-map-button');
  if (button) displayMap(getMapById(button.dataset.mapId));
});

relatedBackButton.addEventListener('click', () => {
  displayMap(getMapById(relatedBackButton.dataset.mapId));
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(item => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

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

updateStats();
renderMaps();

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
