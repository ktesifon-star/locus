// Глобальные настройки зума
let scale = 1;
const step = 0.15; // Скорость зума (чем больше, тем быстрее)
const maxScale = 5; // Максимальное увеличение (в 5 раз)
const minScale = 1;

const modal = document.getElementById('modal');
const img = document.getElementById('full-image');
const container = document.getElementById('modal-container');

/**
 * Открытие карты.
 * window.openMap делает функцию доступной из HTML.
 */
window.openMap = function(src) {
    img.src = src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Запрет прокрутки сайта
    
    // Сброс масштаба и скролла при открытии новой карты
    scale = 1;
    img.style.width = 'auto';
    img.style.maxWidth = '95vw';
    img.style.maxHeight = '95vh';
    container.scrollLeft = 0;
    container.scrollTop = 0;
};

/**
 * Закрытие модального окна при клике на фон или защитный слой.
 */
modal.onclick = (e) => {
    // Закрываем, если кликнули по пустому месту или по невидимому щиту
    if (e.target.id === 'modal-container' || e.target.classList.contains('shield')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем прокрутку сайту
    }
};

/**
 * Плавный зум колесиком мыши.
 */
container.onwheel = (e) => {
    e.preventDefault(); // Запрещаем прокрутку страницы во время зума
    
    // Определяем направление: вверх - увеличиваем, вниз - уменьшаем
    const delta = e.deltaY > 0 ? -step : step;
    const oldScale = scale;
    scale = Math.min(Math.max(minScale, scale + delta), maxScale);

    if (scale === 1) {
        // Возврат в исходное состояние (вписано в экран)
        img.style.maxWidth = '95vw';
        img.style.maxHeight = '95vh';
        img.style.width = 'auto';
    } else {
        // Снимаем ограничения и увеличиваем ширину
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        // Расчет ширины относительно области просмотра (vw)
        img.style.width = (95 * scale) + 'vw';
    }
};

/**
 * Защита контента (цифровой картографии) от копирования.
 */
// 1. Запрет контекстного меню (правой кнопки мыши)
document.addEventListener('contextmenu', e => e.preventDefault());

// 2. Запрет на перетаскивание картинок мышью
document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
}, false);

// 3. Закрытие по кнопке Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});