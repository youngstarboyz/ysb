(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");
  const progressBar = document.querySelector("#scroll-progress-bar");

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !nav) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
      nav.classList.toggle("open", opening);
    });
    nav.querySelectorAll("a[href^='#']").forEach((link) => link.addEventListener("click", () => closeMenu()));
    document.addEventListener("click", (event) => {
      if (menuButton.getAttribute("aria-expanded") === "true" && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu({ restoreFocus: true });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    }, { passive: true });
  }

  const navLinks = [...document.querySelectorAll(".nav-link")];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  const revealTargets = document.querySelectorAll(
    ".countdown-card, .value-item, .about-photo-wrap, .about-copy, .about-values article, .schedule-item, .quote-band blockquote, .donate-card, .contact-inner, .highlight-strip article"
  );
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const updateScrollUI = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 500);
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0;
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


  // Accessible notice-board carousel.
  const noticeSlides = [...document.querySelectorAll("[data-notice-slide]")];
  const noticeDots = [...document.querySelectorAll("[data-notice-dot]")];
  const noticeCurrent = document.querySelector("#notice-current");
  let activeNotice = 0;
  const showNotice = (index) => {
    if (!noticeSlides.length) return;
    activeNotice = (index + noticeSlides.length) % noticeSlides.length;
    noticeSlides.forEach((slide, i) => {
      slide.hidden = i !== activeNotice;
      slide.classList.toggle("is-active", i === activeNotice);
    });
    noticeDots.forEach((dot, i) => {
      const active = i === activeNotice;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
    if (noticeCurrent) noticeCurrent.textContent = String(activeNotice + 1);
  };
  noticeDots.forEach((dot, i) => dot.addEventListener("click", () => showNotice(i)));
  const noticePrev = document.querySelector("[data-notice-prev]");
  const noticeNext = document.querySelector("[data-notice-next]");
  if (noticePrev) noticePrev.addEventListener("click", () => showNotice(activeNotice - 1));
  if (noticeNext) noticeNext.addEventListener("click", () => showNotice(activeNotice + 1));
  showNotice(0);

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());


  // Calendar reminder and native share support; no personal data is collected.
  const feedback = document.querySelector("#tool-feedback");
  const calendarButton = document.querySelector("#calendar-reminder");
  if (calendarButton) calendarButton.addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//YOUNG STAR BOYZ//Ganesh Puja//EN",
      "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:young-star-boyz-ganesh-chaturthi-2027@local",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z"), "DTSTART;VALUE=DATE:20270904", "DTEND;VALUE=DATE:20270905",
      "SUMMARY:Ganesh Chaturthi - YOUNG STAR BOYZ",
      "DESCRIPTION:Ganesh Puja celebration. Please confirm programme timings with the committee.",
      "LOCATION:Binjharpur, Bachhol, Odisha, India", "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "young-star-boyz-ganesh-chaturthi-2027.ics";
    document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    if (feedback) feedback.textContent = "Calendar reminder downloaded. Open it to add the event.";
  });
  const shareButton = document.querySelector("#share-site");
  if (shareButton) shareButton.addEventListener("click", async () => {
    const shareData = { title: document.title, text: "Join YOUNG STAR BOYZ for Ganesh Puja — Ganpati Bappa Morya!", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        if (feedback) feedback.textContent = "Website link copied. Share it with your friends and family.";
      } else {
        const copyField = document.createElement("textarea");
        copyField.value = shareData.url;
        copyField.setAttribute("readonly", "");
        copyField.style.position = "fixed";
        copyField.style.opacity = "0";
        document.body.appendChild(copyField);
        copyField.select();
        let copied = false;
        try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
        copyField.remove();
        if (feedback) feedback.textContent = copied
          ? "Website link copied. Share it with your friends and family."
          : "Use your browser menu to copy and share this page link.";
      }
    } catch (error) { if (error.name !== "AbortError" && feedback) feedback.textContent = "Sharing is not available in this browser right now."; }
  });


  // Installable app support (PWA). Installation requires HTTPS or localhost.
  const installButton = document.querySelector("#install-app");
  let installPrompt = null;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (installButton) {
    if (isStandalone) {
      installButton.textContent = "✓ App Installed";
      installButton.disabled = true;
      installButton.setAttribute("aria-label", "YOUNG STAR BOYZ app is installed");
    }
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installPrompt = event;
      installButton.hidden = false;
    });
    installButton.addEventListener("click", async () => {
      if (isStandalone) return;
      if (installPrompt) {
        installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (feedback) feedback.textContent = choice.outcome === "accepted"
          ? "Thank you! YOUNG STAR BOYZ is being installed."
          : "Installation was cancelled. You can install it anytime.";
        installPrompt = null;
      } else if (isIOS) {
        if (feedback) feedback.textContent = "To install: tap Share in Safari, then choose “Add to Home Screen”.";
      } else if (feedback) {
        feedback.textContent = "Open your browser menu (⋮) and choose “Install app” or “Add to Home screen”.";
      }
    });
    window.addEventListener("appinstalled", () => {
      installPrompt = null;
      installButton.textContent = "✓ App Installed";
      installButton.disabled = true;
      if (feedback) feedback.textContent = "YOUNG STAR BOYZ has been installed on your phone.";
    });
  }
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        if (feedback) feedback.textContent = "App install support could not be enabled in this browser.";
      });
    });
  }

  // Festival date supplied in the original project; displayed in India Standard Time.
  const targetTime = new Date("2027-09-04T00:00:00+05:30").getTime();
  const fields = {
    days: document.querySelector("#countdown-days"),
    hours: document.querySelector("#countdown-hours"),
    minutes: document.querySelector("#countdown-minutes"),
    seconds: document.querySelector("#countdown-seconds")
  };
  const message = document.querySelector("#countdown-message");
  let countdownInterval;
  const updateCountdown = () => {
    if (Object.values(fields).some((field) => !field)) return;
    const remaining = targetTime - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => { field.textContent = "00"; });
      if (message) message.textContent = "Ganesh Chaturthi is here! Ganpati Bappa Morya!";
      if (countdownInterval) window.clearInterval(countdownInterval);
      return;
    }
    fields.days.textContent = String(Math.floor(remaining / 86400000)).padStart(3, "0");
    fields.hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
    fields.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
    fields.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  };
  updateCountdown();
  if (targetTime > Date.now()) countdownInterval = window.setInterval(updateCountdown, 1000);
})();
