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

  /* ─── 9. PREMIUM 3D CARD TILT & SHEEN (desktop) ─────────── */
  if (!isMobile && !noMotion) {
    document.querySelectorAll('.pain-card, .pillar-card, .pricing-card').forEach(card => {
      // Create/ensure sheen element exists
      let sheen = card.querySelector('.card-sheen');
      if (!sheen) {
        sheen = document.createElement('div');
        sheen.className = 'card-sheen';
        card.appendChild(sheen);
      }

      card.addEventListener('mouseenter', () => {
        gsap.to(sheen, { opacity: 1, duration: 0.3 });
      });

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Move sheen tracking mouse
        gsap.to(sheen, {
          left: x,
          top: y,
          duration: 0.1,
          overwrite: 'auto'
        });

        // 3D rotations based on mouse position
        const xPct = (x / rect.width) - 0.5;
        const yPct = (y / rect.height) - 0.5;
        const rotateX = -yPct * 12; // tilt vertically
        const rotateY = xPct * 12;  // tilt horizontally

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          y: -8, // slight hover lift
          transformPerspective: 1000,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(sheen, { opacity: 0, duration: 0.4 });
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          transformPerspective: 1000,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
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

  /* ─── 16. AI CHATBOT INTERACTION ────────────────────────── */
  const chatbotBubble = document.getElementById('chatbot-bubble');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose  = document.getElementById('chatbot-close');
  const chatbotForm   = document.getElementById('chatbot-input-form');
  const chatbotInput  = document.getElementById('chatbot-input');
  const chatbotMsgs   = document.getElementById('chatbot-messages');
  const suggestions   = document.getElementById('chatbot-suggestions');

  if (chatbotBubble && chatbotWindow && chatbotClose) {
    // Toggle Chat Window
    chatbotBubble.addEventListener('click', () => {
      chatbotWindow.classList.add('is-open');
      chatbotBubble.style.transform = 'scale(0)';
      setTimeout(() => chatbotInput.focus(), 400);
    });

    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('is-open');
      chatbotBubble.style.transform = 'scale(1)';
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (chatbotWindow.classList.contains('is-open') && 
          !chatbotWindow.contains(e.target) && 
          !chatbotBubble.contains(e.target)) {
        chatbotClose.click();
      }
    });

    // Send Message
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatbotInput.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      chatbotInput.value = '';
      
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        processBotResponse(text);
      }, 1000 + Math.random() * 800);
    });

    // Click Suggestions
    suggestions.addEventListener('click', (e) => {
      const chip = e.target.closest('.suggestion-chip');
      if (!chip) return;
      const query = chip.dataset.query;
      
      appendMessage(chip.textContent.trim(), 'user');
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        processBotResponse(query);
      }, 800 + Math.random() * 500);
    });
  }

  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', `message--${sender}`);
    
    const bubble = document.createElement('div');
    bubble.classList.add('message__bubble');
    bubble.innerHTML = text; // Safe here as we generate the HTML
    
    msg.appendChild(bubble);
    chatbotMsgs.appendChild(msg);
    chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
  }

  let typingIndicator = null;
  function showTypingIndicator() {
    if (typingIndicator) return;
    
    typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'message--bot', 'message-typing');
    
    const bubble = document.createElement('div');
    bubble.classList.add('message__bubble');
    
    const dots = document.createElement('div');
    dots.classList.add('typing-dots');
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    bubble.appendChild(dots);
    typingIndicator.appendChild(bubble);
    chatbotMsgs.appendChild(typingIndicator);
    chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
  }

  function removeTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.remove();
      typingIndicator = null;
    }
  }

  // NLP Parser & Response Generator
  function processBotResponse(query) {
    const q = query.toLowerCase();
    
    // 1. Check for manual redirect trigger
    if (q.includes('talk') || q.includes('muddassir') || q.includes('mentor') || q.includes('speak') || q.includes('connect') || q.includes('owner') || q.includes('number') || q.includes('direct') || q.includes('call') || q.includes('phone') || q.includes('contact')) {
      const url = `https://wa.me/918887620727?text=${encodeURIComponent("Hi Muddassir, I was using the chatbot on your launchpad website and would love to ask you a question directly: " + query)}`;
      appendMessage("I want to make sure you get the best and most accurate guidance! Let's connect you directly with Muddassir Ali on WhatsApp.", 'bot');
      setTimeout(() => {
        appendMessage(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--accent btn--sm" style="display:inline-flex;margin-top:4px;">🙋 Connect on WhatsApp</a>`, 'bot');
      }, 500);
      return;
    }

    // 2. Automated Q&A Matching
    let response = "";
    
    if (q.includes('price') || q.includes('fee') || q.includes('cost') || q.includes('pay') || q.includes('rupees') || q.includes('money') || q.includes('amount') || q.includes('charges')) {
      response = "The course investment is a single payment of <strong>₹2,999</strong>, which includes all 12 live classes, templates, community access, and a completion certificate. There are no hidden fees or paid tools required.";
    } else if (q.includes('live') || q.includes('recorded') || q.includes('recording') || q.includes('miss')) {
      response = "All classes are <strong>100% live</strong> (never pre-recorded) to keep you focused. If you miss a class, you will receive short written notes, and you can ask questions directly in the next live session.";
    } else if (q.includes('time') || q.includes('schedule') || q.includes('when') || q.includes('date') || q.includes('days') || q.includes('calendar')) {
      response = "The batch starts <strong>July 6</strong>. Classes are held on <strong>Mon / Wed / Fri from 8:00 to 9:30 PM</strong>. Perfect for working professionals and students.";
    } else if (q.includes('certificate') || q.includes('certified') || q.includes('credential')) {
      response = "Yes! You will receive a **digital certificate of completion** branded by <strong>Veloxis Global</strong> after the cohort ends.";
    } else if (q.includes('refund') || q.includes('moneyback') || q.includes('return') || q.includes('guarantee')) {
      response = "We offer an honest <strong>full refund policy up to the end of Class 2</strong>. If you feel the course is not for you after two sessions, just message us on WhatsApp and we will issue a full refund immediately.";
    } else if (q.includes('experience') || q.includes('years') || q.includes('who') || q.includes('instructor') || q.includes('teacher') || q.includes('mentor')) {
      response = "Your instructor is <strong>Muddassir Ali</strong>, founder of Veloxis Global. He is a Meta Ads and AI specialist with **6+ years of experience** and has trained **200+ marketers**.";
    } else if (q.includes('tool') || q.includes('free') || q.includes('chatgpt') || q.includes('paid')) {
      response = "We use **only free AI and digital marketing tools** in this course. You will not have to pay a single rupee for software or subscriptions during or after the cohort.";
    } else if (q.includes('job') || q.includes('placement') || q.includes('earn') || q.includes('freelance') || q.includes('money') || q.includes('career')) {
      response = "This course teaches you real, in-demand skills (SEO, Meta Ads, AI copywriting). While we do not promise guaranteed jobs, we show you exactly how to find your first client and build a portfolio to land work.";
    } else {
      // 3. Fallback to WhatsApp Handoff
      const url = `https://wa.me/918887620727?text=${encodeURIComponent("Hi Muddassir, I have a question about the AI Marketing Launchpad: " + query)}`;
      response = "That is a great question! Since it's a bit more specific, I want to make sure you get the most accurate answer. Let me redirect you to Muddassir directly on WhatsApp.";
      appendMessage(response, 'bot');
      setTimeout(() => {
        appendMessage(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--accent btn--sm" style="display:inline-flex;margin-top:4px;">💬 Chat on WhatsApp</a>`, 'bot');
      }, 500);
      return;
    }
    
    appendMessage(response, 'bot');
  }

  /* ─── 17. SCARCITY PROGRESS BAR ANIMATION ───────────────── */
  if (!noMotion) {
    const scarcityFill = document.querySelector('.scarcity-progress-bar__fill');
    if (scarcityFill) {
      gsap.fromTo(scarcityFill, 
        { width: '0%' },
        {
          width: '84%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.scarcity-banner',
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  /* ─── 18. TESTIMONIALS CAROUSEL SLIDER ─────────────────── */
  const slides = document.querySelectorAll('.testimonial-slide');
  const sliderDots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;
    
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    sliderDots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }
    
    sliderDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        showSlide(index);
        startAutoSlide();
      });
    });

    const carouselContainer = document.querySelector('.testimonials-slider');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }

  /* ─── 19. PRICING SPLIT SWITCHER ───────────────────────── */
  const planOneTimeBtn = document.getElementById('plan-one-time');
  const planSplitBtn = document.getElementById('plan-split');
  const pricingDisplayAmount = document.getElementById('pricing-display-amount');
  const pricingDisplayLabel = document.getElementById('pricing-display-label');
  const checkoutOneTime = document.getElementById('checkout-one-time');
  const checkoutSplit = document.getElementById('checkout-split');

  if (planOneTimeBtn && planSplitBtn) {
    planOneTimeBtn.addEventListener('click', () => {
      planOneTimeBtn.classList.add('active');
      planSplitBtn.classList.remove('active');
      if (pricingDisplayAmount) pricingDisplayAmount.textContent = '₹2,999';
      if (pricingDisplayLabel) pricingDisplayLabel.textContent = 'Full 30-day live program';
      if (checkoutOneTime) checkoutOneTime.style.display = 'block';
      if (checkoutSplit) checkoutSplit.style.display = 'none';
    });

    planSplitBtn.addEventListener('click', () => {
      planSplitBtn.classList.add('active');
      planOneTimeBtn.classList.remove('active');
      if (pricingDisplayAmount) pricingDisplayAmount.textContent = '₹1,650';
      if (pricingDisplayLabel) pricingDisplayLabel.textContent = 'Paid monthly for 2 months';
      if (checkoutOneTime) checkoutOneTime.style.display = 'none';
      if (checkoutSplit) checkoutSplit.style.display = 'block';
    });
  }

  /* ─── 20. SKILLS CHECKLIST PROGRESS TRACKER ─────────────── */
  const skillCheckboxes = document.querySelectorAll('.skill-checkbox');
  const readinessScore = document.getElementById('readiness-score');
  const circleProgressFill = document.querySelector('.circle-progress__fill');

  function updateSkillsProgress() {
    if (skillCheckboxes.length === 0) return;

    const total = skillCheckboxes.length;
    const checkedCount = Array.from(skillCheckboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checkedCount / total) * 100);

    if (readinessScore) {
      readinessScore.textContent = `${percentage}%`;
    }

    if (circleProgressFill) {
      const circumference = 314.15;
      const offset = circumference * (1 - checkedCount / total);
      circleProgressFill.style.strokeDashoffset = offset;
    }
  }

  if (skillCheckboxes.length > 0) {
    skillCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSkillsProgress);
    });
    // Initialize on load
    updateSkillsProgress();
  }
});
