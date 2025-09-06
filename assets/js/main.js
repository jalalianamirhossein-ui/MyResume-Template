/**
 * Template main JS (patched)
 * - Removed Typed.js auto-init to avoid duplication with i18n.js
 */
(function () {
  "use strict";

  const headerToggleBtn = document.querySelector(".header-toggle");
  function headerToggle() {
    const header = document.querySelector("#header");
    if (header) {
      header.classList.toggle("header-show");
    }
    if (headerToggleBtn) {
      headerToggleBtn.classList.toggle("bi-list");
      headerToggleBtn.classList.toggle("bi-x");
    }
  }
  if (headerToggleBtn) headerToggleBtn.addEventListener("click", headerToggle);

  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      const header = document.querySelector("#header");
      if (header && header.classList.contains("header-show")) {
        headerToggle();
      }
    });
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) window.addEventListener("load", () => preloader.remove());

  let scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  function aosInit() {
    if (window.AOS)
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
  }
  window.addEventListener("load", aosInit);

  // NOTE: Typed.js init is handled in i18n.js (reinitTyped).

  if (window.PureCounter) new PureCounter();

  let skillsAnimation = document.querySelectorAll(".skills-animation");
  if (skillsAnimation.length > 0 && window.Waypoint) {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function () {
          let progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            const value = el.getAttribute("aria-valuenow");
            if (value) {
              el.style.width = value + "%";
            }
          });
        },
      });
    });
  }

  if (window.GLightbox) {
    const glightbox = GLightbox({ selector: ".glightbox" });
  }

  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    const container = isotopeItem.querySelector(".isotope-container");
    if (container && window.imagesLoaded && window.Isotope) {
      imagesLoaded(container, function () {
        initIsotope = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    }

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            const activeFilter = isotopeItem.querySelector(".isotope-filters .filter-active");
            if (activeFilter) {
              activeFilter.classList.remove("filter-active");
            }
            this.classList.add("filter-active");
            if (initIsotope) {
              initIsotope.arrange({ filter: this.getAttribute("data-filter") });
            }
            if (typeof aosInit === "function") aosInit();
          },
          false
        );
      });
  });

  function initSwiper() {
    if (window.Swiper) {
      document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
        const configElement = swiperElement.querySelector(".swiper-config");
        if (configElement) {
          try {
            let config = JSON.parse(configElement.innerHTML.trim());
            if (swiperElement.classList.contains("swiper-tab")) {
              if (typeof initSwiperWithCustomPagination === "function") {
                initSwiperWithCustomPagination(swiperElement, config);
              }
            } else {
              new Swiper(swiperElement, config);
            }
          } catch (e) {
            console.warn("Invalid Swiper config:", e);
          }
        }
      });
    }
  }
  window.addEventListener("load", initSwiper);

  window.addEventListener("load", function () {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: "smooth",
        });
      }, 100);
    }
  });

  let navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
