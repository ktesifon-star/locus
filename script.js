let scale = 1;
const step = 0.15;
const maxScale = 5;
const minScale = 1;

const modal = document.getElementById('modal');
const img = document.getElementById('full-image');
const container = document.getElementById('modal-container');

function toggleCountry() {
    const list = document.getElementById('regionsList');
    const bar = document.querySelector('.country-bar');
    list.classList.toggle('open');
    bar.classList.toggle('open');
}

function toggleRegion(element) {
    const content = element.nextElementSibling;
    element.classList.toggle('open');
    content.classList.toggle('open');
}

window.openMap = function(src) {
    img.src = src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    scale = 1;
    img.style.width = 'auto';
    img.style.maxWidth = '95vw';
    img.style.maxHeight = '95vh';
    container.scrollLeft = 0;
    container.scrollTop = 0;
};

modal.onclick = (e) => {
    if (e.target.id === 'modal' || e.target.id === 'modal-container') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

container.onwheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -step : step;
    scale = Math.min(Math.max(minScale, scale + delta), maxScale);

    if (scale === 1) {
        img.style.maxWidth = '95vw';
        img.style.maxHeight = '95vh';
        img.style.width = 'auto';
    } else {
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        img.style.width = (95 * scale) + 'vw';
    }
};

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
}, false);

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
