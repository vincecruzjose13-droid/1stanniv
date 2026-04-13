/* ============================================
   ANNIVERSARY WEBSITE — script.js
   Password: 04142025
   Anniversary: April 14, 2026
   ============================================ */

// ============================================
// PASSWORD
// ============================================
const SPECIAL_DATE = "04142025";

function checkPassword() {
  const input = document.getElementById("password-input").value.trim();
  if (input === SPECIAL_DATE) {
    const screen = document.getElementById("password-screen");
    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = "0";
    setTimeout(() => {
      screen.style.display = "none";
      document.getElementById("main-site").style.display = "block";
      initSite();
    }, 800);
  } else {
    const err = document.getElementById("password-error");
    err.textContent = "Hmm, that's not right 💕 Try again!";
    document.getElementById("password-input").style.borderColor = "var(--deeprose)";
    setTimeout(() => {
      err.textContent = "";
      document.getElementById("password-input").style.borderColor = "";
    }, 2500);
  }
}

document.getElementById("password-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkPassword();
});

createFloatingHearts("pw-hearts", 15, true);

// ============================================
// SITE INIT
// ============================================
function initSite() {
  initCountdown();
  initScrollReveal();
  initNavDots();
  createFloatingHearts("hero-hearts", 12, false);
  createFinalPetals();
}

// ============================================
// COUNTDOWN — together since April 14, 2025
// ============================================
const START_DATE = new Date("2025-04-14T00:00:00");

function initCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;
  function update() {
    const now = new Date();
    const ms  = now - START_DATE;
    if (ms < 0) { el.innerHTML = "❤️ Our story begins April 14, 2025"; return; }
    const totalDays = Math.floor(ms / (1000*60*60*24));
    const hrs  = Math.floor((ms / (1000*60*60)) % 24);
    const mins = Math.floor((ms / (1000*60)) % 60);
    const secs = Math.floor((ms / 1000) % 60);
    el.innerHTML = `❤️ Together for <strong>${totalDays}</strong> days, <strong>${hrs}</strong>h <strong>${mins}</strong>m <strong>${secs}</strong>s`;
  }
  update();
  setInterval(update, 1000);
}

// ============================================
// MUSIC — simple HTML audio element
// ============================================
let musicOn = false;

function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn   = document.getElementById("music-toggle");

  if (!musicOn) {
    music.play().then(() => {
      musicOn = true;
      btn.classList.add("playing");
      btn.textContent = "🎶";
      btn.title = "Pause music";
    }).catch(() => {
      btn.textContent = "🎵";
    });
  } else {
    music.pause();
    musicOn = false;
    btn.classList.remove("playing");
    btn.textContent = "🎵";
    btn.title = "Play music";
  }
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("visible"), 80 * delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.dataset.delay = i % 4;
    observer.observe(el);
  });
}

// ============================================
// NAV DOTS
// ============================================
function initNavDots() {
  const sections = document.querySelectorAll("section[id]");
  const dots     = document.querySelectorAll(".dot");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove("active"));
        const active = document.querySelector(`.dot[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function openLightbox(el) {
  const img  = el.querySelector("img");
  const cap  = el.querySelector(".gallery-caption");
  const lb   = document.getElementById("lightbox");
  if (img && img.src && !img.src.endsWith('/')) {
    document.getElementById("lightbox-img").src = img.src;
  }
  if (cap) document.getElementById("lightbox-caption").textContent = cap.textContent;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================
// SURPRISE
// ============================================
function triggerSurprise() {
  const overlay = document.getElementById("surprise-overlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  createSurpriseHearts();
}

function closeSurprise() {
  document.getElementById("surprise-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeLightbox(); closeSurprise(); }
});

// ============================================
// FLOATING HEARTS
// ============================================
function createFloatingHearts(containerId, count, loop) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const emojis = ["❤️","💕","💖","💗","🌸","💝","✨"];

  function spawn() {
    const h = document.createElement("div");
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = 14 + Math.random() * 20;
    const left = Math.random() * 100;
    const dur  = 5 + Math.random() * 7;
    const dx   = (Math.random() - 0.5) * 150;
    h.style.cssText = `position:absolute;bottom:-40px;left:${left}%;font-size:${size}px;--dx:${dx}px;animation:floatHeart ${dur}s ease-in forwards;pointer-events:none;`;
    container.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }

  for (let i = 0; i < count; i++) setTimeout(spawn, Math.random() * 3000);
  if (loop) setInterval(() => { if (Math.random() > 0.5) spawn(); }, 1200);
}

function createSurpriseHearts() {
  const container = document.getElementById("surprise-hearts");
  container.innerHTML = "";
  const emojis = ["❤️","💕","💖","💗","💝","🌸","✨"];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size = 18 + Math.random() * 28;
      const left = Math.random() * 100;
      const dur  = 4 + Math.random() * 5;
      const dx   = (Math.random() - 0.5) * 200;
      h.style.cssText = `position:absolute;bottom:-20px;left:${left}%;font-size:${size}px;--dx:${dx}px;animation:floatHeart ${dur}s ease-in forwards;pointer-events:none;`;
      container.appendChild(h);
      h.addEventListener("animationend", () => h.remove());
    }, i * 80);
  }
}

function createFinalPetals() {
  const container = document.getElementById("final-petals");
  const section   = document.getElementById("final");
  if (!container || !section) return;
  const petals = ["🌸","🌺","🌷","🌹","💮"];
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const p = document.createElement("div");
          p.textContent = petals[Math.floor(Math.random() * petals.length)];
          const size = 16 + Math.random() * 20;
          const left = Math.random() * 100;
          const dur  = 6 + Math.random() * 5;
          const dx   = (Math.random() - 0.5) * 120;
          p.style.cssText = `position:absolute;top:-40px;left:${left}%;font-size:${size}px;--dx:${dx}px;animation:floatHeart ${dur}s ease-in forwards;pointer-events:none;`;
          container.appendChild(p);
          p.addEventListener("animationend", () => p.remove());
        }, i * 300);
      }
    }
  }, { threshold: 0.3 });
  observer.observe(section);
}

// Scroll hearts
let scrollThrottle = false;
window.addEventListener("scroll", () => {
  if (!scrollThrottle && Math.random() > 0.7) {
    scrollThrottle = true;
    const h = document.createElement("div");
    h.textContent = ["💕","✨","🌸"][Math.floor(Math.random() * 3)];
    h.style.cssText = `position:fixed;bottom:${20+Math.random()*60}%;left:${Math.random()*100}%;font-size:${12+Math.random()*16}px;--dx:${(Math.random()-0.5)*80}px;animation:floatHeart 3s ease-in forwards;pointer-events:none;z-index:500;`;
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
    setTimeout(() => { scrollThrottle = false; }, 400);
  }
});
