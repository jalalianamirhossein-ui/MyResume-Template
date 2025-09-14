/**
 * Template main JS (patched)
 * - Removed Typed.js auto-init to avoid duplication with i18n.js
 */
(function () {
  "use strict";

  const headerToggleBtn = document.querySelector("#menu-toggle");
  const header = document.querySelector("#header");

  // ایجاد overlay برای موبایل
  let overlay = document.getElementById("menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "menu-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    if (header) {
      header.classList.add("header-show");
      overlay.classList.add("active");
      if (headerToggleBtn) {
        headerToggleBtn.setAttribute("aria-expanded", "true");
        const icon = headerToggleBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("bi-list");
          icon.classList.add("bi-x");
        }
      }
      // بهبود عملکرد موبایل - جلوگیری از scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    }
  }

  function closeMenu() {
    if (header) {
      header.classList.remove("header-show");
      overlay.classList.remove("active");
      if (headerToggleBtn) {
        headerToggleBtn.setAttribute("aria-expanded", "false");
        const icon = headerToggleBtn.querySelector("i");
        if (icon) {
          icon.classList.add("bi-list");
          icon.classList.remove("bi-x");
        }
      }
      // بازگرداندن scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }

  function headerToggle() {
    if (header && header.classList.contains("header-show")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Event listeners
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // بستن منو بعد از کلیک روی لینک‌های منو در موبایل
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (
        window.innerWidth < 1200 &&
        header &&
        header.classList.contains("header-show")
      ) {
        closeMenu();
      }
    });
  });

  // بستن منو وقتی سایز صفحه تغییر می‌کند
  // این event listener در انتهای فایل اضافه می‌شود

  // بهبود عملکرد موبایل - جلوگیری از scroll body وقتی منو باز است
  function preventBodyScroll() {
    if (header && header.classList.contains("header-show")) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }

  // اضافه کردن event listener برای تغییر وضعیت منو
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        preventBodyScroll();
      }
    });
  });

  if (header) {
    observer.observe(header, { attributes: true });
  }

  // بهبود عملکرد touch events در موبایل
  if ("ontouchstart" in window) {
    // اضافه کردن touch support برای منو
    if (headerToggleBtn) {
      headerToggleBtn.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          headerToggle();
        },
        { passive: false }
      );
    }

    // بهبود عملکرد لینک‌های منو در موبایل
    document.querySelectorAll("#navmenu a").forEach((link) => {
      link.addEventListener("touchstart", function (e) {
        // اضافه کردن کمی delay برای بهبود UX
        setTimeout(() => {
          if (
            window.innerWidth < 1200 &&
            header &&
            header.classList.contains("header-show")
          ) {
            closeMenu();
          }
        }, 100);
      });
    });

    // بهبود عملکرد overlay در موبایل
    if (overlay) {
      overlay.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          closeMenu();
        },
        { passive: false }
      );
    }
  }

  // بهبود عملکرد keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      header &&
      header.classList.contains("header-show")
    ) {
      closeMenu();
    }
  });

  // scroll top در انتهای فایل مدیریت می‌شود

  function aosInit() {
    if (window.AOS) {
      // بهبود تنظیمات موبایل برای AOS
      let config = {
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      };

      if (window.innerWidth <= 768) {
        config.duration = 400; // کاهش duration برای موبایل
        config.offset = 50; // کاهش offset برای موبایل
      }

      AOS.init(config);
    }
  }
  window.addEventListener("load", aosInit);

  // NOTE: Typed.js init is handled in i18n.js (reinitTyped).

  if (window.PureCounter) {
    // بهبود تنظیمات موبایل برای PureCounter
    let config = {
      duration: 2000,
      delay: 10,
    };

    if (window.innerWidth <= 768) {
      config.duration = 1500; // کاهش duration برای موبایل
      config.delay = 5;
    }

    new PureCounter(config);
  }

  let skillsAnimation = document.querySelectorAll(".skills-animation");
  if (skillsAnimation.length > 0 && window.Waypoint) {
    skillsAnimation.forEach((item) => {
      // بهبود تنظیمات موبایل برای Waypoint
      let offset = "80%";
      if (window.innerWidth <= 768) {
        offset = "60%"; // کاهش offset برای موبایل
      }

      new Waypoint({
        element: item,
        offset: offset,
        handler: function () {
          let progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            const value = el.getAttribute("aria-valuenow");
            if (value) {
              // بهبود انیمیشن برای موبایل
              let duration = "0.9s";
              if (window.innerWidth <= 768) {
                duration = "0.6s";
              }
              el.style.transition = `width ${duration} ease`;
              el.style.width = value + "%";
            }
          });
        },
      });
    });
  }

  if (window.GLightbox) {
    // بهبود تنظیمات موبایل برای GLightbox
    let config = {
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
    };

    if (window.innerWidth <= 768) {
      config.touchNavigation = true;
      config.keyboardNavigation = false; // غیرفعال کردن keyboard navigation در موبایل
    }

    const glightbox = GLightbox(config);
  }

  function initPortfolio() {
    document
      .querySelectorAll(".isotope-layout")
      .forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
        let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
        let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

        let initIsotope;
        const container = isotopeItem.querySelector(".isotope-container");

        if (container && window.imagesLoaded && window.Isotope) {
          // اطمینان از آماده بودن تصاویر
          imagesLoaded(container, function () {
            // بهبود تنظیمات موبایل برای Isotope
            let transitionDuration = "0.6s";
            if (window.innerWidth <= 768) {
              transitionDuration = "0.4s"; // کاهش duration برای موبایل
            }

            initIsotope = new Isotope(container, {
              itemSelector: ".isotope-item",
              layoutMode: layout,
              filter: filter,
              sortBy: sort,
              transitionDuration: transitionDuration,
            });

            // بعد از اینیشیال Isotope، AOS را ریفرش کن
            if (typeof aosInit === "function") {
              setTimeout(aosInit, 100);
            }
          });

          // Event listeners برای فیلترها
          isotopeItem
            .querySelectorAll(".isotope-filters li")
            .forEach(function (filters) {
              filters.addEventListener(
                "click",
                function () {
                  const activeFilter = isotopeItem.querySelector(
                    ".isotope-filters .filter-active"
                  );
                  if (activeFilter) {
                    activeFilter.classList.remove("filter-active");
                  }
                  this.classList.add("filter-active");
                  if (initIsotope) {
                    initIsotope.arrange({
                      filter: this.getAttribute("data-filter"),
                    });
                    // بعد از فیلتر کردن هم AOS را ریفرش کن
                    setTimeout(function () {
                      if (typeof aosInit === "function") aosInit();
                    }, 200);
                  }
                },
                false
              );

              // بهبود عملکرد touch events برای فیلترها در موبایل
              if ("ontouchstart" in window) {
                filters.addEventListener(
                  "touchstart",
                  function (e) {
                    e.preventDefault();
                    this.click();
                  },
                  { passive: false }
                );
              }
            });
        } else {
          // اگر Isotope یا imagesLoaded لود نشده، دوباره تلاش کن
          setTimeout(initPortfolio, 100);
        }
      });
  }

  // Portfolio را بعد از load کامل DOM اجرا کن
  window.addEventListener("load", initPortfolio);

  // بهبود عملکرد موبایل برای portfolio
  function initPortfolioMobile() {
    if (window.innerWidth <= 768) {
      // تنظیمات خاص موبایل برای portfolio
      document.querySelectorAll(".portfolio-content").forEach((item) => {
        item.style.minHeight = "200px";
      });

      // بهبود عملکرد touch events برای portfolio
      document.querySelectorAll(".portfolio-content").forEach((item) => {
        item.addEventListener("touchstart", function (e) {
          this.style.transform = "scale(0.98)";
        });

        item.addEventListener("touchend", function (e) {
          this.style.transform = "scale(1)";
        });
      });
    }
  }

  // اجرای تنظیمات موبایل برای portfolio
  window.addEventListener("load", initPortfolioMobile);
  window.addEventListener("resize", initPortfolioMobile);

  // بهبود عملکرد موبایل برای portfolio filters
  function initPortfolioFiltersMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-filters li").forEach((filter) => {
        filter.style.padding = "8px 12px";
        filter.style.fontSize = "13px";
        filter.style.margin = "0 4px 8px 4px";
      });
    }
  }

  window.addEventListener("load", initPortfolioFiltersMobile);
  window.addEventListener("resize", initPortfolioFiltersMobile);

  // بهبود عملکرد موبایل برای portfolio items
  function initPortfolioItemsMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.style.marginBottom = "20px";
      });
    }
  }

  window.addEventListener("load", initPortfolioItemsMobile);
  window.addEventListener("resize", initPortfolioItemsMobile);

  // بهبود عملکرد موبایل برای portfolio content
  function initPortfolioContentMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-content").forEach((content) => {
        content.style.minHeight = "200px";
        content.style.borderRadius = "8px";
        content.style.overflow = "hidden";
      });
    }
  }

  window.addEventListener("load", initPortfolioContentMobile);
  window.addEventListener("resize", initPortfolioContentMobile);

  // بهبود عملکرد موبایل برای portfolio info
  function initPortfolioInfoMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info").forEach((info) => {
        info.style.padding = "10px";
        info.style.fontSize = "12px";
      });
    }
  }

  window.addEventListener("load", initPortfolioInfoMobile);
  window.addEventListener("resize", initPortfolioInfoMobile);

  // بهبود عملکرد موبایل برای portfolio links
  function initPortfolioLinksMobile() {
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll(
          ".portfolio-info .preview-link, .portfolio-info .details-link"
        )
        .forEach((link) => {
          link.style.fontSize = "20px";
          link.style.width = "40px";
          link.style.height = "40px";
          link.style.borderRadius = "50%";
          link.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          link.style.display = "flex";
          link.style.alignItems = "center";
          link.style.justifyContent = "center";
        });
    }
  }

  window.addEventListener("load", initPortfolioLinksMobile);
  window.addEventListener("resize", initPortfolioLinksMobile);

  // بهبود عملکرد موبایل برای portfolio images
  function initPortfolioImagesMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-content img").forEach((img) => {
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
      });
    }
  }

  window.addEventListener("load", initPortfolioImagesMobile);
  window.addEventListener("resize", initPortfolioImagesMobile);

  // بهبود عملکرد موبایل برای portfolio titles
  function initPortfolioTitlesMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info h4").forEach((title) => {
        title.style.fontSize = "12px";
        title.style.padding = "4px 8px";
        title.style.marginBottom = "5px";
      });
    }
  }

  window.addEventListener("load", initPortfolioTitlesMobile);
  window.addEventListener("resize", initPortfolioTitlesMobile);

  // بهبود عملکرد موبایل برای portfolio descriptions
  function initPortfolioDescriptionsMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio-info p").forEach((desc) => {
        desc.style.fontSize = "11px";
        desc.style.lineHeight = "1.4";
        desc.style.marginBottom = "8px";
      });
    }
  }

  window.addEventListener("load", initPortfolioDescriptionsMobile);
  window.addEventListener("resize", initPortfolioDescriptionsMobile);

  // بهبود عملکرد موبایل برای portfolio container
  function initPortfolioContainerMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".isotope-container").forEach((container) => {
        container.style.padding = "0 10px";
      });
    }
  }

  window.addEventListener("load", initPortfolioContainerMobile);
  window.addEventListener("resize", initPortfolioContainerMobile);

  // بهبود عملکرد موبایل برای portfolio layout
  function initPortfolioLayoutMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".isotope-layout").forEach((layout) => {
        layout.style.padding = "0 10px";
      });
    }
  }

  window.addEventListener("load", initPortfolioLayoutMobile);
  window.addEventListener("resize", initPortfolioLayoutMobile);

  // بهبود عملکرد موبایل برای portfolio section
  function initPortfolioSectionMobile() {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".portfolio.section").forEach((section) => {
        section.style.padding = "40px 0";
      });
    }
  }

  window.addEventListener("load", initPortfolioSectionMobile);
  window.addEventListener("resize", initPortfolioSectionMobile);

  // بهبود عملکرد موبایل برای portfolio title
  function initPortfolioTitleMobile() {
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll(".portfolio .section-title h2")
        .forEach((title) => {
          title.style.fontSize = "24px";
          title.style.marginBottom = "15px";
        });
    }
  }

  window.addEventListener("load", initPortfolioTitleMobile);
  window.addEventListener("resize", initPortfolioTitleMobile);

  function initSwiper() {
    if (window.Swiper) {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          const configElement = swiperElement.querySelector(".swiper-config");
          if (configElement) {
            try {
              let config = JSON.parse(configElement.innerHTML.trim());

              // بهبود تنظیمات موبایل برای Swiper
              if (window.innerWidth <= 768) {
                config.slidesPerView = 1;
                config.spaceBetween = 20;
                config.autoplay = {
                  delay: 4000,
                  disableOnInteraction: false,
                };
              }

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
        let offset = parseInt(scrollMarginTop) || 0;

        // بهبود عملکرد موبایل برای scroll
        if (window.innerWidth <= 768) {
          offset += 20; // اضافه کردن margin بیشتر برای موبایل
        }

        window.scrollTo({
          top: section.offsetTop - offset,
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

      // بهبود عملکرد موبایل برای scrollspy
      let offset = 200;
      if (window.innerWidth <= 768) {
        offset = 100; // کاهش offset برای موبایل
      }

      let position = window.scrollY + offset;
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

  // بهبود عملکرد موبایل برای scroll events
  let scrollTimeout;
  function throttledScroll() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        navmenuScrollspy();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  }

  // استفاده از throttled scroll برای بهبود عملکرد
  document.addEventListener("scroll", throttledScroll);

  // حذف event listener قدیمی scroll
  document.removeEventListener("scroll", navmenuScrollspy);

  // بهبود عملکرد موبایل برای resize events
  let resizeTimeout;
  function throttledResize() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        // اجرای مجدد تنظیمات موبایل
        initPortfolioMobile();
        initSwiper();
        resizeTimeout = null;
      }, 250);
    }
  }

  window.addEventListener("resize", throttledResize);

  // اضافه کردن event listener جدید resize
  window.addEventListener("resize", function () {
    if (
      window.innerWidth >= 1200 &&
      header &&
      header.classList.contains("header-show")
    ) {
      closeMenu();
    }
  });

  // بهبود عملکرد موبایل برای preloader
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }, 500);
    });
  }

  // بهبود عملکرد موبایل برای scroll top
  let scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTop) return;
    let threshold = 100;
    if (window.innerWidth <= 768) {
      threshold = 50; // کاهش threshold برای موبایل
    }

    window.scrollY > threshold
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
  document.addEventListener("scroll", throttledScroll);
})();
