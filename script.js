/* ==========================================================================
   THE AI MARKETING LAUNCHPAD — INTERACTION ENGINE
   Lenis smooth scroll + GSAP ScrollTrigger reveals + gallery lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const isMobile  = window.matchMedia('(max-width: 768px)').matches;
  const noMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  /* ─── 1. LENIS SMOOTH SCROLL ────────────────────────────── */
  let lenis;
  if (!noMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ─── 2. SCROLL-PROGRESS BAR ────────────────────────────── */
  if (!noMotion) {
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }

  /* ─── 3. SCROLL-REVEAL (every section) ──────────────────── */
  if (!noMotion) {
    document.querySelectorAll('.reveal-group').forEach(group => {
      const children = group.children.length
        ? Array.from(group.children)
        : [group];

      gsap.from(children, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  /* ─── 4. HERO ENTRANCE ──────────────────────────────────── */
  if (!noMotion) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    tl.from('.nav', { opacity: 0, y: -16 })
      .from('.badge', { opacity: 0, y: 12 }, '-=0.5')
      .from('.hero__title', { opacity: 0, y: 20 }, '-=0.5')
      .from('.hero__sub', { opacity: 0, y: 16 }, '-=0.4')
      .from('.hero__cta-group', { opacity: 0, y: 16 }, '-=0.4')
      .from('.trust-strip', { opacity: 0, y: 16 }, '-=0.3');
  }

  /* ─── 5. STAT COUNT-UP ──────────────────────────────────── */
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.val, 10);
    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.trust-strip',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ─── 6. MOBILE NAV DRAWER ──────────────────────────────── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer  = document.getElementById('mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.getAttribute('aria-hidden') === 'false';
      drawer.setAttribute('aria-hidden', open ? 'true' : 'false');
      menuBtn.querySelector('.material-symbols-outlined').textContent = open ? 'menu' : 'close';
    });
    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.setAttribute('aria-hidden', 'true');
        menuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
      });
    });
  }

  /* ─── 7. BUTTON RIPPLE ──────────────────────────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const d = Math.max(this.clientWidth, this.clientHeight);
      const r = d / 2;
      ripple.style.width = ripple.style.height = d + 'px';
      ripple.style.left = (e.clientX - this.getBoundingClientRect().left - r) + 'px';
      ripple.style.top  = (e.clientY - this.getBoundingClientRect().top  - r) + 'px';
      ripple.classList.add('btn-ripple');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ─── 8. LIGHTBOX ───────────────────────────────────────── */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbClose     = document.querySelector('.lightbox__close');
  const lbPrev      = document.querySelector('.lightbox__prev');
  const lbNext      = document.querySelector('.lightbox__next');
  const galleryData = [];
  let activeIdx = 0;

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const img = item.querySelector('.gallery-img');
    if (img) galleryData.push({ src: img.src, alt: img.alt });

    item.addEventListener('click', () => {
      activeIdx = i;
      showLightbox(i);
    });
  });

  function showLightbox(i) {
    if (!galleryData[i]) return;
    lbImg.src = galleryData[i].src;
    lbImg.alt = galleryData[i].alt;
    lightbox.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
    gsap.fromTo(lbImg, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
  }

  function hideLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }

  if (lbClose) lbClose.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) hideLightbox(); });
  if (lbPrev) lbPrev.addEventListener('click', e => { e.stopPropagation(); activeIdx = (activeIdx - 1 + galleryData.length) % galleryData.length; showLightbox(activeIdx); });
  if (lbNext) lbNext.addEventListener('click', e => { e.stopPropagation(); activeIdx = (activeIdx + 1) % galleryData.length; showLightbox(activeIdx); });

  document.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });

  /* ─── 9. CARD HOVER LIFT (desktop) ──────────────────────── */
  if (!isMobile && !noMotion) {
    document.querySelectorAll('.pain-card, .pillar-card, .pricing-card').forEach(card => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out' }));
    });
  }

  /* ─── 10. STEP HOVER SCALE ──────────────────────────────── */
  if (!isMobile && !noMotion) {
    document.querySelectorAll('.step-card__num').forEach(num => {
      const card = num.parentElement;
      card.addEventListener('mouseenter', () => gsap.to(num, { scale: 1.12, duration: 0.3, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(num, { scale: 1, duration: 0.35, ease: 'power2.out' }));
    });
  }

  /* ─── 11. NAV SHADOW ON SCROLL ──────────────────────────── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -64',
      onUpdate: self => {
        nav.style.boxShadow = self.progress > 0
          ? '0 4px 20px rgba(10,10,11,.06)'
          : '0 1px 0 var(--surface-variant)';
      },
    });
  }

  /* ─── 12. SMOOTH ANCHOR LINK SCROLLING ──────────────────── */
  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -64, duration: 1.2 });
        }
      });
    });
  }

  /* ─── 13. SMOOTH FAQ ACCORDION (GSAP) ────────────────────── */
  document.querySelectorAll('.accordion__item').forEach(item => {
    const header = item.querySelector('.accordion__header');
    const wrapper = item.querySelector('.accordion__body-wrapper');
    
    if (header && wrapper) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');
        
        // Close other items
        document.querySelectorAll('.accordion__item').forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-active')) {
            otherItem.classList.remove('is-active');
            otherItem.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
            gsap.to(otherItem.querySelector('.accordion__body-wrapper'), { height: 0, duration: 0.35, ease: 'power2.out' });
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('is-active');
          header.setAttribute('aria-expanded', 'false');
          gsap.to(wrapper, { height: 0, duration: 0.35, ease: 'power2.out' });
        } else {
          item.classList.add('is-active');
          header.setAttribute('aria-expanded', 'true');
          gsap.to(wrapper, { height: wrapper.scrollHeight, duration: 0.35, ease: 'power2.out' });
        }
      });
    }
  });

  /* ─── 14. INTERACTIVE ROI CALCULATOR ─────────────────────── */
  const clientSlider = document.getElementById('client-slider');
  const rateSlider = document.getElementById('project-rate-slider');
  
  const clientValDisplay = document.getElementById('client-val');
  const rateValDisplay = document.getElementById('rate-val');
  
  const revenueDisplay = document.getElementById('revenue-amount');
  const paybackDisplay = document.getElementById('payback-days');
  const roiDisplay = document.getElementById('roi-percent');
  
  function updateCalculator() {
    if (!clientSlider || !rateSlider) return;
    
    const clients = parseInt(clientSlider.value, 10);
    const rate = parseInt(rateSlider.value, 10);
    
    clientValDisplay.textContent = clients;
    rateValDisplay.textContent = '₹' + rate.toLocaleString('en-IN');
    
    const monthlyRevenue = clients * rate;
    revenueDisplay.textContent = '₹' + monthlyRevenue.toLocaleString('en-IN');
    
    // Payback period
    const courseFee = 2999;
    const paybackDays = Math.ceil((courseFee / monthlyRevenue) * 30);
    paybackDisplay.textContent = paybackDays + (paybackDays === 1 ? ' Day' : ' Days');
    
    // ROI Percentage
    const roi = ((monthlyRevenue - courseFee) / courseFee) * 100;
    roiDisplay.textContent = Math.round(roi) + '%';
  }
  
  if (clientSlider && rateSlider) {
    clientSlider.addEventListener('input', updateCalculator);
    rateSlider.addEventListener('input', updateCalculator);
    updateCalculator(); // Initialize on load
  }

  /* ─── 15. MAGNETIC BUTTON EFFECT ────────────────────────── */
  if (!isMobile && !noMotion) {
    document.querySelectorAll('.btn--accent, .glass-photo-frame').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }
});
