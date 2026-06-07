<template>
  <section class="hero">

    <!-- Animated background layers -->
    <div class="bg-base"></div>
    <canvas ref="canvasRef" class="bg-particles"></canvas>
    <div class="bg-grid"></div>
    <div class="bg-glow-right"></div>
    <div class="bg-glow-left"></div>

    <div class="hero-container">

      <!-- ===== النص ===== -->
      <div class="hero-text" :class="{ visible: textVisible }">

        <div class="badge">
          <span class="badge-dot"></span>
          مبادرة خيرية مجانية
        </div>

        <h1 class="hero-title">
          <span class="t-line t-small">لمساعدة الطلاب</span>
          <span class="t-line t-medium">مبادرة من الأستاذ</span>
          <span class="t-name" ref="nameRef"></span>
          <span class="t-line t-medium">بنقل طلاب الثانوية العامة</span>
          <span class="t-line t-accent">مجاناً يومياً ذهاباً وإياباً</span>
          <span class="t-line t-small">كل أيام الامتحانات</span>
        </h1>

        <div class="subtitle-wrapper">
          <span class="subtitle-line"></span>
          <p class="subtitle">تحت إشراف مؤسسة مامون الخيرية</p>
          <span class="subtitle-line"></span>
        </div>

        <button class="cta-btn" @click="scrollToForm">
          <span class="cta-text">سجّل الآن</span>
          <span class="cta-arrow">←</span>
          <span class="cta-ripple"></span>
        </button>

        <!-- Stats row -->
        <div class="stats-row">
          <div class="stat">
            <span class="stat-num">8</span>
            <span class="stat-label">قرى</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">100%</span>
            <span class="stat-label">مجاني</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">يومي</span>
            <span class="stat-label">ذهاب وإياب</span>
          </div>
        </div>

      </div>

      <!-- ===== الصورة ===== -->
      <div class="hero-image-wrapper" :class="{ visible: imgVisible }">
        <div class="img-decoration-ring ring-1"></div>
        <div class="img-decoration-ring ring-2"></div>
        <div class="img-decoration-ring ring-3"></div>

        <div class="image-frame">
          <div class="img-corner tl"></div>
          <div class="img-corner tr"></div>
          <div class="img-corner bl"></div>
          <div class="img-corner br"></div>
          <img
            src="../assets/hero-person.jpg"
            alt="الأستاذ عبده مامون"
            class="hero-img"
          />
          <div class="img-overlay"></div>
          <div class="img-badge">
            <span>🤝</span>
            <span>الأستاذ عبده مامون</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>

  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const nameRef = ref(null)
const canvasRef = ref(null)
const textVisible = ref(false)
const imgVisible = ref(false)

function scrollToForm() {
  document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })
}

// Typewriter
function startTypewriter() {
  const el = nameRef.value
  if (!el) return
  const text = 'عبده مامون'
  el.textContent = ''
  el.style.visibility = 'visible'
  let i = 0
  const timer = setInterval(() => {
    el.textContent += text[i]
    i++
    if (i >= text.length) {
      clearInterval(timer)
      setTimeout(() => {
        el.style.borderColor = 'transparent'
      }, 800)
    }
  }, 110)
}

// Floating particles on canvas
function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    gold: Math.random() > 0.6
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.gold
        ? `rgba(201,148,42,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.5})`
      ctx.fill()
      p.x += p.dx
      p.y += p.dy
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1
    })
    requestAnimationFrame(draw)
  }
  draw()

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

onMounted(() => {
  initParticles()

  // Staggered entrance
  setTimeout(() => { textVisible.value = true }, 100)
  setTimeout(() => { imgVisible.value = true }, 400)
  setTimeout(() => { startTypewriter() }, 900)
})
</script>

<style scoped>
/* ===== Base ===== */
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: 'Tajawal', sans-serif;
  direction: rtl;
}

/* ===== Background layers ===== */
.bg-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #061525 0%, #0D2137 40%, #0a1e35 70%, #071220 100%);
}

.bg-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bg-grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image:
    linear-gradient(rgba(201,148,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,148,42,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.bg-glow-right {
  position: absolute;
  top: -10%;
  left: -5%;
  width: 55%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(201,148,42,0.07) 0%, transparent 65%);
  z-index: 2;
  animation: glowPulse 6s ease-in-out infinite;
}

.bg-glow-left {
  position: absolute;
  bottom: -20%;
  right: -10%;
  width: 60%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(13,60,100,0.4) 0%, transparent 65%);
  z-index: 2;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

/* ===== Container ===== */
.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

/* ===== Text side ===== */
.hero-text {
  flex: 1;
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}

.hero-text.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 22px;
  border: 1px solid rgba(201,148,42,0.35);
  border-radius: 50px;
  color: #E8B84B;
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 32px;
  background: rgba(201,148,42,0.07);
  backdrop-filter: blur(8px);
  letter-spacing: 0.03em;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #E8B84B;
  box-shadow: 0 0 10px #E8B84B;
  animation: blink 1.8s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Title */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}

.t-line {
  display: block;
  color: white;
  line-height: 1.35;
}

.t-small {
  font-size: 1.05rem;
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.02em;
}

.t-medium {
  font-size: 1.75rem;
  font-weight: 700;
}

.t-accent {
  font-size: 1.35rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
}

.t-name {
  display: block;
  font-size: 3.2rem;
  font-weight: 900;
  color: #C9942A;
  visibility: hidden;
  border-left: 3px solid #C9942A;
  padding-left: 6px;
  min-height: 1.2em;
  line-height: 1.2;
  text-shadow: 0 0 40px rgba(201,148,42,0.4);
  letter-spacing: -0.01em;
}

/* Subtitle */
.subtitle-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
}

.subtitle-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,148,42,0.4), transparent);
}

.subtitle {
  font-size: 0.92rem;
  color: #E8B84B;
  font-style: italic;
  white-space: nowrap;
  opacity: 0.85;
}

/* CTA Button */
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 17px 44px;
  background: linear-gradient(135deg, #C9942A 0%, #E8B84B 50%, #C9942A 100%);
  background-size: 200% auto;
  color: #061525;
  font-family: 'Tajawal', sans-serif;
  font-size: 1.15rem;
  font-weight: 900;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: background-position 0.4s ease, transform 0.25s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 32px rgba(201,148,42,0.35), 0 0 0 0 rgba(201,148,42,0.2);
  animation: ctaPulse 3s ease-in-out infinite;
  margin-bottom: 40px;
}

.cta-btn:hover {
  background-position: right center;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 16px 48px rgba(201,148,42,0.5);
}

.cta-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.cta-btn:hover .cta-arrow {
  transform: translateX(-5px);
}

.cta-ripple {
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: rgba(255,255,255,0.15);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.cta-btn:active .cta-ripple {
  transform: scale(1);
}

@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 8px 32px rgba(201,148,42,0.35), 0 0 0 0 rgba(201,148,42,0.2); }
  50% { box-shadow: 0 8px 40px rgba(201,148,42,0.55), 0 0 0 12px rgba(201,148,42,0); }
}

/* Stats row */
.stats-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(201,148,42,0.25);
}

/* ===== Image side ===== */
.hero-image-wrapper {
  flex: 0 0 460px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s;
}

.hero-image-wrapper.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Decoration rings */
.img-decoration-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(201,148,42,0.15);
  animation: ringRotate 20s linear infinite;
}

.ring-1 {
  width: 480px;
  height: 480px;
  border-color: rgba(201,148,42,0.12);
  animation-duration: 25s;
}

.ring-2 {
  width: 400px;
  height: 400px;
  border-color: rgba(201,148,42,0.18);
  animation-direction: reverse;
  animation-duration: 18s;
  border-style: dashed;
}

.ring-3 {
  width: 320px;
  height: 320px;
  border-color: rgba(201,148,42,0.08);
  animation-duration: 30s;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Image frame */
.image-frame {
  position: relative;
  width: 360px;
  height: 460px;
  z-index: 2;
}

/* Corner decorations */
.img-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  z-index: 5;
}

.img-corner.tl { top: -4px; right: -4px; border-top: 3px solid #C9942A; border-right: 3px solid #C9942A; }
.img-corner.tr { top: -4px; left: -4px; border-top: 3px solid #C9942A; border-left: 3px solid #C9942A; }
.img-corner.bl { bottom: -4px; right: -4px; border-bottom: 3px solid #C9942A; border-right: 3px solid #C9942A; }
.img-corner.br { bottom: -4px; left: -4px; border-bottom: 3px solid #C9942A; border-left: 3px solid #C9942A; }

/* Hero image */
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  border-radius: 4px;
  filter: drop-shadow(0 24px 60px rgba(0,0,0,0.6));
  animation: imgFloat 6s ease-in-out infinite;
}

@keyframes imgFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Image overlay gradient */
.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(6,21,37,0.7) 100%
  );
  border-radius: 4px;
  pointer-events: none;
}

/* Name badge on image */
.img-badge {
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,148,42,0.9);
  backdrop-filter: blur(10px);
  color: #061525;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 900;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 6;
}

/* ===== Scroll indicator ===== */
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 26px;
  height: 42px;
  border: 2px solid rgba(201,148,42,0.4);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-dot {
  width: 4px;
  height: 10px;
  background: #C9942A;
  border-radius: 2px;
  animation: scrollDown 2s ease-in-out infinite;
}

@keyframes scrollDown {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(14px); opacity: 0; }
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .hero-container {
    flex-direction: column-reverse;
    padding: 60px 24px 80px;
    text-align: center;
    gap: 40px;
  }

  .hero-image-wrapper {
    flex: none;
    width: 100%;
  }

  .image-frame {
    width: 260px;
    height: 330px;
    margin: 0 auto;
  }

  .ring-1 { width: 320px; height: 320px; }
  .ring-2 { width: 270px; height: 270px; }
  .ring-3 { width: 220px; height: 220px; }

  .t-name { font-size: 2.4rem; }
  .t-medium { font-size: 1.4rem; }
  .t-accent { font-size: 1.1rem; }

  .subtitle-wrapper { justify-content: center; }
  .stats-row { justify-content: center; }

  .cta-btn { width: 100%; justify-content: center; }
}
</style>