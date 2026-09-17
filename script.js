/* ========================================================
   ROYAL NIKKAH 3D FLY-THROUGH - ULTRA SMOOTH 60FPS ENGINE
   Thasleena Nasrin & Muhammed Murshid
   ======================================================== */

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

  // Execute immediately so numbers appear without 1ms delay
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ========================================================
     2. 60FPS BUTTERY-SMOOTH 3D PERSPECTIVE FLIGHT PARTICLES
     (Rose Petals & Golden Stardust with Zero GPU lag)
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
      // 3D Perspective Projection formula
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
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 0.7, -s * 0.7, -s * 0.9, s * 0.9, 0, s * 1.2);
        ctx.bezierCurveTo(s * 0.9, s * 0.9, s * 0.7, -s * 0.7, 0, 0);
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

  // Pre-allocate particle pool (optimal for 60/120fps)
  const particleCount = window.innerWidth < 640 ? 40 : 80;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new FlightParticle());
  }

  let lastScrollY = window.scrollY;
  let scrollDelta = 0;

  function renderFlightLoop() {
    ctx.clearRect(0, 0, width, height);

    // Calculate flight speed based on scroll movement
    const currentScrollY = window.scrollY;
    scrollDelta = Math.abs(currentScrollY - lastScrollY) * 0.08;
    lastScrollY = currentScrollY;

    const currentFlightSpeed = Math.min(1 + scrollDelta, 6);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(currentFlightSpeed);
      particles[i].draw();
    }

    requestAnimationFrame(renderFlightLoop);
  }
  renderFlightLoop();

  /* ========================================================
     3. CINEMATIC REALM TRANSITIONS (MOSQUE -> CORRIDOR -> PARADISE)
     ======================================================== */
  const realmMosque = document.getElementById('realm-mosque');
  const realmCorridor = document.getElementById('realm-corridor');
  const realmParadise = document.getElementById('realm-paradise');
  const celestialRays = document.getElementById('celestial-rays');

  const hudStageNum = document.getElementById('hud-stage-num');
  const hudStageText = document.getElementById('hud-stage-text');
  const chambers = document.querySelectorAll('.portal-chamber');

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScenicTransitions();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateScenicTransitions() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Detect active stage for HUD
    const triggerY = scrollY + window.innerHeight * 0.4;
    chambers.forEach(ch => {
      const top = ch.offsetTop;
      const h = ch.offsetHeight;
      if (triggerY >= top && triggerY < top + h) {
        const stage = ch.getAttribute('data-stage');
        const title = ch.getAttribute('data-title');
        if (hudStageNum) hudStageNum.textContent = `STAGE ${stage}`;
        if (hudStageText) hudStageText.textContent = title;
      }
    });

    // Scenic Crossfades:
    // 0.0 - 0.25: Real Kerala Mosque Exterior
    // 0.25 - 0.70: Grand Mosque Colonnade Corridor
    // 0.70 - 1.00: Swargam (Celestial Paradise)
    if (progress < 0.25) {
      realmMosque.style.opacity = '1';
      realmCorridor.style.opacity = '0';
      realmParadise.style.opacity = '0';
      celestialRays.style.opacity = '0.2';
    } else if (progress < 0.70) {
      const t = (progress - 0.25) / 0.45;
      realmMosque.style.opacity = `${Math.max(0, 1 - t * 2)}`;
      realmCorridor.style.opacity = '1';
      realmParadise.style.opacity = `${Math.max(0, (t - 0.5) * 2)}`;
      celestialRays.style.opacity = `${0.3 + t * 0.4}`;
    } else {
      realmMosque.style.opacity = '0';
      realmCorridor.style.opacity = '0';
      realmParadise.style.opacity = '1'; // Climax in Swargam
      celestialRays.style.opacity = '0.95';
    }

    if (audio8D) {
      audio8D.updateScrollProgress(progress);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ========================================================
     4. TRUE 8D ROTATING SPATIAL AUDIO SYSTEM
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
    if (playing) {
      hudAudio.classList.add('playing');
      audioIcon.className = 'fa-solid fa-volume-high';
    } else {
      hudAudio.classList.remove('playing');
      audioIcon.className = 'fa-solid fa-volume-xmark';
    }
  }

  if (hudAudio) {
    hudAudio.addEventListener('click', () => {
      audio8D.toggle();
    });
  }

  // Auto-play softly on first touch/click
  const firstTouchHandler = () => {
    audio8D.start();
    window.removeEventListener('click', firstTouchHandler);
    window.removeEventListener('touchstart', firstTouchHandler);
  };
  window.addEventListener('click', firstTouchHandler);
  window.addEventListener('touchstart', firstTouchHandler);

  /* ========================================================
     5. VENUE ADDRESS COPY
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
     6. CELESTIAL PETAL SHOWER
     ======================================================== */
  const showerBtn = document.getElementById('shower-petals-action');
  if (showerBtn) {
    showerBtn.addEventListener('click', () => {
      audio8D.playChime(659.25);
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
     7. CALENDAR INTEGRATION
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
     8. PRINT / SAVE INVITATION & SCROLL TOP
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
