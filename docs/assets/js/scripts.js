(function() {
	let mainNavLinks = document.querySelectorAll("#sidebar-nav ul a");
	let linksToSmoothScroll = document.querySelectorAll("#sidebar-nav ul a, main h2 a");
	let mainSections = document.querySelectorAll("main > section");

	function init() {
		doSmoothScrolling();
		doActiveNav();
		doMobileSidebar();
	}

	function doSmoothScrolling() {
		linksToSmoothScroll.forEach(link => {
			link.addEventListener("click", event => {
				event.preventDefault();
				let target = document.querySelector(event.target.hash);
				target.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			});
		});
	}

	function doActiveNav() {
		let lastId;
		let cur = [];

		// This should probably be throttled.
		// Especially because it triggers during smooth scrolling.

		window.addEventListener("scroll", event => {
			let fromTop = window.scrollY;

			mainNavLinks.forEach(link => {
				let header = document.querySelector(link.hash);
				let section = header.parentElement;

				if (
					section.offsetTop <= fromTop &&
					section.offsetTop + section.offsetHeight > fromTop
				) {
					link.classList.add("current");
				} else {
					link.classList.remove("current");
				}

			});
		});
	}

	function doMobileSidebar() {
		let hamburgerButton = document.querySelector("#hamburger");
		// let sidebarNav = document.querySelector("#sidebar-nav");
		hamburgerButton.addEventListener("click", event => {
			event.preventDefault;
			if (document.body.classList.contains("sidebar-is-open")) {
				// document.body.style.removeProperty("width");
				document.body.classList.remove("sidebar-is-open");
			} else {
				// document.body.style.width = window.outerWidth + "px";
				document.body.classList.add("sidebar-is-open");
			}
		})
	}

	init();
})();
