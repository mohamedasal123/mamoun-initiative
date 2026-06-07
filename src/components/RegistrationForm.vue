<template>
  <section id="registration-form" class="registration-section">
    <div class="form-container">
      <div class="section-header">
        <span class="section-icon">📋</span>
        <h2 class="section-title">نموذج التسجيل في المبادرة</h2>
        <p class="section-subtitle">يرجى ملء البيانات التالية بدقة لحجز مقعدك في حافلات النقل المجاني</p>
      </div>

      <!-- Main Form / Status Card -->
      <div class="form-card">
        
        <!-- Already Registered State -->
        <div v-if="isAlreadyRegistered && !showFormAnyway" class="status-card registered-card">
          <div class="status-icon">🎉</div>
          <h3>أنت مسجل بالفعل في المبادرة</h3>
          <p class="registered-student">
            مرحباً بك يا <strong>{{ registeredName }}</strong>، تم حفظ بيانات تسجيلك بنجاح.
          </p>
          <div class="registered-details">
            <span class="status-badge">✅ تم التأكيد</span>
            <p class="details-note">سنقوم بالتواصل معك لتحديد موعد ومكان التجمع قبل بدء الامتحانات.</p>
          </div>
          <button @click="showFormAnyway = true" class="btn-secondary">
            تسجيل طالب آخر 👤
          </button>
        </div>

        <!-- Submission Success State -->
        <div v-else-if="showSuccess" class="status-card success-card">
          <div class="status-icon-circle success-bg">
            <span class="status-symbol">✓</span>
          </div>
          <h3>تم تسجيلك بنجاح!</h3>
          <p>شكراً لك <strong>{{ name }}</strong>. تم تسجيل بياناتك بنجاح وسنتواصل معك قريباً.</p>
          <div class="summary-details">
            <p><strong>الاسم:</strong> {{ name }}</p>
            <p><strong>القرية:</strong> {{ villageName(village) }}</p>
            <p><strong>الهاتف:</strong> {{ phone }}</p>
          </div>
          <button @click="resetForm" class="btn-primary-reset">
            تسجيل طالب آخر
          </button>
        </div>

        <!-- Main Form Input State -->
        <form v-else @submit.prevent="submitForm" class="registration-form">
          <!-- Error alert -->
          <div v-if="showError" class="alert-box error-alert">
            <span class="alert-icon">⚠️</span>
            <div class="alert-content">
              <strong>حدث خطأ أثناء التسجيل:</strong>
              <p>يرجى التحقق من اتصالك بالإنترنت وإعادة المحاولة. إذا استمرت المشكلة، يرجى المحاولة لاحقاً.</p>
            </div>
          </div>

          <div v-if="validationError" class="alert-box warning-alert">
            <span class="alert-icon">⚡</span>
            <div class="alert-content">
              <strong>تنبيه:</strong>
              <p>{{ validationError }}</p>
            </div>
          </div>

          <!-- Input Group: Full Name -->
          <div class="form-group">
            <label for="name" class="form-label">
              <span>الاسم الكامل للطالب / الطالبة</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input 
                id="name"
                type="text" 
                v-model.trim="name" 
                class="form-input"
                placeholder="اكتب اسمك الرباعي هنا" 
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- Input Group: Phone -->
          <div class="form-group">
            <label for="phone" class="form-label">
              <span>رقم التليفون (الواتساب إن أمكن)</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">📱</span>
              <input 
                id="phone"
                type="tel" 
                v-model.trim="phone" 
                class="form-input"
                placeholder="01xxxxxxxxx" 
                required
                pattern="01[0-9]{9}"
                maxlength="11"
                :disabled="isLoading"
              />
            </div>
            <small class="input-help">يجب أن يبدأ بـ 01 ويتكون من 11 رقماً</small>
          </div>

          <!-- Input Group: Village -->
          <div class="form-group">
            <label for="village" class="form-label">
              <span>القرية / المنطقة</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">📍</span>
              <select 
                id="village"
                v-model="village" 
                class="form-select"
                required
                :disabled="isLoading"
              >
                <option value="" disabled selected>اختر بلدك</option>
                <option value="أخطاب">أخطاب</option>
                <option value="الإنشاصية">الإنشاصية</option>
                <option value="دروة">دروة</option>
                <option value="ميت أبو الحسين">ميت أبو الحسين</option>
                <option value="ميت مسعود">ميت مسعود</option>
                <option value="ميت معاند">ميت معاند</option>
                <option value="جلموه">جلموه</option>
                <option value="ميت فضالة">ميت فضالة</option>
              </select>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>إرسال طلب التسجيل 📤</span>
          </button>
        </form>

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
        <span class="sig-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </span>
        <span class="sig-text">© All Rights Reserved to Eng. Mohamed Ibrahim Asal</span>
      </a>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUL_yXBarN6k1O-0LF7j5PzZhjdu3oRPpu4v9RiWlXBt0gcCPOhKZ7xxTQNvEi63GB5g/exec'
const name = ref('')
const phone = ref('')
const village = ref('')

const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const validationError = ref('')

const isAlreadyRegistered = ref(false)
const registeredName = ref('')
const showFormAnyway = ref(false)

onMounted(() => {
  checkRegistrationStatus()
})

const checkRegistrationStatus = () => {
  const registered = localStorage.getItem('mamoun_registered')
  if (registered === 'true') {
    isAlreadyRegistered.value = true
    registeredName.value = localStorage.getItem('mamoun_name') || ''
  }
}

const villageName = (val) => {
  return val || 'غير محدد'
}

const validatePhone = (p) => {
  const phoneRegex = /^01[0-9]{9}$/
  return phoneRegex.test(p)
}

const submitForm = async () => {
  validationError.value = ''
  showError.value = false

  if (!name.value || !phone.value || !village.value) {
    validationError.value = 'الرجاء تعبئة جميع الحقول المطلوبة.'
    return
  }

  if (!validatePhone(phone.value)) {
    validationError.value = 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقماً.'
    return
  }

  isLoading.value = true

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        village: village.value
      })
    })

    localStorage.setItem('mamoun_registered', 'true')
    localStorage.setItem('mamoun_name', name.value)
    
    showSuccess.value = true
    isAlreadyRegistered.value = true
    registeredName.value = name.value
  } catch (e) {
    console.error('Registration error:', e)
    showError.value = true
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  name.value = ''
  phone.value = ''
  village.value = ''
  showSuccess.value = false
  showFormAnyway.value = true
}
</script>

<style scoped>
/* section التسجيل */
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
  border-top: 4px solid var(--gold);
}

/* الـ inputs */
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 8px;
  font-size: 1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 16px;
  font-size: 1.2rem;
  color: var(--text-muted);
  pointer-events: none;
}

.form-input, .form-select {
  width: 100%;
  padding: 14px 48px 14px 16px; /* Added spacing to fit the right-positioned icon */
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: 'Tajawal', sans-serif;
  font-size: 1rem;
  color: var(--text-main);
  direction: rtl;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  background: white;
}

.form-input:focus, .form-select:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(201,148,42,0.15);
}

.input-help {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 4px;
  display: block;
}

.required {
  color: var(--error);
  margin-right: 4px;
}

/* زر الإرسال */
.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--dark), var(--dark-2));
  color: white;
  font-family: 'Tajawal', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--gold-glow);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Status Cards (Success / Registered) */
.status-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}

.status-icon {
  font-size: 4rem;
}

.status-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.success-bg {
  background-color: rgba(16, 185, 129, 0.1);
  border: 2px solid var(--success);
}

.status-symbol {
  font-size: 2.5rem;
  color: var(--success);
  font-weight: bold;
}

.registered-card h3 {
  color: var(--gold);
  font-size: 1.6rem;
}

.success-card h3 {
  color: var(--success);
  font-size: 1.6rem;
}

.registered-student {
  font-size: 1.15rem;
  color: var(--text-main);
}

.registered-details {
  background-color: #f8fafc;
  border: 1px dashed var(--gold);
  padding: 16px;
  border-radius: 8px;
  max-width: 450px;
  margin: 8px 0;
}

.status-badge {
  display: inline-block;
  background-color: rgba(16, 185, 129, 0.15);
  color: var(--success);
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.details-note {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.summary-details {
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 4px solid var(--success);
  margin-bottom: 16px;
}

.btn-secondary {
  background: transparent;
  color: var(--text-muted);
  border: 1.5px solid #cbd5e1;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
}

.btn-secondary:hover {
  border-color: var(--gold);
  color: var(--gold);
  background-color: rgba(201, 148, 42, 0.05);
}

.btn-primary-reset {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--dark);
  font-family: 'Tajawal', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--gold-glow);
}

/* Alert Boxes */
.alert-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  text-align: right;
  margin-bottom: 16px;
}

.error-alert {
  background-color: rgba(239, 68, 68, 0.08);
  border-right: 4px solid var(--error);
  color: #7f1d1d;
}

.warning-alert {
  background-color: rgba(201, 148, 42, 0.08);
  border-right: 4px solid var(--gold);
  color: #78350f;
}

.alert-icon {
  font-size: 1.3rem;
}

.alert-content p {
  font-size: 0.9rem;
  margin-top: 4px;
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
  /* Frosted glass dark navy */
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

/* Globe icon */
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

/* Copyright text */
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
