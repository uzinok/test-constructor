// Функция для добавления необходимых стилей и настройки поведения при изменении размера окна
function setupScrollBehavior() {
  // Получаем нужные элементы
  const header = document.querySelector('.el_header');
  const downElement = document.querySelector('.el_header__down');

  // Добавляем фиксированную позицию для шапки
  header.style.position = 'sticky';
  header.style.top = '0';

  // Функция обработки события прокрутки
  function handleScroll() {
    // Определяем высоту видимой части окна
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Скрытие элемента при достижении определенного уровня прокрутки
    if (window.scrollY > viewportHeight && downElement !== null) {
      downElement.style.display = 'none'; // Скрыть элемент
    } else {
      downElement.style.display = '';     // Вернуть исходное состояние видимости
    }
  }

  // Присваиваем событие прокрутки
  window.addEventListener('scroll', handleScroll);
}

// Отключаем обработку события прокрутки
function removeScrollBehavior() {
  window.removeEventListener('scroll', handleScroll); // Убираем обработчик прокрутки
}

// Основной обработчик изменения размеров окна
function resizeHandler() {
  const isWideScreen = window.matchMedia('(min-width: 990px)');

  if (isWideScreen.matches) { // Ширина экрана больше 990 пикселей
    setupScrollBehavior();   // Включаем обработку скроллинга
  } else {
    removeScrollBehavior();  // Выключаем обработку скроллинга
  }
}

// Запускаем первоначальный check состояния ширины экрана
resizeHandler();

// Подписываемся на событие изменения размеров окна
window.addEventListener('resize', resizeHandler);
