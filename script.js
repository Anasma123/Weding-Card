/* ========================================================
   ROYAL NIKKAH 3D FLY-THROUGH - ULTRA SMOOTH 60FPS ENGINE
   Thasleena Nasrin & Muhammed Murshid
   ======================================================== */

// Global reference for instant onclick triggers
window.openWeddingCard = null;

document.addEventListener('DOMContentLoaded', () => {
  // Target Wedding Date: September 20, 2026 at 11:30 AM IST (UTC+5:30)
  const weddingDate = new Date('2026-09-20T11:30:00+05:30').getTime();

  /* ========================================================
     1. HIGH CONTRAST REMAINING DAYS COUNTDOWN (FAIL-SAFE & INSTANT)
     ======================================================== */
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMinutes = document.getElementById('count-minutes');
  const countSeconds = document.getElementById('count-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
      if (countDays) countDays.textContent = '00';
      if (countHours) countHours.textContent = '00';
      if (countMinutes) countMinutes.textContent = '00';
      if (countSeconds) countSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (countDays) countDays.textContent = String(days).padStart(2, '0');
    if (countHours) countHours.textContent = String(hours).padStart(2, '0');
    if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, '0');
    if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ========================================================
     2. TRUE 8D ROTATING SPATIAL AUDIO SYSTEM
     ======================================================== */
  class True8DSpatialAudio {
    constructor() {
      this.ctx = null;
      this.panner = null;
      this.filter = null;
      this.masterGain = null;
      this.isPlaying = false;
      this.angle = 0;
      this.step = 0;
      this.loopTimer = null;

      // Oriental Maqam frequency scale (Plucked oud/harp sound)
      this.melody = [
        329.63, 369.99, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25,
        493.88, 440.00, 392.00, 369.99, 329.63
      ];
      this.chords = [
        [164.81, 246.94, 329.63], // E minor
        [196.00, 246.94, 293.66], // G
        [220.00, 261.63, 329.63], // A
        [164.81, 246.94, 329.63]  // E home
      ];
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();

        if (this.ctx.createStereoPanner) {
          this.panner = this.ctx.createStereoPanner();
        }

        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(3400, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

        if (this.panner) {
          this.masterGain.connect(this.filter);
          this.filter.connect(this.panner);
          this.panner.connect(this.ctx.destination);
        } else {
          this.masterGain.connect(this.filter);
          this.filter.connect(this.ctx.destination);
        }
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    startSpatialRotation() {
      const rotate = () => {
        if (!this.isPlaying || !this.ctx) return;
        this.angle += 0.032;

        const pan = Math.sin(this.angle);
        const depth = (Math.cos(this.angle) + 1) / 2;

        if (this.panner) {
          this.panner.pan.setValueAtTime(pan, this.ctx.currentTime);
        }
        if (this.filter) {
          this.filter.frequency.setValueAtTime(1800 + depth * 2400, this.ctx.currentTime);
        }

        requestAnimationFrame(rotate);
      };
      rotate();
    }

    updateScrollProgress(progress) {
      if (this.filter && this.ctx) {
        this.filter.frequency.setValueAtTime(2200 + progress * 1000, this.ctx.currentTime);
      }
    }

    playNote(freq, time, duration = 1.8, type = 'sine') {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.2, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    }

    playDuff(time) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, time);
      osc.frequency.exponentialRampToValueAtTime(36, time + 0.28);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.3);
    }

    playChime(freq = 523.25) {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [freq, freq * 1.25, freq * 1.5].forEach((f, i) => {
        this.playNote(f, now + i * 0.08, 1.8, 'sine');
      });
    }

    start() {
      this.init();
      if (this.isPlaying) return;
      this.isPlaying = true;

      this.startSpatialRotation();

      const loop = () => {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;

        const note = this.melody[this.step % this.melody.length];
        this.playNote(note, now, 2.0, 'sine');

        if (this.step % 4 === 0) {
          this.playNote(note * 1.5, now + 0.15, 1.2, 'triangle');
        }

        if (this.step % 2 === 0) {
          this.playDuff(now);
        }

        if (this.step % 8 === 0) {
          const chord = this.chords[Math.floor((this.step / 8) % this.chords.length)];
          chord.forEach(f => this.playNote(f, now, 4.0, 'sine'));
        }

        this.step++;
        this.loopTimer = setTimeout(loop, 860);
      };

      loop();
      updateAudioUI(true);
    }

    stop() {
      this.isPlaying = false;
      if (this.loopTimer) clearTimeout(this.loopTimer);
      updateAudioUI(false);
    }

    toggle() {
      if (this.isPlaying) this.stop();
      else this.start();
    }
  }

  const audio8D = new True8DSpatialAudio();
  const hudAudio = document.getElementById('hud-audio-8d');
  const audioIcon = document.getElementById('audio-icon');

  function updateAudioUI(playing) {
    if (!hudAudio) return;
    if (playing) {
      hudAudio.classList.add('playing');
      if (audioIcon) audioIcon.className = 'fa-solid fa-volume-high';
    } else {
      hudAudio.classList.remove('playing');
      if (audioIcon) audioIcon.className = 'fa-solid fa-volume-xmark';
    }
  }

  if (hudAudio) {
    hudAudio.addEventListener('click', () => {
      audio8D.toggle();
    });
  }

  /* ========================================================
     3. 3D WEDDING CARD OPENING & REALISTIC UNBOXING SEQUENCE
     (Failsafe & Top Priority)
     ======================================================== */
  const card3D = document.getElementById('wedding-card-3d');
  const cardOverlay = document.getElementById('card-unfold-overlay');
  const btnOpenCard = document.getElementById('btn-open-card');
  const cardWaxSeal = document.getElementById('card-wax-seal');

  if (card3D && cardOverlay) {
    // Realistic 3D Tilt with smooth perspective
    cardOverlay.addEventListener('mousemove', (e) => {
      if (card3D.classList.contains('card-opening')) return;
      const rect = card3D.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const rotateY = Math.max(-16, Math.min(16, dx * 16));
      const rotateX = Math.max(-16, Math.min(16, -dy * 16));
      card3D.style.transform = `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    cardOverlay.addEventListener('mouseleave', () => {
      if (card3D.classList.contains('card-opening')) return;
      card3D.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });

    // Touch support for mobile devices
    cardOverlay.addEventListener('touchmove', (e) => {
      if (card3D.classList.contains('card-opening') || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = card3D.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (touch.clientX - cx) / (rect.width / 2);
      const dy = (touch.clientY - cy) / (rect.height / 2);
      card3D.style.transform = `perspective(1200px) rotateY(${(dx * 12).toFixed(2)}deg) rotateX(${(-dy * 12).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }, { passive: true });
  }

  let isCardOpened = false;
  let isDivingIn = false;
  let autoDiveTimeout = null;
  let countdownInterval = null;

  function proceedInsideVenue(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isDivingIn) return;
    isDivingIn = true;
    if (autoDiveTimeout) clearTimeout(autoDiveTimeout);
    if (countdownInterval) clearInterval(countdownInterval);

    if (card3D) card3D.classList.add('card-diving-in');

    setTimeout(() => {
      document.body.classList.remove('card-closed');
      if (cardOverlay) cardOverlay.classList.add('opened');
      window.scrollTo({ top: 0, behavior: 'instant' });
      currentScroll = 0;
      targetScroll = 0;
    }, 950);
  }

  function openWeddingCard(e) {
    if (isCardOpened) {
      proceedInsideVenue(e);
      return;
    }
    isCardOpened = true;

    // 1. Play holy chime & start 8D spatial melody
    try {
      if (audio8D) {
        audio8D.playChime(659.25);
        audio8D.start();
      }
    } catch (err) {
      console.warn('Audio playback waiting for user gesture:', err);
    }

    // 2. Burst golden confetti particles
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F5CE62', '#FFE89E', '#DE4E71', '#FFFFFF']
      });
    }

    if (cardOverlay) cardOverlay.classList.add('opening');
    if (card3D) {
      card3D.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      card3D.classList.add('card-opening');
    }

    // 3. 10 Full Seconds Reading Time as Requested by User
    let remainingSecs = 10;
    const hintEl = document.getElementById('card-countdown-hint');
    if (hintEl) hintEl.textContent = `Entering in 10s... or click to begin now`;

    countdownInterval = setInterval(() => {
      remainingSecs--;
      if (remainingSecs > 0 && hintEl) {
        hintEl.textContent = `Entering in ${remainingSecs}s... or click to begin now`;
      } else {
        if (countdownInterval) clearInterval(countdownInterval);
      }
    }, 1000);

    autoDiveTimeout = setTimeout(() => {
      if (countdownInterval) clearInterval(countdownInterval);
      proceedInsideVenue();
    }, 10000);
  }

  // Bind to global for inline onclick fallback
  window.openWeddingCard = openWeddingCard;
  window.proceedInsideVenue = proceedInsideVenue;

  if (btnOpenCard) btnOpenCard.addEventListener('click', openWeddingCard);
  if (cardWaxSeal) cardWaxSeal.addEventListener('click', openWeddingCard);
  if (card3D) {
    card3D.addEventListener('click', (e) => {
      if (isCardOpened) {
        proceedInsideVenue(e);
      } else {
        openWeddingCard(e);
      }
    });
  }

  /* ========================================================
     4. 60FPS BUTTERY-SMOOTH 3D PERSPECTIVE FLIGHT PARTICLES
     (Rose Petals & Golden Stardust)
     ======================================================== */
  const canvas = document.getElementById('flight-particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FlightParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.5;
      this.z = initial ? Math.random() * 800 + 100 : 900;
      this.type = Math.random() < 0.6 ? 'dust' : 'petal';
      this.speedZ = Math.random() * 2.5 + 1.2;
      this.angle = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;

      if (this.type === 'petal') {
        const colors = ['#e62b53', '#cf1942', '#f85777', '#ffa4b6', '#d4af37'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 12 + 10;
      } else {
        const golds = ['#ffd700', '#f6d365', '#fff3c4', '#d4af37'];
        this.color = golds[Math.floor(Math.random() * golds.length)];
        this.size = Math.random() * 2.5 + 1.5;
      }
    }

    update(flightSpeed = 1) {
      this.z -= this.speedZ * flightSpeed;
      this.angle += this.rotSpeed;

      if (this.z <= 20) {
        this.reset();
      }
    }

    draw() {
      const fov = 350;
      const scale = fov / (fov + this.z);
      const projX = width / 2 + this.x * scale;
      const projY = height / 2 + this.y * scale;

      if (projX < -30 || projX > width + 30 || projY < -30 || projY > height + 30) {
        return;
      }

      ctx.save();
      ctx.translate(projX, projY);
      ctx.rotate(this.angle);
      ctx.globalAlpha = Math.min(1, (900 - this.z) / 400) * 0.85;

      if (this.type === 'petal') {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const s = this.size * scale;
        if (window.innerWidth < 768) {
          ctx.ellipse(0, 0, s * 0.5, s * 0.9, 0, 0, Math.PI * 2);
        } else {
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-s * 0.7, -s * 0.7, -s * 0.9, s * 0.9, 0, s * 1.2);
          ctx.bezierCurveTo(s * 0.9, s * 0.9, s * 0.7, -s * 0.7, 0, 0);
        }
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * scale * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particleCount = window.innerWidth < 768 ? 20 : 60;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new FlightParticle());
  }

  /* ========================================================
     5. REVOLUTIONARY 3D FLY-THROUGH SCROLL & CAMERA ENGINE
     (Mosque Colonnade -> Destiny -> Couple -> Paradise)
     ======================================================== */
  const realmMosque = document.getElementById('realm-mosque');
  const realmCorridor = document.getElementById('realm-corridor');
  const realmParadise = document.getElementById('realm-paradise');
  const celestialRays = document.getElementById('celestial-rays');
  const portalScene = document.getElementById('portal-scene');

  const hudStageNum = document.getElementById('hud-stage-num');
  const hudStageText = document.getElementById('hud-stage-text');
  const chambers = Array.from(document.querySelectorAll('.tunnel-chamber'));
  const portals = Array.from(document.querySelectorAll('.arch-portal'));
  const chDots = Array.from(document.querySelectorAll('.ch-dot'));
  const prevBtn = document.getElementById('nav-prev-btn');
  const nextBtn = document.getElementById('nav-next-btn');

  const Z_SPACING = 2000; // Spacing in 3D pixels between each chamber
  const TOTAL_STAGES = 7;
  const TOTAL_DEPTH = (TOTAL_STAGES - 1) * Z_SPACING; // 12,000px

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let scrollVelocity = 0;
  let activeChamberIndex = 0;

  // Native hardware-accelerated scroll listener
  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  function updateChamberNavigator(index) {
    if (index === activeChamberIndex) return;
    activeChamberIndex = index;
    chDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    const activeChamber = chambers[index];
    if (activeChamber) {
      const stage = activeChamber.getAttribute('data-stage');
      const title = activeChamber.getAttribute('data-title');
      if (hudStageNum) hudStageNum.textContent = `STAGE ${stage}`;
      if (hudStageText) hudStageText.textContent = title;
    }
  }

  function goToChamber(index) {
    const clamped = Math.max(0, Math.min(TOTAL_STAGES - 1, index));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (clamped / (TOTAL_STAGES - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  chDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToChamber(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToChamber(activeChamberIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToChamber(activeChamberIndex + 1));
  }

  // Unified 60/120fps High-Performance Animation Loop
  function mainEngineLoop() {
    // 1. Smooth Camera Damping (Faster lerp on mobile for immediate tactile feel)
    const isMobile = window.innerWidth < 768;
    const lerpFactor = isMobile ? 0.18 : 0.088;
    const scrollDiff = targetScroll - currentScroll;
    if (Math.abs(scrollDiff) < 0.25) {
      currentScroll = targetScroll;
    } else {
      currentScroll += scrollDiff * lerpFactor;
    }
    scrollVelocity = scrollDiff;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;
    const cameraZ = progress * TOTAL_DEPTH;

    // 2. Render 3D Particles
    ctx.clearRect(0, 0, width, height);
    const particleSpeed = Math.min(1 + Math.abs(scrollVelocity) * 0.06, 6);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(particleSpeed);
      particles[i].draw();
    }

    // 3. 3D Architectural Portals (Desktop only to prevent mobile GPU VRAM exhaustion)
    if (!isMobile) {
      portals.forEach((arch, k) => {
        const archZ = -(k * Z_SPACING + Z_SPACING * 0.5);
        const relArchZ = archZ + cameraZ;

        if (relArchZ < -2800 || relArchZ > 600) {
          if (arch.style.visibility !== 'hidden') {
            arch.style.visibility = 'hidden';
          }
        } else {
          if (arch.style.visibility !== 'visible') {
            arch.style.visibility = 'visible';
          }
          let archOpacity = 1;
          let archScale = 1;

          if (relArchZ < -1400) {
            archOpacity = Math.max(0, (relArchZ + 2800) / 1400);
            archScale = 0.8 + (relArchZ + 2800) / 2800 * 0.2;
          } else if (relArchZ <= 50) {
            archOpacity = 1;
            archScale = 1;
          } else {
            // Zooms past the user into the screen edges
            archOpacity = Math.max(0, 1 - (relArchZ - 50) / 500);
            archScale = 1 + (relArchZ - 50) * 0.0022;
          }

          arch.style.transform = `translate3d(-50%, -50%, ${relArchZ.toFixed(1)}px) scale(${archScale.toFixed(3)})`;
          arch.style.opacity = archOpacity.toFixed(3);
        }
      });
    }

    // 4. 3D Chambers Movement (Flying forward through each chamber using visibility)
    chambers.forEach((ch, idx) => {
      const chZ = -idx * Z_SPACING;
      const relZ = chZ + cameraZ;

      if (relZ < -2600 || relZ > 550) {
        if (ch.style.visibility !== 'hidden') {
          ch.style.visibility = 'hidden';
          ch.style.pointerEvents = 'none';
        }
      } else {
        if (ch.style.visibility !== 'visible') {
          ch.style.visibility = 'visible';
        }
        let chOpacity = 1;
        let chScale = 1;

        if (relZ < -1300) {
          chOpacity = Math.max(0, (relZ + 2600) / 1300);
          chScale = 0.88 + (relZ + 2600) / 2600 * 0.12;
        } else if (relZ <= 40) {
          chOpacity = 1;
          chScale = 1;
        } else {
          chOpacity = Math.max(0, 1 - (relZ - 40) / 450);
          chScale = 1 + (relZ - 40) * 0.0018;
        }

        if (Math.abs(relZ) < 320 && chOpacity > 0.8) {
          ch.style.pointerEvents = 'auto';
        } else {
          ch.style.pointerEvents = 'none';
        }

        ch.style.transform = `translate3d(-50%, -50%, ${relZ.toFixed(1)}px) scale(${chScale.toFixed(3)})`;
        ch.style.opacity = chOpacity.toFixed(3);
      }
    });

    // 5. Active Chamber Tracking for HUD & Nav
    const nearestIdx = Math.min(TOTAL_STAGES - 1, Math.max(0, Math.round(progress * (TOTAL_STAGES - 1))));
    updateChamberNavigator(nearestIdx);

    // 6. Background Scene Zoom & Realistic Architectural Crossfades
    if (portalScene) {
      portalScene.style.transform = `scale(${1 + progress * 0.16}) translate3d(0, ${-progress * 25}px, 0)`;
    }

    if (progress < 0.20) {
      if (realmMosque) realmMosque.style.opacity = `${Math.max(0, 1 - progress * 3)}`;
      if (realmCorridor) realmCorridor.style.opacity = `${Math.min(1, progress * 4.5)}`;
      if (realmParadise) realmParadise.style.opacity = '0';
      if (celestialRays) celestialRays.style.opacity = '0.2';
    } else if (progress < 0.65) {
      if (realmMosque) realmMosque.style.opacity = '0';
      if (realmCorridor) realmCorridor.style.opacity = '1';
      if (realmParadise) realmParadise.style.opacity = '0';
      if (celestialRays) celestialRays.style.opacity = '0.35';
    } else if (progress < 0.84) {
      const t = (progress - 0.65) / 0.19;
      if (realmMosque) realmMosque.style.opacity = '0';
      if (realmCorridor) realmCorridor.style.opacity = `${Math.max(0, 1 - t)}`;
      if (realmParadise) realmParadise.style.opacity = `${Math.min(1, t * 1.2)}`;
      if (celestialRays) celestialRays.style.opacity = `${0.35 + t * 0.55}`;
    } else {
      if (realmMosque) realmMosque.style.opacity = '0';
      if (realmCorridor) realmCorridor.style.opacity = '0';
      if (realmParadise) realmParadise.style.opacity = '1'; // Radiant Swargam
      if (celestialRays) celestialRays.style.opacity = '0.98';
    }

    if (audio8D) {
      audio8D.updateScrollProgress(progress);
    }

    requestAnimationFrame(mainEngineLoop);
  }

  mainEngineLoop();

  /* ========================================================
     6. VENUE ADDRESS COPY
     ======================================================== */
  const copyAddressBtn = document.getElementById('copy-address-action');
  const copiedToast = document.getElementById('copied-toast');

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = 'Aluvanpilakkal Juma Masjid, Poovattuparamba, Kozhikode, Kerala 673008';
      navigator.clipboard.writeText(address).then(() => {
        if (copiedToast) {
          copiedToast.style.display = 'block';
          setTimeout(() => { copiedToast.style.display = 'none'; }, 3000);
        }
      }).catch(() => {
        alert('Venue: ' + address);
      });
    });
  }

  /* ========================================================
     7. CELESTIAL PETAL SHOWER
     ======================================================== */
  const showerBtn = document.getElementById('shower-petals-action');
  if (showerBtn) {
    showerBtn.addEventListener('click', () => {
      if (audio8D) audio8D.playChime(659.25);
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#DE4E71', '#FFE89E', '#FFFFFF', '#FFA4B6']
        });
      }
    });
  }

  /* ========================================================
     8. CALENDAR INTEGRATION
     ======================================================== */
  const googleCalBtn = document.getElementById('google-calendar-trigger');
  const icalCalBtn = document.getElementById('ical-calendar-trigger');

  const eventData = {
    title: 'Nikkah: Thasleena Nasrin & Muhammed Murshid',
    description: 'Mr. Sadik Muneer & Mrs. Nadiya cordially invite you to celebrate the blessed Nikkah ceremony of their beloved daughter Thasleena Nasrin with Muhammed Murshid at Aluvanpilakkal Juma Masjid, Poovattuparamba.',
    location: 'Aluvanpilakkal Juma Masjid, Poovattuparamba, Kerala (https://maps.app.goo.gl/YUZmXMJmNQcPK9TXA?g_st=ac)',
    start: '20260920T060000Z', // 11:30 AM IST
    end: '20260920T100000Z'
  };

  if (googleCalBtn) {
    googleCalBtn.addEventListener('click', () => {
      const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.start}/${eventData.end}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
      window.open(gcal, '_blank');
    });
  }

  if (icalCalBtn) {
    icalCalBtn.addEventListener('click', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Royal Islamic Nikkah Invitation//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${eventData.title}`,
        `DESCRIPTION:${eventData.description}`,
        `LOCATION:${eventData.location}`,
        `DTSTART:${eventData.start}`,
        `DTEND:${eventData.end}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Thasleena_Murshid_Nikkah_2026.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /* ========================================================
     9. PRINT / SAVE INVITATION & SCROLL TOP
     ======================================================== */
  const printBtn = document.getElementById('print-invitation-action');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      goToChamber(0);
    });
  }
});
