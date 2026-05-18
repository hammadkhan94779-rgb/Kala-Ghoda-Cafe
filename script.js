// PREMIUM LOADER
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
  }, 2000);
});

// CUSTOM CURSOR
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .filter-btn, .gallery-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.borderWidth = '1px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderWidth = '2px';
    });
  });
}

// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// BACK TO TOP BUTTON
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// DARK/LIGHT MODE
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  isDarkMode = !isDarkMode;
  const sunIcon = themeToggle.querySelector('.fa-sun');
  const moonIcon = themeToggle.querySelector('.fa-moon');
  if (document.body.classList.contains('light-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
});

// AUDIO TOGGLE
const audioToggle = document.getElementById('audioToggle');
const ambientMusic = document.getElementById('ambientMusic');
let isPlaying = false;
audioToggle.addEventListener('click', () => {
  const musicIcon = audioToggle.querySelector('.fa-music');
  const muteIcon = audioToggle.querySelector('.fa-volume-mute');
  if (isPlaying) {
    ambientMusic.pause();
    musicIcon.style.display = 'block';
    muteIcon.style.display = 'none';
  } else {
    ambientMusic.play().catch(e => console.log('Audio play prevented:', e));
    musicIcon.style.display = 'none';
    muteIcon.style.display = 'block';
  }
  isPlaying = !isPlaying;
});

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// SCROLL REVEAL (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
fadeElements.forEach(el => observer.observe(el));

// TYPEWRITER EFFECT
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
  const texts = [
    "Luxury Coffee Experience",
    "European Inspired Atmosphere",
    "Artistic South Mumbai CafÃ©"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  }
  typeEffect();
}

// STATISTICS COUNTER
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      };
      updateCounter();
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));

// MENU FILTER SYSTEM
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    menuCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// LIGHTBOX GALLERY
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const closeLightbox = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.getAttribute('data-image'));

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
  });
});
closeLightbox?.addEventListener('click', () => lightbox.classList.remove('active'));
prevBtn?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentImageIndex];
});
nextBtn?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  lightboxImg.src = images[currentImageIndex];
});

// MAGNETIC BUTTON EFFECT
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

// 3D CARD EFFECT
const cards3d = document.querySelectorAll('.3d-card');
cards3d.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// MOUSE FOLLOW GLOW
const glowElement = document.querySelector('.mouse-follow-glow');
document.addEventListener('mousemove', (e) => {
  if (glowElement) {
    glowElement.style.left = e.clientX + 'px';
    glowElement.style.top = e.clientY + 'px';
  }
});

// PARALLAX EFFECT
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  parallaxImgs.forEach(img => {
    const speed = 0.3;
    img.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// BOOKING FORM HANDLER
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your reservation! We will contact you shortly.');
    bookingForm.reset();
  });
}

// SMOOTH SCROLL FOR ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

console.log('Kala Ghoda Cafe â€” Premium Experience Fully Loaded');
