function setupScrollBehavior() {
  const header = document.querySelector('.el_header');

  header.style.position = 'sticky';
  header.style.top = '0';

  function handleScroll() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (window.scrollY > viewportHeight/2) {
			header.classList.add('el_header--sticky');
		} else if (window.scrollY < viewportHeight/4) {
			header.classList.remove('el_header--sticky');
    }
  }

  window.addEventListener('scroll', handleScroll);
}

function removeScrollBehavior() {
  window.removeEventListener('scroll', handleScroll);
}

function resizeHandler() {
  const isWideScreen = window.matchMedia('(min-width: 1100px)');

  if (isWideScreen.matches) {
    setupScrollBehavior();
  } else {
    removeScrollBehavior();
  }
}

resizeHandler();

window.addEventListener('resize', resizeHandler);
