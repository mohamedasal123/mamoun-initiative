<template>
  <section id="registration-form" class="registration-section">
    <div class="form-container">
      <div class="section-header">
        <span class="section-icon">📋</span>
        <h2 class="section-title">نموذج التسجيل في المبادرة</h2>
        <p class="section-subtitle">يرجى ملء البيانات التالية بدقة لحجز مقعدك في حافلات النقل المجاني</p>
      </div>

      <!-- Closed Registration Card -->
      <div class="form-card">
        <div class="status-card closed-card">
          <div class="closed-icon">🔒</div>
          <h3>تم إغلاق باب التسجيل</h3>
          <p class="closed-message">
            شكراً لاهتمامكم بالمبادرة. لقد تم إغلاق باب التسجيل في الوقت الحالي.
            <br/>
            سيتم الإعلان عن فتح التسجيل مجدداً في حال توفر أماكن إضافية.
          </p>
          <div class="closed-details">
  <span class="closed-badge">🚫 التسجيل مغلق</span>
  <p class="greetings-text">
    مع تحيات
    <a href="https://mohamedasal-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" class="portfolio-link">
      Eng. Mohamed Ibrahim Asal
    </a>
  </p>
</div>
        </div>
      </div>
    </div>

   
    <!-- Signature Badge -->
<div class="signature-wrapper">
  <a 
    href="https://mohamedasal-portfolio.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    class="signature-badge"
    aria-label="Mohamed Ibrahim Asal Portfolio"
  >
    <span class="sig-icon" aria-hidden="true">🌐</span>
    <span class="sig-text">© All Rights Reserved to Eng. Mohamed Ibrahim Asal</span>
  </a>
</div>

  </section>
</template>

<script setup>
// No logic needed — registration is closed
</script>

<style scoped>
.registration-section {
  background: var(--cream);
  width: 100%;
  padding: 80px 20px;
  direction: rtl;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--dark);
  margin-bottom: 12px;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.form-card {
  max-width: 580px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius);
  padding: 48px 40px;
  box-shadow: var(--shadow);
  border-top: 4px solid #ef4444;
}

/* Closed Card */
.status-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}

.closed-icon {
  font-size: 4rem;
}

.closed-card h3 {
  color: #ef4444;
  font-size: 1.6rem;
  font-weight: 900;
}

.closed-message {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 420px;
}

.closed-details {
  background-color: #fef2f2;
  border: 1px dashed #ef4444;
  padding: 16px 32px;
  border-radius: 8px;
  margin-top: 8px;
}

.closed-badge {
  display: inline-block;
  background-color: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  padding: 6px 16px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
}
.greetings-text {
  margin-top: 12px;
  font-size: 1.2rem;
  color: var(--text-muted);
  font-weight: 600;
}

.portfolio-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 900;
  transition: opacity 0.2s ease;
}

.portfolio-link:hover {
  opacity: 0.90;
  text-decoration: underline;
}
/* ============================================================
   SIGNATURE BADGE
   ============================================================ */
.signature-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 48px;
}

.signature-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 22px;
  background: rgba(6, 18, 35, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 148, 42, 0.25);
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition:
    padding 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.35s ease,
    background 0.35s ease,
    box-shadow 0.35s ease;
}

.signature-badge:hover {
  padding: 10px 30px;
  border-color: rgba(201, 148, 42, 0.7);
  background: rgba(6, 18, 35, 0.85);
  box-shadow:
    0 0 0 1px rgba(201, 148, 42, 0.15),
    0 0 24px rgba(201, 148, 42, 0.18),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

.sig-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(201, 148, 42, 0.6);
  width: 16px;
  height: 16px;
  transition: color 0.35s ease, filter 0.35s ease;
}

.sig-icon svg {
  width: 100%;
  height: 100%;
}

.signature-badge:hover .sig-icon {
  color: #E8B84B;
  filter: drop-shadow(0 0 6px rgba(232, 184, 75, 0.8));
}

.sig-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(201, 148, 42, 0.5);
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: color 0.35s ease, text-shadow 0.35s ease;
}

.signature-badge:hover .sig-text {
  color: rgba(232, 184, 75, 0.9);
  text-shadow: 0 0 12px rgba(232, 184, 75, 0.3);
}
</style>