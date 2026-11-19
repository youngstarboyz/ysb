/* YOUNG STAR BOYZ — premium motion & interaction layer.
   Works without GSAP (CDN blocked/offline): content is never hidden by this file unless GSAP is running. */
(() => {
  "use strict";
  // ---- CONFIG: fill these in once confirmed by the committee ----
  const CONFIG = {
    whatsappNumber: "", // international format digits only, e.g. "919XXXXXXXXX". Empty = WhatsApp link stays hidden.
    whatsappMessage: "Namaste! I would like to know more about the YOUNG STAR BOYZ Ganesh Puja."
  };

  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ---- Preloader (always dismissed; hard timeout prevents a stuck screen) ----
  const preloader = $("#preloader");
  let heroStarted = false;
  const finishLoading = () => {
    if (!preloader || preloader.classList.contains("is-done")) return;
    preloader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    window.setTimeout(() => preloader.remove(), 900);
    startHero();
  };
  const minDelay = reduced ? 0 : 1700;
  const started = performance.now();
  const onReady = () => window.setTimeout(finishLoading, Math.max(0, minDelay - (performance.now() - started)));
  if (document.readyState === "complete") onReady(); else window.addEventListener("load", onReady, { once: true });
  window.setTimeout(finishLoading, 4500);

  const hasGsap = () => typeof window.gsap !== "undefined";
  const hasST = () => hasGsap() && typeof window.ScrollTrigger !== "undefined";
  if (hasST()) { gsap.registerPlugin(ScrollTrigger); root.classList.add("gsap-on"); }

  function startHero() {
    if (heroStarted) return; heroStarted = true;
    if (!hasGsap() || reduced) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-copy .mantra, .hero-copy .since", { y: 20, opacity: 0, duration: .8, stagger: .12 })
      .from(".h1-line", { yPercent: 60, opacity: 0, duration: 1, stagger: .12 }, "-=.4")
      .from(".hero-support, .hero-tag, .hero-description", { y: 24, opacity: 0, duration: .8, stagger: .12 }, "-=.5")
      .from(".hero-actions .button", { y: 24, opacity: 0, duration: .7, stagger: .12, clearProps: "transform,opacity" }, "-=.4");
    gsap.from(".hero-image", { scale: 1.12, duration: 2.6, ease: "power2.out" });
  }

  // ---- Scroll reveals ----
  const targets = ".programme-card,.timeline-item,.mission-grid article,.section-lead,.programme-section h2";
  if (hasST() && !reduced) {
    ScrollTrigger.batch(targets, {
      start: "top 88%", once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: "power3.out", overwrite: true, clearProps: "transform" })
    });
    gsap.set(targets, { opacity: 0 });
    // hero parallax
    gsap.to(".hero-image", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-mandala", { rotation: "+=40", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    // timeline line draw
    $$(".timeline-item").forEach((li) => gsap.from(li, { x: -24, opacity: 0, duration: .8, scrollTrigger: { trigger: li, start: "top 90%", once: true } }));
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  // ---- Countdown pulse on tick ----
  const secs = $("#countdown-seconds");
  if (secs && hasGsap() && !reduced) {
    new MutationObserver(() => gsap.fromTo(secs, { scale: 1.12, opacity: .6 }, { scale: 1, opacity: 1, duration: .35, ease: "power2.out" }))
      .observe(secs, { childList: true, characterData: true, subtree: true });
  }

  // ---- Magnetic buttons ----
  if (hasGsap() && finePointer && !reduced) {
    $$(".button, .nav-join").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .25, duration: .3 });
      });
      btn.addEventListener("pointerleave", () => gsap.to(btn, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.5)" }));
    });
  }

  // ---- Canvas particles (hero gold sparks) and petals (page-wide, subtle) ----
  function makeField(canvas, count, spawn, draw, bounds) {
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, items = [], raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = bounds ? bounds().getBoundingClientRect() : canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const n = window.innerWidth < 760 ? Math.round(count * .5) : count;
    resize();
    items = Array.from({ length: n }, () => spawn(w, h, true));
    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      items.forEach((p, i) => { draw(ctx, p, w, h); if (p.dead) items[i] = spawn(w, h, false); });
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(canvas);
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("resize", () => { resize(); }, { passive: true });
    kick();
  }
  makeField($("#particle-canvas"), 55,
    (w, h, init) => ({ x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: Math.random() * 1.8 + .5, vy: -(Math.random() * .4 + .15), vx: (Math.random() - .5) * .25, a: Math.random() * .6 + .3, t: Math.random() * 6 }),
    (ctx, p) => { p.x += p.vx; p.y += p.vy; p.t += .03; const a = p.a * (.6 + .4 * Math.sin(p.t));
      ctx.beginPath(); ctx.fillStyle = `rgba(232,196,106,${a})`; ctx.shadowColor = "#E8C46A"; ctx.shadowBlur = 8; ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); if (p.y < -10) p.dead = true; });
  const petals = $("#petal-canvas");
  makeField(petals, 12,
    (w, h, init) => ({ x: Math.random() * w, y: init ? Math.random() * h : -20, s: Math.random() * 6 + 5, vy: Math.random() * .5 + .3, sw: Math.random() * 1.2 + .4, ph: Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - .5) * .03, hue: Math.random() > .5 ? "#F29B1D" : "#E8872B" }),
    (ctx, p, w, h) => { p.ph += .015; p.y += p.vy; p.x += Math.sin(p.ph) * p.sw * .5; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = .55; ctx.fillStyle = p.hue;
      ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, 6.283); ctx.fill(); ctx.restore(); if (p.y > h + 20) p.dead = true; });


  // ---- WhatsApp (shown only when a real number is configured) ----
  const wa = $("#whatsapp-link");
  if (wa && /^\d{10,15}$/.test(CONFIG.whatsappNumber)) {
    wa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    wa.hidden = false;
  }

  // Smooth scroll: native CSS scroll-behavior from style.css is retained (Lenis not needed; avoids extra JS and touch-scroll issues).
})();
