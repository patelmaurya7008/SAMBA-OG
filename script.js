/**
 * MARUTI SHOOES — Spatial 3D Scroll Automation & Experience Engine
 * Adidas Samba OG Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ambient Lighting & Spotlight
  const spotlightCursor = document.getElementById('spotlightCursor');
  const ambientEmerald = document.getElementById('ambientEmerald');
  const ambientGum = document.getElementById('ambientGum');

  // Hero 3D Scroll Track & Elements
  const heroScrollTrack = document.getElementById('heroScrollTrack');
  const backdropSamba = document.getElementById('backdropSamba');
  const backdropOg = document.getElementById('backdropOg');
  const shoeHeroRig = document.getElementById('shoeHeroRig');
  const shoeInteractiveContainer = document.getElementById('shoeInteractiveContainer');
  const disassembleCanvas = document.getElementById('disassembleCanvas');
  const canvasCtx = disassembleCanvas ? disassembleCanvas.getContext('2d') : null;
  const heroShoeShadow = document.getElementById('heroShoeShadow');
  const heroBottomGroup = document.getElementById('heroBottomGroup');
  const shopNowBtn = document.getElementById('shopNowBtn');

  // Exploded Callout Elements
  const explodedCallouts = document.getElementById('explodedCallouts');
  const calloutUpper = document.getElementById('calloutUpper');
  const calloutMidsole = document.getElementById('calloutMidsole');
  const calloutOutsole = document.getElementById('calloutOutsole');

  // Navigation Elements
  const navLogoPill = document.getElementById('navLogoPill');
  const navCatBtns = document.querySelectorAll('.nav-cat-btn');
  const bagBtn = document.getElementById('bagBtn');
  const bagCounter = document.getElementById('bagCounter');

  // Modal Views
  const bagCheckoutView = document.getElementById('bagCheckoutView');
  const materialsView = document.getElementById('materialsView');
  const craftView = document.getElementById('craftView');
  const aboutView = document.getElementById('aboutView');

  // Aux Dossier Buttons
  const navMaterialsBtn = document.getElementById('navMaterialsBtn');
  const navCraftBtn = document.getElementById('navCraftBtn');
  const navAboutBtn = document.getElementById('navAboutBtn');

  // Modal Close Buttons
  const closeBagBtn = document.getElementById('closeBagBtn');
  const closeMaterialsBtn = document.getElementById('closeMaterialsBtn');
  const closeCraftBtn = document.getElementById('closeCraftBtn');
  const closeAboutBtn = document.getElementById('closeAboutBtn');

  // Colorway Cards in Studio Section
  const colorwayCards = document.querySelectorAll('.colorway-card');
  const colorwaySelectBtns = document.querySelectorAll('.colorway-select-btn');

  // Checkout Data & Configurator
  const sizePills = document.querySelectorAll('.size-pill');
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const bagItemImg = document.getElementById('bagItemImg');
  const bagItemMeta = document.getElementById('bagItemMeta');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');

  // Payment Tabs
  const payTabs = document.querySelectorAll('.pay-tab');
  const paymentPanels = document.querySelectorAll('.payment-panel');

  // Dynamic Toast
  const dynamicToast = document.getElementById('dynamicToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastDesc = document.getElementById('toastDesc');

  // State
  let activeColor = 'cloud';
  let activeSize = 'UK 8';
  let cartCount = 1;
  const officialRetailPrice = '₹10,999';

  // Assets for User-Uploaded Samba OG Colorways (Cloud White & Core Black)
  const isolatedShoeAssets = {
    cloud: 'assets/colours/white_canvas.webp',
    core: 'assets/colours/black_canvas.webp'
  };

  const lifestyleAssets = {
    cloud: 'assets/colours/samba_white.png',
    core: 'assets/colours/samba_black.png'
  };

  // =========================================================================
  // 1. Ultra-HD Photorealistic Disassembly Preloader (31 Commercial Studio Frames)
  // Photorealistic Adidas Samba OG: authentic Pine Green tumbled leather,
  // gold SAMBA foil, serrated stripes, floating cotton laces, EVA footbed,
  // and honeycomb amber gum cupsole on transparent background.
  // =========================================================================
  const TOTAL_HD_FRAMES = 31; // 0 to 30
  const hdFrames = [];
  let currentRenderedFrame = 0;

  for (let i = 0; i < TOTAL_HD_FRAMES; i++) {
    const img = new Image();
    const frameNum = String(i).padStart(3, '0');
    img.src = `assets/hd_frames/frame_${frameNum}.webp?v=7`;
    img.onload = () => {
      if (i === 0 && canvasCtx) {
        drawFrame(0);
      }
    };
    hdFrames.push(img);
  }

  function drawFrame(frameIndex) {
    if (!canvasCtx || !disassembleCanvas) return;
    const clampedIndex = Math.min(TOTAL_HD_FRAMES - 1, Math.max(0, Math.round(frameIndex)));
    const img = hdFrames[clampedIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      canvasCtx.imageSmoothingEnabled = true;
      canvasCtx.imageSmoothingQuality = 'high';
      canvasCtx.clearRect(0, 0, disassembleCanvas.width, disassembleCanvas.height);
      canvasCtx.drawImage(img, 0, 0, disassembleCanvas.width, disassembleCanvas.height);
      currentRenderedFrame = clampedIndex;
    }
  }

  // Initial draw
  if (hdFrames[0]) {
    drawFrame(0);
  }

  // =========================================================================
  // 2. Touch, Drag & Scroll 3D Automation Engine
  // Disassembly starts IMMEDIATELY the moment screen is touched, dragged, or scrolled!
  // =========================================================================
  let scrollProgress = 0;
  let targetProgress = 0;
  let isTouchInteracting = false;
  let touchStartY = 0;
  let touchStartX = 0;
  let touchStartProgress = 0;

  function updateScrollProgress() {
    if (isTouchInteracting) return;
    if (!heroScrollTrack) return;
    const rect = heroScrollTrack.getBoundingClientRect();
    const scrollRunway = heroScrollTrack.offsetHeight - window.innerHeight;
    if (scrollRunway <= 0) return;

    const currentOffset = Math.max(0, -rect.top);
    targetProgress = Math.min(1, Math.max(0, currentOffset / scrollRunway));
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();

  // Create subtle glowing touch ripple for instant tactile feedback
  function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'touch-interactive-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 750);
  }

  // -------------------------------------------------------------
  // Universal Touchscreen Support (Phone, Tablet, Touchscreen Laptop)
  // Touch screen -> Disassembly starts immediately!
  // -------------------------------------------------------------
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      isTouchInteracting = true;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartProgress = targetProgress;
      createTouchRipple(touchStartX, touchStartY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isTouchInteracting || e.touches.length === 0) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY - currentY; // Swipe up to explode, down to assemble
    const progressDelta = deltaY / 320;
    targetProgress = Math.min(1, Math.max(0, touchStartProgress + progressDelta));
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isTouchInteracting = false;
  }, { passive: true });

  // -------------------------------------------------------------
  // Pointer & Mouse Dragging on Screen / Shoe Container
  // -------------------------------------------------------------
  let isPointerDown = false;
  let pointerStartY = 0;
  let pointerStartProgress = 0;

  if (shoeInteractiveContainer) {
    shoeInteractiveContainer.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      isTouchInteracting = true;
      pointerStartY = e.clientY;
      pointerStartProgress = targetProgress;
      shoeInteractiveContainer.style.cursor = 'grabbing';
      createTouchRipple(e.clientX, e.clientY);
    });

    window.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      const deltaY = pointerStartY - e.clientY;
      targetProgress = Math.min(1, Math.max(0, pointerStartProgress + deltaY / 320));
    });

    window.addEventListener('pointerup', () => {
      if (isPointerDown && shoeInteractiveContainer) {
        shoeInteractiveContainer.style.cursor = 'grab';
      }
      isPointerDown = false;
      setTimeout(() => { isTouchInteracting = false; }, 100);
    });

    // Tap on shoe to toggle assemble / disassemble
    let lastTapTime = 0;
    shoeInteractiveContainer.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastTapTime > 300) {
        lastTapTime = now;
        if (targetProgress < 0.5) {
          targetProgress = 1.0;
          showToast('3D Disassembly', 'Exploded layers (Tap again to reassemble)');
        } else {
          targetProgress = 0.0;
          showToast('Samba OG Assembled', 'Layers snapped back together');
        }
      }
    });
  }

  // Dynamic Motion Intensity Engine (SAMBA OG is ultra-light at rest, only visible with motion!)
  let motionIntensity = 0;
  let targetMotionIntensity = 0;
  let lastActivityTime = 0;
  let prevScrollProgress = 0;
  let isAutoPlaying = false;
  let autoPlayStartTime = 0;

  // Smooth lerp frame loop combining scroll automation, touch drag, and mouse parallax
  let targetRotX = 0, targetRotY = 0, targetTransX = 0;
  let currentRotX = 0, currentRotY = 0, currentTransX = 0;
  let currentSmoothFrame = 0;

  function renderFrame() {
    // Smooth progress interpolation with luxury physical damping (slower, buttery smooth)
    const lerpRate = isAutoPlaying ? 0.07 : 0.09;
    scrollProgress += (targetProgress - scrollProgress) * lerpRate;
    
    // Clean snap to avoid micro-jitter at resting states
    if (Math.abs(targetProgress - scrollProgress) < 0.0015) {
      scrollProgress = targetProgress;
    }
    const p = scrollProgress;

    // Motion Detection: Detect any progress change or active user interaction
    const progressDelta = Math.abs(scrollProgress - prevScrollProgress);
    prevScrollProgress = scrollProgress;

    if (progressDelta > 0.0006 || isAutoPlaying || isTouchInteracting || isPointerDown) {
      targetMotionIntensity = Math.min(1, targetMotionIntensity + 0.35 + progressDelta * 30);
      lastActivityTime = Date.now();
    }

    // Smooth decay when motion ceases
    if (Date.now() - lastActivityTime > 90) {
      targetMotionIntensity *= 0.86;
    }

    motionIntensity += (targetMotionIntensity - motionIntensity) * 0.16;

    // Phase 1: 3D Automation of "SAMBA OG" flying OUTSIDE of the laptop screen
    // Positive translateZ brings text dramatically towards the user in 3D!
    const p1 = Math.min(1, Math.max(0, p / 0.38));
    const ease1 = p1 * p1 * (3 - 2 * p1);

    // SAMBA OG is rendered in an elegant lighter slate shade that is comfortable to read yet lets the shoe shine
    // As deconstruction/scroll begins (ease1), it flies forward (+Z) and fades out smoothly.
    const sambaOpacity = Math.max(0, 0.76 - ease1 * 1.35);
    const ogOpacity = Math.max(0, 0.76 - ease1 * 1.35);
    const sambaBlur = ease1 * 8;
    const ogBlur = ease1 * 8;

    if (backdropSamba && backdropOg) {
      // SAMBA flies forward (+Z) and left, expanding like it's coming out of the screen
      const sambaX = -ease1 * 440;
      const sambaY = -ease1 * 60;
      const sambaZ = ease1 * 640; // POSITIVE Z = pops out towards the user!
      const sambaRotY = ease1 * 26;
      const sambaRotX = -ease1 * 12;
      const sambaScale = 1 + ease1 * 0.95;

      backdropSamba.style.transform = `translate3d(${sambaX.toFixed(1)}px, ${sambaY.toFixed(1)}px, ${sambaZ.toFixed(1)}px) rotateY(${sambaRotY.toFixed(1)}deg) rotateX(${sambaRotX.toFixed(1)}deg) scale(${sambaScale.toFixed(3)})`;
      backdropSamba.style.opacity = sambaOpacity.toFixed(3);
      backdropSamba.style.filter = `blur(${sambaBlur.toFixed(1)}px)`;

      // OG flies forward (+Z) and right towards the user
      const ogX = ease1 * 440;
      const ogY = -ease1 * 60;
      const ogZ = ease1 * 640; // POSITIVE Z = pops out towards the user!
      const ogRotY = -ease1 * 26;
      const ogRotX = -ease1 * 12;
      const ogScale = 1 + ease1 * 0.95;

      backdropOg.style.transform = `translate3d(${ogX.toFixed(1)}px, ${ogY.toFixed(1)}px, ${ogZ.toFixed(1)}px) rotateY(${ogRotY.toFixed(1)}deg) rotateX(${ogRotX.toFixed(1)}deg) scale(${ogScale.toFixed(3)})`;
      backdropOg.style.opacity = ogOpacity.toFixed(3);
      backdropOg.style.filter = `blur(${ogBlur.toFixed(1)}px)`;
    }


    // -------------------------------------------------------------
    // Phase 2: Ultra-HD 3D Model Disassembly Sequence (Frames 0 to 30)
    // Slower, fluid filmic frame progression
    // -------------------------------------------------------------
    const frameProg = Math.min(1, Math.max(0, p));
    const targetFrame = frameProg * (TOTAL_HD_FRAMES - 1);
    const frameLerpRate = isAutoPlaying ? 0.09 : 0.13;
    currentSmoothFrame += (targetFrame - currentSmoothFrame) * frameLerpRate;
    if (Math.abs(targetFrame - currentSmoothFrame) < 0.03) {
      currentSmoothFrame = targetFrame;
    }
    drawFrame(currentSmoothFrame);

    // Update status text dynamically
    const statusText = document.getElementById('statusText');
    if (statusText) {
      const pct = Math.round(frameProg * 100);
      if (isAutoPlaying) {
        if (pct < 98) {
          statusText.textContent = `AUTO 3D DEMO • ${pct}% DECONSTRUCTING`;
        } else {
          statusText.textContent = `AUTO 3D DEMO • 100% EXPLODED VIEW`;
        }
      } else if (pct === 0) {
        statusText.textContent = `PINE GREEN ARCHIVE • ASSEMBLED (TOUCH OR SCROLL)`;
      } else if (pct < 98) {
        statusText.textContent = `3D DECONSTRUCTING • ${pct}% • TOUCH / SCROLL`;
      } else {
        statusText.textContent = `FULLY EXPLODED VIEW • 100% (ARCHIVAL ANATOMY)`;
      }
    }

    // Dynamic 3D Rig Elevation
    if (shoeHeroRig) {
      const rigElevationY = -ease1 * 12;
      const rigScale = 1 + ease1 * 0.04;
      shoeHeroRig.style.transform = `translate(-50%, calc(-50% + ${rigElevationY.toFixed(1)}px)) scale(${rigScale.toFixed(3)})`;
    }

    // Ground Shadow softens and expands as components float apart in 3D
    if (heroShoeShadow) {
      const explodeProgress = Math.min(1, Math.max(0, frameProg));
      const shadowScale = 1 + explodeProgress * 0.38;
      const shadowOpacity = Math.max(0.18, 0.72 - explodeProgress * 0.32);
      heroShoeShadow.style.transform = `translateX(-50%) scale(${shadowScale.toFixed(3)})`;
      heroShoeShadow.style.opacity = shadowOpacity.toFixed(3);
    }

    // -------------------------------------------------------------
    // Phase 3: Exploded Technical Callouts (Revealed as shoe separates)
    // Fades in from p = 0.48 and stays pinned in full exploded state at end of front page!
    // -------------------------------------------------------------
    const pCallout = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
    const easeCallout = pCallout * pCallout * (3 - 2 * pCallout);
    const calloutAlpha = easeCallout;

    if (calloutUpper) {
      const transY = (1 - easeCallout) * 18;
      const transX = (-1 + easeCallout) * 12;
      calloutUpper.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 20px)`;
      calloutUpper.style.opacity = calloutAlpha.toFixed(3);
      calloutUpper.style.pointerEvents = calloutAlpha > 0.3 ? 'auto' : 'none';
    }

    if (calloutMidsole) {
      const transY = (1 - easeCallout) * 10;
      const transX = (1 - easeCallout) * 16;
      calloutMidsole.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 35px)`;
      calloutMidsole.style.opacity = calloutAlpha.toFixed(3);
      calloutMidsole.style.pointerEvents = calloutAlpha > 0.3 ? 'auto' : 'none';
    }

    if (calloutOutsole) {
      const transY = (1 - easeCallout) * 22;
      const transX = (-1 + easeCallout) * 12;
      calloutOutsole.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 25px)`;
      calloutOutsole.style.opacity = calloutAlpha.toFixed(3);
      calloutOutsole.style.pointerEvents = calloutAlpha > 0.3 ? 'auto' : 'none';
    }

    // Mouse Parallax interpolation
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentTransX += (targetTransX - currentTransX) * 0.08;

    if (shoeInteractiveContainer) {
      shoeInteractiveContainer.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateX(${currentTransX.toFixed(2)}px) translateZ(30px)`;
    }

    requestAnimationFrame(renderFrame);
  }
  requestAnimationFrame(renderFrame);

  // =========================================================================
  // 3. Cinematic Auto-Disassembly Intro on Website Open
  // Automatically deconstructs the 3D model upon landing, showcasing the layers!
  // =========================================================================
  function runAutoDisassembleIntro() {
    isAutoPlaying = true;
    autoPlayStartTime = performance.now();
    targetMotionIntensity = 1.0;
    lastActivityTime = Date.now();

    const statusText = document.getElementById('statusText');
    if (statusText) {
      statusText.textContent = 'AUTO-DECONSTRUCTING • ARCHIVAL 3D INTRO';
    }

    function stepIntro(now) {
      if (!isAutoPlaying) return;
      const elapsed = now - autoPlayStartTime;

      // Slower, cinema-grade luxury disassembly choreography:
      // 0 to 750ms: Hold assembled state so visitor sees pristine Samba OG
      // 750ms to 4250ms (3500ms duration): Slower, smooth floating deconstruction from 0.0 to 1.0
      // 4250ms to 7250ms (3000ms duration): Hold exploded view with callout cards glowing
      // 7250ms to 10450ms (3200ms duration): Silky luxury re-assembly back to 0.0
      if (elapsed < 750) {
        targetProgress = 0;
        targetMotionIntensity = 0.8;
      } else if (elapsed < 4250) {
        const t = (elapsed - 750) / 3500;
        // Luxury cosine S-curve: continuous, zero-jerk acceleration and deceleration
        const ease = 0.5 * (1 - Math.cos(Math.PI * t));
        targetProgress = ease;
        targetMotionIntensity = 1.0;
        lastActivityTime = Date.now();
        if (statusText) {
          statusText.textContent = `AUTO-DECONSTRUCTING • ${Math.round(ease * 100)}% 3D ARCHITECTURE`;
        }
      } else if (elapsed < 7250) {
        targetProgress = 1.0;
        targetMotionIntensity = 0.85;
        lastActivityTime = Date.now();
        if (statusText) {
          statusText.textContent = 'EXPLODED VIEW • UPPER, INSOLE & GUM CUPSOLE';
        }
      } else if (elapsed < 10450) {
        const t = (elapsed - 7250) / 3200;
        const ease = 0.5 * (1 - Math.cos(Math.PI * t));
        targetProgress = 1.0 - ease;
        targetMotionIntensity = 0.8;
        lastActivityTime = Date.now();
        if (statusText) {
          statusText.textContent = `REASSEMBLING • ${Math.round((1 - ease) * 100)}%`;
        }
      } else {
        // Finished intro
        targetProgress = 0;
        isAutoPlaying = false;
        if (statusText) {
          statusText.textContent = 'PINE GREEN ARCHIVE • TOUCH, DRAG OR SCROLL';
        }
        return;
      }

      requestAnimationFrame(stepIntro);
    }

    requestAnimationFrame(stepIntro);
  }

  function cancelAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      const statusText = document.getElementById('statusText');
      if (statusText) {
        statusText.textContent = 'PINE GREEN ARCHIVE • TOUCH, DRAG OR SCROLL';
      }
    }
  }

  // User action immediately takes over from auto-intro
  window.addEventListener('touchstart', cancelAutoPlay, { passive: true });
  window.addEventListener('pointerdown', cancelAutoPlay, { passive: true });
  window.addEventListener('wheel', cancelAutoPlay, { passive: true });

  // Replay Intro Button
  const replayIntroBtn = document.getElementById('replayIntroBtn');
  replayIntroBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    runAutoDisassembleIntro();
    showToast('Auto 3D Demo', 'Playing architectural deconstruction sequence');
  });

  // Launch Auto-Disassemble intro on page open (after brief 850ms initial reveal)
  setTimeout(runAutoDisassembleIntro, 850);

  // =========================================================================
  // 4. Mousemove Parallax & Motion Velocity Tracking
  // =========================================================================
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    if (spotlightCursor) {
      spotlightCursor.style.opacity = '1';
      spotlightCursor.style.left = `${e.clientX}px`;
      spotlightCursor.style.top = `${e.clientY}px`;
    }

    const mdx = e.clientX - lastMouseX;
    const mdy = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    const mSpeed = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mSpeed > 2.5) {
      targetMotionIntensity = Math.min(1, targetMotionIntensity + mSpeed * 0.04);
      lastActivityTime = Date.now();
    }

    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;

    // Ambient glow drift
    if (ambientEmerald && ambientGum) {
      ambientEmerald.style.transform = `translate(${normX * 28}px, ${normY * 20}px)`;
      ambientGum.style.transform = `translate(${-normX * 32}px, ${-normY * 24}px)`;
    }

    // Parallax targets
    targetRotX = -normY * 9;
    targetRotY = normX * 12;
    targetTransX = normX * 10;
  });

  // =========================================================================
  // 5. Navigation & Modal Drawer Mechanics
  // =========================================================================
  function closeAllViews() {
    bagCheckoutView?.classList.remove('active-view');
    materialsView?.classList.remove('active-view');
    craftView?.classList.remove('active-view');
    aboutView?.classList.remove('active-view');

    bagCheckoutView?.setAttribute('aria-hidden', 'true');
    materialsView?.setAttribute('aria-hidden', 'true');
    craftView?.setAttribute('aria-hidden', 'true');
    aboutView?.setAttribute('aria-hidden', 'true');
  }

  function openBagCheckout() {
    closeAllViews();
    if (bagCheckoutView) {
      bagCheckoutView.classList.add('active-view');
      bagCheckoutView.setAttribute('aria-hidden', 'false');
    }
  }

  // Shop Now and Bag Buttons
  shopNowBtn?.addEventListener('click', openBagCheckout);
  bagBtn?.addEventListener('click', openBagCheckout);

  // Quick Add to Bag button on hero bottom group
  const quickBagAddBtn = document.getElementById('quickBagAddBtn');
  quickBagAddBtn?.addEventListener('click', () => {
    cartCount++;
    if (bagCounter) bagCounter.textContent = cartCount;
    showToast('Added to Bag', `Adidas Samba OG • ${getColorTitle(activeColor)} • Size ${activeSize}`);
    setTimeout(() => {
      openBagCheckout();
    }, 600);
  });

  // Logo Pill -> Smooth scroll to top
  navLogoPill?.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllViews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navCatBtns.forEach(b => b.classList.remove('active'));
    document.getElementById('catShopBtn')?.classList.add('active');
  });

  // Ad and Category Nav Buttons (Home, Shop, Man, Woman, Kids, 3D View)
  navCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');

      if (cat === 'home' || cat === 'shop') {
        closeAllViews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Adidas Originals', cat === 'home' ? 'Welcome to Samba OG Flagship' : 'Browsing Samba OG Collection');
      } else if (cat === 'man' || cat === 'woman' || cat === 'kids') {
        closeAllViews();
        showToast(`Adidas ${cat.toUpperCase()}`, `Filtered all official Samba OG sizes for ${cat.toUpperCase()}`);
      } else if (cat === 'disassembly') {
        closeAllViews();
        runAutoDisassembleIntro();
        showToast('3D Disassembly', 'Playing Ultra-HD deconstructed architecture');
      } else if (cat === 'anatomy') {
        closeAllViews();
        materialsView?.classList.add('active-view');
        materialsView?.setAttribute('aria-hidden', 'false');
        showToast('Anatomy Dossier', 'Exploring leather, T-toe & gum cupsole engineering');
      } else if (cat === 'craft') {
        closeAllViews();
        craftView?.classList.add('active-view');
        craftView?.setAttribute('aria-hidden', 'false');
        showToast('Heritage & Craft', '1949 German terrace football legacy');
      }
    });
  });

  // Aux Dossier Modals
  navMaterialsBtn?.addEventListener('click', () => {
    closeAllViews();
    materialsView?.classList.add('active-view');
    materialsView?.setAttribute('aria-hidden', 'false');
  });

  navCraftBtn?.addEventListener('click', () => {
    closeAllViews();
    craftView?.classList.add('active-view');
    craftView?.setAttribute('aria-hidden', 'false');
  });

  navAboutBtn?.addEventListener('click', () => {
    closeAllViews();
    aboutView?.classList.add('active-view');
    aboutView?.setAttribute('aria-hidden', 'false');
  });

  // Close Buttons
  closeBagBtn?.addEventListener('click', closeAllViews);
  closeMaterialsBtn?.addEventListener('click', closeAllViews);
  closeCraftBtn?.addEventListener('click', closeAllViews);
  closeAboutBtn?.addEventListener('click', closeAllViews);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllViews();
  });

  // =========================================================================
  // 4. Colorway Selection (Synchronized across Hero & Studio)
  // =========================================================================
  function getColorTitle(colorKey) {
    switch (colorKey) {
      case 'cloud': return 'Cloud White / Core Black';
      case 'core': return 'Core Black / Cloud White';
      default: return 'Cloud White / Core Black';
    }
  }

  function selectColorway(colorKey) {
    activeColor = colorKey;

    // Update Hero shoe canvas with clean photo
    if (isolatedShoeAssets[activeColor]) {
      const colorImg = new Image();
      colorImg.src = isolatedShoeAssets[activeColor];
      colorImg.onload = () => {
        if (canvasCtx && disassembleCanvas) {
          canvasCtx.clearRect(0, 0, disassembleCanvas.width, disassembleCanvas.height);
          canvasCtx.drawImage(colorImg, 0, 0, disassembleCanvas.width, disassembleCanvas.height);
        }
      };
    }

    // Update Bag thumbnail
    if (bagItemImg && lifestyleAssets[activeColor]) {
      bagItemImg.src = lifestyleAssets[activeColor];
    }

    // Update color cards
    const allCards = document.querySelectorAll('.color-photo-card, .vertical-swatch-btn, .swatch-btn');
    allCards.forEach(card => {
      if (card.getAttribute('data-color') === activeColor) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Reveal Step 2: Sizes and Price
    const selectionDetailsFlow = document.getElementById('selectionDetailsFlow');
    if (selectionDetailsFlow) {
      selectionDetailsFlow.classList.add('active');
      selectionDetailsFlow.classList.remove('hidden-step');
    }

    // Ambient lighting adaptation
    if (ambientEmerald) {
      if (activeColor === 'cloud') {
        ambientEmerald.style.background = 'radial-gradient(circle, rgba(220, 225, 235, 0.45) 0%, transparent 70%)';
      } else if (activeColor === 'core') {
        ambientEmerald.style.background = 'radial-gradient(circle, rgba(30, 30, 35, 0.38) 0%, transparent 70%)';
      }
    }

    updateBagMeta();
    showToast('Color Selected', `${getColorTitle(activeColor)} Edition`);
  }

  // Initial draw of uploaded shoe
  selectColorway('cloud');

  // Color card click listeners
  const colorCards = document.querySelectorAll('.color-photo-card, .vertical-swatch-btn, .swatch-btn');
  colorCards.forEach(card => {
    card.addEventListener('click', () => {
      const color = card.getAttribute('data-color') || 'cloud';
      selectColorway(color);
      
      // Smoothly scroll slightly to reveal sizes on mobile/small screens if needed
      const flow = document.getElementById('selectionDetailsFlow');
      if (flow && !flow.classList.contains('active')) {
        flow.classList.add('active');
      }
    });
  });

  // Size Selector Pills
  const sizeButtons = document.querySelectorAll('.size-pill');
  sizeButtons.forEach(pill => {
    pill.addEventListener('click', () => {
      sizeButtons.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeSize = pill.getAttribute('data-size') || pill.textContent.trim();
      updateBagMeta();
      showToast('Size Selected', `Adidas Samba OG • ${activeSize} • ₹10,999`);
    });
  });

  function updateBagMeta() {
    const colorLabel = getColorTitle(activeColor);
    if (bagItemMeta) {
      bagItemMeta.textContent = `Colorway: ${colorLabel} • Size: ${activeSize}`;
    }
  }

  // Payment Tabs
  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetMethod = tab.getAttribute('data-tab');
      paymentPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel${targetMethod.charAt(0).toUpperCase() + targetMethod.slice(1)}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Order Confirmation
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName')?.value.trim();
      const phone = document.getElementById('phoneNumber')?.value.trim();
      const street = document.getElementById('streetAddress')?.value.trim();

      if (!fullName || !phone || !street) {
        alert('Please fill out your full delivery address and mobile number to proceed.');
        return;
      }

      confirmOrderBtn.innerHTML = `
        <span class="btn-text">Order Confirmed! Dispatching to ${fullName}</span>
      `;
      confirmOrderBtn.style.background = '#1A7F48';

      setTimeout(() => {
        showToast('Order Placed with MARUTI SHOOES!', `Confirmation SMS sent to ${phone}`);
        setTimeout(() => {
          closeAllViews();
          confirmOrderBtn.innerHTML = `<span class="btn-text">Confirm Order &amp; Pay ₹10,999</span><span class="btn-specular"></span>`;
          confirmOrderBtn.style.background = '';
        }, 2200);
      }, 1000);
    });
  }

  // Dynamic Toast Helper
  function showToast(title, desc) {
    if (toastTitle && toastDesc && dynamicToast) {
      toastTitle.textContent = title;
      toastDesc.textContent = desc;
      dynamicToast.classList.add('visible');
      setTimeout(() => {
        dynamicToast.classList.remove('visible');
      }, 3000);
    }
  }
});
