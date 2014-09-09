(function () {
	/* global hljs:false */
	var showMenu = document.getElementById('showMenu');
	var menu = document.getElementById('nav');
	var isOpen = false;
	showMenu.ontouchstart = showMenu.onpointerdown = showMenu.onclick = function (event) {
		if (!event.pointerType || event.pointerType === 'touch') {
			event.preventDefault();
		}

		isOpen = !isOpen;
		menu.classList.toggle('open', isOpen);
		showMenu.setAttribute('aria-expanded', String(isOpen));
	};

	function close(event) {
		if (isOpen && !menu.contains(event.target) && !showMenu.contains(event.target)) {
			event.preventDefault();
			isOpen = false;
			menu.classList.remove('open');
			showMenu.setAttribute('aria-expanded', 'false');
		}
	}

	document.addEventListener('touchstart', close, false);
	document.addEventListener('pointerdown', close, false);
	document.addEventListener('mousedown', close, false);

	if (window.scrollY === 0) {
		var scrollTo = document.getElementById('initialScrollPoint');
		if (scrollTo) {
			window.scrollTo(window.scrollX, scrollTo.getBoundingClientRect().top);
		}
	}

	var main = document.getElementById('main');
	var headers = main.querySelectorAll('h3');
	var foldPoint = window.innerHeight * 0.3;
	var activeSection;
	var activeSubsection;

	function findActiveSection() {
		var i = headers.length - 1;
		var header;
		for (; (header = headers[i]); --i) {
			if (header.getBoundingClientRect().top < foldPoint) {
				activeSubsection && activeSubsection.classList.remove('active');
				activeSubsection = menu.querySelector('[data-id="' + header.dataset.id + '"]');
				activeSubsection && activeSubsection.classList.add('active');
				var newActiveSection = activeSubsection && activeSubsection.parentNode.parentNode;
				if (newActiveSection !== activeSection) {
					activeSection && activeSection.classList.remove('active');
					activeSection = newActiveSection;
					activeSection && activeSection.classList.add('active');
				}
				return;
			}
		}
	}

	window.addEventListener('resize', function () {
		foldPoint = window.innerHeight * 0.3;
		findActiveSection();
	}, false);
	window.addEventListener('scroll', findActiveSection, false);

	hljs.initHighlighting();
	findActiveSection();
})();