/* ==========================================================================
   THE AI MARKETING LAUNCHPAD — CORE INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ensure ScrollTrigger is registered
  gsap.registerPlugin(ScrollTrigger);

  /* --- 1) LENIS SMOOTH SCROLLING --- */
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* --- 2) SCROLL PROGRESS BAR --- */
  if (!prefersReducedMotion) {
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  /* --- 3) HERO MASK WIPE & PAGE ENTRANCE --- */
  // Make the headline line-masks visible and animate them
  const entranceTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
  
  if (!prefersReducedMotion) {
    // Reveal lines with clip-path mask wipe + slight slide up
    entranceTimeline
      .to('.hero-title .line-mask', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power4.out'
      })
      .from('.main-header', { opacity: 0, y: -20 }, '-=0.8')
      .from('.hero-badge', { opacity: 0, y: 15 }, '-=0.6')
      .from('.hero-subtitle', { opacity: 0, y: 15 }, '-=0.5')
      .from('.hero-actions', { opacity: 0, y: 15 }, '-=0.5')
      .from('.hero-image-wrapper', { opacity: 0, scale: 0.98 }, '-=0.6');
  } else {
    // Fallback for reduced motion
    gsap.set('.hero-title .line-mask', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0 });
    entranceTimeline.from('body', { opacity: 0, duration: 0.5 });
  }

  /* --- 4) SECTION SCROLL REVEALS --- */
  if (!prefersReducedMotion) {
    const scrollRevealSections = document.querySelectorAll('.section:not(#hero)');
    scrollRevealSections.forEach(section => {
      const itemsToReveal = section.querySelectorAll(
        '.section-label, .section-heading, .section-desc, .cards-grid > *, .pillars-grid > *, .curriculum-grid > *, .curriculum-bonus-card, .step-card, .takeaway-list li, .pricing-card, .accordion-item, .gallery-item, .final-title, .final-desc, .cta-group, .instructor-img, .instructor-content > *'
      );
      
      if (itemsToReveal.length > 0) {
        gsap.from(itemsToReveal, {
          opacity: 0,
          y: 28,
          scale: 0.98,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Special line reveal for final CTA
    gsap.to('.final-title .line-mask', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      y: 0,
      stagger: 0.15,
      duration: 1.0,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#final-cta',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  } else {
    // Enable simple visibility for final CTA title in reduced motion
    gsap.set('.final-title .line-mask', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0 });
  }

  /* --- 5) PARALLAX IMAGES (DESKTOP ONLY) --- */
  if (!isMobile && !prefersReducedMotion) {
    gsap.to('.hero-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.instructor-img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#instructor',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* --- 6) STATS COUNT-UP ANIMATION --- */
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(stat => {
    const targetValue = parseInt(stat.getAttribute('data-val'), 10);
    
    gsap.fromTo(stat, 
      { textContent: 0 }, 
      {
        textContent: targetValue,
        duration: 2.0,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.trust-strip',
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* --- 7) HOW-IT-WORKS CONNECTOR DRAWING (DESKTOP ONLY) --- */
  const connectorLine = document.querySelector('#step-draw-line');
  if (connectorLine && !isMobile && !prefersReducedMotion) {
    // Set up SVG line length mapping
    const lineLength = 2000; // Large buffer fallback
    gsap.set(connectorLine, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

    gsap.to(connectorLine, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.how-steps-container',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: true
      }
    });
  }

  /* --- 8) MAGNETIC BUTTONS WITH PRESS RIPPLE --- */
  const magneticButtons = document.querySelectorAll('.magnetic-button');
  if (!isMobile && !prefersReducedMotion) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)'
        });
      });
    });
  }

  // Ripple Effect on Click/Tap for all Buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
      ripple.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
      ripple.classList.add('btn-ripple');

      const existingRipple = this.querySelector('.btn-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* --- 9) 3D TILT CARD EFFECT (DESKTOP ONLY) --- */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!isMobile && !prefersReducedMotion) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Custom properties for radial glow CSS
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Rotate math
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 12; // Lower divisor = higher rotation tilt
        const rotateY = (x - centerX) / 12;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 800,
          y: -6,
          duration: 0.35,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  /* --- 10) FAQ ACCORDION ENGINE --- */
  const faqHeaders = document.querySelectorAll('.accordion-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const content = currentItem.querySelector('.accordion-content');
      const isAlreadyExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other open FAQ accordion tabs
      faqHeaders.forEach(otherHeader => {
        if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
          otherHeader.setAttribute('aria-expanded', 'false');
          gsap.to(otherHeader.parentElement.querySelector('.accordion-content'), {
            height: 0,
            duration: 0.4,
            ease: 'power3.out'
          });
        }
      });

      // Toggle current FAQ tab
      header.setAttribute('aria-expanded', !isAlreadyExpanded);
      if (!isAlreadyExpanded) {
        // Open
        gsap.set(content, { height: 'auto' });
        const targetHeight = content.clientHeight;
        gsap.fromTo(content, 
          { height: 0 }, 
          { height: targetHeight, duration: 0.4, ease: 'power3.out' }
        );
      } else {
        // Close
        gsap.to(content, { height: 0, duration: 0.4, ease: 'power3.out' });
      }
    });
  });

  /* --- 11) LIGHTBOX GALLERY SYSTEM --- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let activeIndex = 0;
  const galleryData = Array.from(galleryItems).map(item => {
    const img = item.querySelector('.gallery-img');
    const fallbackText = item.querySelector('.img-fallback span');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : (fallbackText ? fallbackText.textContent : 'Verification image'),
      fallback: img ? img.style.display === 'none' : true
    };
  });

  function showLightboxImage(index) {
    activeIndex = index;
    const item = galleryData[activeIndex];
    
    lightboxImg.setAttribute('src', item.src);
    lightboxImg.setAttribute('alt', item.alt);
    lightboxCaption.textContent = item.alt;

    // Show lightbox container
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Pause Lenis smooth scrolling while lightbox is active
    if (lenis) lenis.stop();

    // Smooth zoom image transition
    gsap.fromTo('#lightbox-img', 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }

  function hideLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    // Restart Lenis smooth scroll
    if (lenis) lenis.start();
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showLightboxImage(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', hideLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      hideLightbox();
    }
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      let prevIdx = activeIndex - 1;
      if (prevIdx < 0) prevIdx = galleryData.length - 1;
      showLightboxImage(prevIdx);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      let nextIdx = activeIndex + 1;
      if (nextIdx >= galleryData.length) nextIdx = 0;
      showLightboxImage(nextIdx);
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') hideLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    }
  });
});
