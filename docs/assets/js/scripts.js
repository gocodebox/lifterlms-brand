(function() {
	let mainNavLinks = document.querySelectorAll('#sidebar-nav ul a');
	let linksToSmoothScroll = document.querySelectorAll('#sidebar-nav ul a, main h2 a');
	let mainSections = document.querySelectorAll('main > section');

	function init() {
		doSmoothScrolling();
		doActiveNav();
		doMobileSidebar();
	}

	function doSmoothScrolling() {
		linksToSmoothScroll.forEach( link => {
			link.addEventListener('click', event => {
				event.preventDefault();
				scrollIntoView( event.target.hash );
				updateHash( link.getAttribute( 'href' ) );
				if(document.body.classList.contains('sidebar-is-open')){
					document.body.classList.remove('sidebar-is-open');
				}
			});
		} );
	}

	function scrollIntoView( hash ) {
		const el = document.querySelector( hash );
		el.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		} );
	}

	function updateHash( hash ) {
		if( window.history.pushState ) {
		    window.history.pushState( null, null, hash );
		}
		else {
		    window.location.hash = hash;
		}
	}

	function doActiveNav() {
		let lastId;
		let cur = [];

		// This should probably be throttled.
		// Especially because it triggers during smooth scrolling.

		window.addEventListener('scroll', event => {
			let fromTop = window.scrollY;

			mainNavLinks.forEach(link => {
				let header = document.querySelector(link.hash);
				let section = header.parentElement;

				if (
					section.offsetTop <= fromTop &&
					section.offsetTop + section.offsetHeight > fromTop
				) {
					link.classList.add('current');
				} else {
					link.classList.remove('current');
				}

			});
		});
	}

	function doMobileSidebar() {
		let hamburgerButton = document.querySelector( '#hamburger' );
		hamburgerButton.addEventListener('click', event => {
			event.preventDefault;
			if (document.body.classList.contains('sidebar-is-open')) {
				document.body.classList.remove('sidebar-is-open');
			} else {
				document.body.classList.add('sidebar-is-open');
			}
		})
	}

	init();
})();
