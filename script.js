const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');
const darkToggle = document.getElementById('darkModeToggle');
const greeting = document.getElementById('greeting');
const links = document.querySelectorAll('nav ul a');

// Toggle menu
toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  speak(nav.classList.contains('active') ? 'Menu opened' : 'Menu closed');
});

// Dark mode
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Load icons
lucide.createIcons();

// Greeting
function updateGreeting() {
  const hour = new Date().getHours();
  let message = 'Hello, Commander.';
  if (hour < 12) message = 'Good morning, Commander.';
  else if (hour < 18) message = 'Good afternoon, Commander.';
  else message = 'Good evening, Commander.';
  greeting.textContent = message;
}
updateGreeting();

// Active link highlight
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;
  links.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= scrollY + 100 && section.offsetTop + section.offsetHeight > scrollY) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Text-to-speech feedback
function speak(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

// Hover sound effect
const context = new (window.AudioContext || window.webkitAudioContext)();
function beep() {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(context.destination);
  osc.frequency.value = 600 + Math.random() * 100;
  gain.gain.setValueAtTime(0.02, context.currentTime);
  osc.start();
  osc.stop(context.currentTime + 0.1);
}
links.forEach(link => link.addEventListener('mouseenter', beep));

// Tilt on mouse move
const tilt = document.querySelector('.tilt');
document.addEventListener('mousemove', e => {
  const { innerWidth: w, innerHeight: h } = window;
  const x = (e.clientX / w - 0.5) * 20;
  const y = (e.clientY / h - 0.5) * 20;
  tilt.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: Math.random() - 0.5,
  dy: Math.random() - 0.5
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
