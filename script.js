const maps = [
  { src: 'images/map6.png', title: 'Акмолинская область', region: 'Акмолинская область', type: 'region', typeLabel: 'Карта области' },
  { src: 'images/map7.png', title: 'Западно-Казахстанская область', region: 'Западно-Казахстанская область', type: 'region', typeLabel: 'Карта области' },
  { src: 'images/map1.png', title: 'Костанайская область', region: 'Костанайская область', type: 'region', typeLabel: 'Карта области' },
  { src: 'images/map4.png', title: 'Павлодарская область', region: 'Павлодарская область', type: 'region', typeLabel: 'Карта области' },
  { src: 'images/map3.png', title: 'Северо-Казахстанская область', region: 'Северо-Казахстанская область', type: 'region', typeLabel: 'Карта области' },
  { src: 'images/map2.png', title: 'Район имени Г. Мусрепова', region: 'Северо-Казахстанская область', type: 'district', typeLabel: 'Карта района' },
  { src: 'images/map8.png', title: 'Айыртауский район', region: 'Северо-Казахстанская область', type: 'district', typeLabel: 'Карта района' },
  { src: 'images/map5.png', title: 'Сузакский район', region: 'Туркестанская область', type: 'district', typeLabel: 'Карта района' }
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

let activeFilter = 'all';
let zoom = 1;
const minZoom = 1;
const maxZoom = 5;
const zoomStep = .2;

function renderMaps() {
  const filtered = activeFilter === 'all'
    ? maps
    : maps.filter(map => map.type === activeFilter);

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

function openMap(button) {
  viewerImage.src = button.dataset.src;
  viewerImage.alt = button.dataset.title;
  dialogTitle.textContent = button.dataset.title;
  const sameName = button.dataset.title === button.dataset.region;
  dialogRegion.hidden = sameName;
  dialogRegion.textContent = sameName ? '' : button.dataset.region;
  resetZoom();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
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
