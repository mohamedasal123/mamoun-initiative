<template>
  <section class="hero">
    <!-- خلفية مع texture -->
    <div class="hero-bg"></div>

    <div class="hero-container">
      <!-- القسم الأيسر: النص -->
      <div class="hero-text">
        <!-- شارة -->
        <div class="badge">🤝 مبادرة خيرية</div>

        <!-- النص الرئيسي -->
        <h1 class="hero-title">
          <span class="line-1">لمساعدة الطلاب</span>
          <span class="line-2">مبادرة من الأستاذ</span>
          <span class="name-typewriter" ref="nameRef">عبده مامون</span>
          <span class="line-3">بنقل طلاب الثانوية العامة مجاناً</span>
          <span class="line-4">يومياً ذهاباً وإياباً كل أيام الامتحانات</span>
        </h1>

        <!-- تحت إشراف -->
        <p class="subtitle">تحت إشراف مؤسسة مامون الخيرية</p>

        <!-- زر -->
        <button class="cta-btn" @click="scrollToForm">
          <span>⚡</span>
          سجّل الآن
        </button>
      </div>

      <!-- القسم الأيمن: الصورة -->
      <div class="hero-image-wrapper">
        <div class="image-frame">
          <img src="../assets/hero-person.jpg" alt="الأستاذ عبده مامون" class="hero-img" />
          <div class="image-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const nameRef = ref(null)

function scrollToForm() {
  document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Typewriter effect
  const el = nameRef.value
  if (!el) return
  const text = el.textContent
  el.textContent = ''
  el.style.visibility = 'visible'
  let i = 0
  const timer = setInterval(() => {
    el.textContent += text[i]
    i++
    if (i >= text.length) {
      clearInterval(timer)
      el.style.borderLeft = 'none'
    }
  }, 100)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0D2137 0%, #1a3a5c 50%, #0D2137 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(201,148,42,0.08) 0%, transparent 60%),
                    radial-gradient(circle at 80% 20%, rgba(26,58,92,0.5) 0%, transparent 50%);
  pointer-events: none;
}

.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

/* النص */
.hero-text {
  flex: 1;
  animation: slideInRight 0.8s ease forwards;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border: 1px solid rgba(201,148,42,0.4);
  border-radius: 50px;
  color: var(--gold-light);
  font-size: 0.9rem;
  margin-bottom: 28px;
  background: rgba(201,148,42,0.08);
  animation: slideDown 0.6s ease forwards;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: white;
  line-height: 1.4;
  margin-bottom: 20px;
}

.line-1 {
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
}

.line-2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.name-typewriter {
  font-size: 2.6rem;
  font-weight: 900;
  color: var(--gold);
  visibility: hidden;
  border-left: 3px solid var(--gold);
  padding-left: 4px;
  min-height: 1.2em;
  display: block;
}

.line-3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 8px;
}

.line-4 {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.75);
}

.subtitle {
  font-size: 1rem;
  color: var(--gold-light);
  font-style: italic;
  margin-bottom: 36px;
  opacity: 0.9;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: #0D2137;
  font-family: 'Tajawal', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 0 30px var(--gold-glow);
  animation: pulse 2.5s ease-in-out infinite;
  transition: transform 0.2s ease;
}

.cta-btn:hover {
  transform: scale(1.05);
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px var(--gold-glow); }
  50% { box-shadow: 0 0 45px rgba(201,148,42,0.6); }
}

/* الصورة */
.hero-image-wrapper {
  flex: 0 0 420px;
  display: flex;
  justify-content: center;
  animation: slideInLeft 0.8s ease 0.3s both;
}

.image-frame {
  position: relative;
  width: 380px;
  height: 460px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%);
  border: 3px solid var(--gold);
  filter: drop-shadow(0 20px 60px rgba(0,0,0,0.5));
}

.image-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(201,148,42,0.15) 0%, transparent 70%);
  pointer-events: none;
}

/* Animations */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column-reverse;
    padding: 60px 20px;
    text-align: center;
  }

  .hero-image-wrapper {
    flex: none;
    width: 100%;
  }

  .image-frame {
    width: 260px;
    height: 320px;
    margin: 0 auto;
  }

  .name-typewriter { font-size: 2rem; }
  .line-2 { font-size: 1.4rem; }
  .line-3 { font-size: 1.2rem; }
}
</style>
