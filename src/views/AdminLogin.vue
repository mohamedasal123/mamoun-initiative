<template>
  <div class="login-page">
    <!-- Card بيضاء في المنتصف -->
    <div class="login-card">
      <div class="login-icon">🔐</div>
      <h2 class="login-title">لوحة التحكم</h2>
      <p class="login-subtitle">مبادرة الأستاذ عبده مامون</p>

      <input
        v-model="password"
        type="password"
        class="login-input"
        placeholder="كلمة المرور"
        @keyup.enter="login"
        :disabled="loading"
      />

      <button @click="login" class="login-btn" :disabled="loading">
        {{ loading ? 'جاري التحقق...' : 'دخول' }}
      </button>

      <p v-if="error" class="error-msg">❌ كلمة المرور غلط</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const error = ref(false)
const loading = ref(false)

function login() {
  if (!password.value) return
  
  error.value = false
  loading.value = true
  
  setTimeout(() => {
    if (password.value === 'mamoun2025@1234@!Asal') {
      sessionStorage.setItem('mamoun_admin', 'true')
      router.push('/dashboard')
    } else {
      error.value = true
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0D2137 0%, #1a3a5c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  direction: rtl;
  font-family: 'Tajawal', sans-serif;
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4);
  border-top: 4px solid var(--gold);
  animation: fadeInUp 0.5s ease;
  text-align: center;
}

.login-icon { 
  font-size: 3rem; 
  margin-bottom: 16px; 
}

.login-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--dark);
  margin-bottom: 8px;
}

.login-subtitle {
  color: var(--text-muted);
  margin-bottom: 32px;
  font-size: 0.95rem;
}

.login-input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: 'Tajawal', sans-serif;
  font-size: 1rem;
  text-align: center;
  direction: ltr;
  outline: none;
  margin-bottom: 16px;
  transition: border-color 0.2s;
}

.login-input:focus { 
  border-color: var(--gold); 
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--dark);
  font-family: 'Tajawal', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 24px var(--gold-glow); 
}

.error-msg {
  color: var(--error);
  margin-top: 12px;
  font-size: 0.95rem;
  font-weight: 700;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
