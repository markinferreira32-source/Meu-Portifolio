// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .tech-card, .proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.opacity = '0.5';
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.borderColor = 'rgba(0,212,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(0,212,255,0.4)';
    });
  });
}

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// MOBILE MENU
// ===========================
function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('menu').classList.remove('active');
  document.getElementById('hamburger').classList.remove('open');
}

// ===========================
// TYPING ANIMATION
// ===========================
const phrases = ['HTML • CSS • JavaScript', 'Front-end Dev', 'Criando soluções'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
  if (!typingEl) return;
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}
setTimeout(type, 1500);

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const sobreSection = document.querySelector('.sobre');
if (sobreSection) counterObserver.observe(sobreSection);

// ===========================
// TECH CARDS STAGGER
// ===========================
const techCards = document.querySelectorAll('.tech-card');
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      techCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

techCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s, background 0.35s, box-shadow 0.35s';
});
const techSection = document.querySelector('.tecnologias');
if (techSection) techObserver.observe(techSection);

// ===========================
// PROJ CARDS STAGGER
// ===========================
const projCards = document.querySelectorAll('.proj-card');
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      projCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 120);
      });
      projObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.35s, box-shadow 0.35s';
});
const projSection = document.querySelector('.projetos');
if (projSection) projObserver.observe(projSection);