<template>
  <div class="dashboard-wrapper" dir="rtl">
    <!-- Main Dashboard Section -->
    <section id="admin-dashboard" class="dashboard-section">
      <div class="dashboard-container">
        
        <!-- Dashboard Header -->
        <div class="dashboard-header">
          <div class="header-main">
            <span class="header-icon">📊</span>
            <div>
              <h2 class="dashboard-title">لوحة التحكم وإحصائيات المسجلين</h2>
              <p class="dashboard-subtitle">إدارة طلاب مبادرة الأستاذ عبده مامون للنقل المجاني</p>
            </div>
          </div>
          <div class="header-actions">
            <button @click="logout" class="btn-logout" title="تسجيل الخروج">
              🚪 تسجيل الخروج
            </button>
          </div>
        </div>

        <!-- Warning Info Box -->
        <div class="alert-box info-alert">
          <span class="alert-icon">💡</span>
          <div class="alert-content">
            <strong>معلومة تنظيمية:</strong>
            <p>تتم مزامنة البيانات تلقائياً مع Google Sheet. عمليات الحذف هنا مؤقتة وتتم على الواجهة الحالية فقط لفلترة الكشوفات وتنزيلها.</p>
          </div>
        </div>

        <!-- 1. Stats Cards -->
        <div v-if="registrations.length > 0" class="stats-grid">
          <!-- Total Card -->
          <div class="stats-card total-card">
            <div class="stats-info">
              <span class="stats-label">إجمالي الطلاب المسجلين</span>
              <span class="stats-value">{{ registrations.length }}</span>
            </div>
            <span class="stats-icon-bg">👥</span>
          </div>

          <!-- Dynamic Village Stats -->
          <div 
            v-for="(count, vName) in villageStats" 
            :key="vName" 
            class="stats-card village-card"
            :class="'village-' + getVillageClass(vName)"
          >
            <div class="stats-info">
              <span class="stats-label">{{ vName }}</span>
              <span class="stats-value">{{ count }}</span>
            </div>
            <span class="stats-icon-bg">📍</span>
          </div>
        </div>

        <!-- Loading Stats Placeholder -->
        <div v-else-if="isLoading" class="stats-loading-placeholder">
          <span class="pulse-loader">جاري حساب الإحصائيات...</span>
        </div>

        <!-- 2. Toolbar & Filters -->
        <div class="dashboard-toolbar">
          <div class="toolbar-search-filter">
            <!-- Search Input -->
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="ابحث بالاسم أو رقم التليفون..."
              />
            </div>

            <!-- Village Filter -->
            <div class="filter-box">
              <select v-model="selectedVillage">
                <option value="">كل القرى (تصفية)</option>
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

          <div class="toolbar-actions">
            <!-- Delete Selected Button -->
            <button 
              v-if="selectedRows.length > 0" 
              @click="deleteSelected" 
              class="btn-delete-selected"
            >
              🗑️ حذف المحدد ({{ selectedRows.length }})
            </button>

            <!-- Refresh Button -->
            <button @click="loadData" class="btn-refresh" :disabled="isLoading">
              <span :class="{ 'spin-anim': isLoading }">🔄</span>
              تحديث البيانات
            </button>

            <!-- Export to Excel Button -->
            <button 
              @click="downloadExcel" 
              class="btn-export" 
              :disabled="filteredData.length === 0"
            >
              📥 تحميل Excel
            </button>
          </div>
        </div>

        <!-- 3. Table Container -->
        <div class="table-card">
          <div class="table-responsive">
            <table class="registrations-table">
              <thead>
                <tr>
                  <th class="col-checkbox">
                    <input 
                      type="checkbox" 
                      @change="toggleSelectAll" 
                      :checked="isAllSelected"
                      :disabled="filteredData.length === 0"
                    />
                  </th>
                  <th class="col-id">#</th>
                  <th class="col-name">الاسم</th>
                  <th class="col-phone">رقم التليفون</th>
                  <th class="col-village">البلد</th>
                  <th class="col-date">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loading state -->
                <tr v-if="isLoading">
                  <td colspan="6" class="table-message">
                    <div class="loading-spinner-container">
                      <div class="table-spinner"></div>
                      <span>جاري تحميل بيانات الطلاب من Google Sheet...</span>
                    </div>
                  </td>
                </tr>

                <!-- Error state -->
                <tr v-else-if="fetchError">
                  <td colspan="6" class="table-message error-text">
                    ❌ فشل تحميل البيانات. يرجى التحقق من رابط Google App Script والاتصال بالإنترنت.
                  </td>
                </tr>

                <!-- Empty state -->
                <tr v-else-if="filteredData.length === 0">
                  <td colspan="6" class="table-message">
                    📭 لا توجد بيانات مطابقة لخيارات البحث والتصفية المحددة.
                  </td>
                </tr>

                <!-- Data rows -->
                <tr 
                  v-else 
                  v-for="(row, index) in filteredData" 
                  :key="row.id || index"
                  :class="{ 'row-selected': selectedRows.includes(row.id || index) }"
                  @click="toggleRowSelect(row.id || index)"
                >
                  <td class="col-checkbox" @click.stop>
                    <input 
                      type="checkbox" 
                      v-model="selectedRows" 
                      :value="row.id || index"
                    />
                  </td>
                  <td class="col-id">{{ index + 1 }}</td>
                  <td class="col-name"><strong>{{ row.name }}</strong></td>
                  <td class="col-phone">
                    <a :href="'tel:' + row.phone" @click.stop class="phone-link">{{ row.phone }}</a>
                  </td>
                  <td class="col-village">
                    <span class="table-village-badge" :class="'badge-' + getVillageClass(row.village)">
                      {{ row.village }}
                    </span>
                  </td>
                  <td class="col-date" :title="row.date">{{ formatDate(row.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-footer">
            <span>عدد الصفوف المعروضة: <strong>{{ filteredData.length }}</strong> طالب وطالبة</span>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUL_yXBarN6k1O-0LF7j5PzZhjdu3oRPpu4v9RiWlXBt0gcCPOhKZ7xxTQNvEi63GB5g/exec'
const registrations = ref([])
const isLoading = ref(false)
const fetchError = ref(false)

// Filters & Selections
const searchQuery = ref('')
const selectedVillage = ref('')
const selectedRows = ref([])

onMounted(() => {
  // Guard check redirect
  if (sessionStorage.getItem('mamoun_admin') !== 'true') {
    router.push('/admin')
    return
  }
  loadData()
})

const logout = () => {
  if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
    sessionStorage.removeItem('mamoun_admin')
    router.push('/admin')
  }
}

// Load data from Google Sheet
const loadData = async () => {
  isLoading.value = true
  fetchError.value = false
  selectedRows.value = []
  
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL)
    const raw = await res.json()
    
    if (Array.isArray(raw) && raw.length > 0) {
      // Columns in Sheet:
      // A (row[0]): Name
      // B (row[1]): Phone
      // C (row[2]): Village
      // D (row[3]): Date/Time
      registrations.value = raw.slice(1).map((row, index) => ({
        id: index,
        name: row[0] || '',
        phone: row[1] || '',
        village: row[2] || '',
        date: row[3] || ''
      }))
    } else {
      registrations.value = []
    }
  } catch (e) {
    console.error('Error loading registration data:', e)
    fetchError.value = true
  } finally {
    isLoading.value = false
  }
}

// Calculations for Stats
const villageStats = computed(() => {
  const stats = {}
  registrations.value.forEach(r => {
    if (r.village) {
      stats[r.village] = (stats[r.village] || 0) + 1
    }
  })
  return stats
})

// Filter data
const filteredData = computed(() => {
  let result = registrations.value

  // Village Filter
  if (selectedVillage.value) {
    result = result.filter(r => r.village === selectedVillage.value)
  }

  // Text search (name or phone)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(r => 
      (r.name && r.name.toLowerCase().includes(query)) || 
      (r.phone && r.phone.includes(query))
    )
  }

  return result
})

// Checkbox selection utilities
const isAllSelected = computed(() => {
  if (filteredData.value.length === 0) return false
  return filteredData.value.every(r => selectedRows.value.includes(r.id))
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    // Deselect all from filtered data
    const filteredIds = filteredData.value.map(r => r.id)
    selectedRows.value = selectedRows.value.filter(id => !filteredIds.includes(id))
  } else {
    // Select all filtered data
    filteredData.value.forEach(r => {
      if (!selectedRows.value.includes(r.id)) {
        selectedRows.value.push(r.id)
      }
    })
  }
}

const toggleRowSelect = (id) => {
  const idx = selectedRows.value.indexOf(id)
  if (idx > -1) {
    selectedRows.value.splice(idx, 1)
  } else {
    selectedRows.value.push(id)
  }
}

// Local simulation of deleting a row
const deleteSelected = () => {
  if (confirm(`هل أنت متأكد من رغبتك في حذف الطلاب المحددين (${selectedRows.value.length}) مؤقتاً؟\nملاحظة: هذا الحذف لن يؤثر على الملف الأصلي في Google Sheet.`)) {
    registrations.value = registrations.value.filter(r => !selectedRows.value.includes(r.id))
    selectedRows.value = []
  }
}

// Export excel utilizing CDN SheetJS
const downloadExcel = () => {
  try {
    const XLSX = window.XLSX
    if (!XLSX) {
      alert('مكتبة Excel مش محملة، جرب تعمل refresh للصفحة')
      return
    }

    const exportData = filteredData.value.map((r, index) => ({
      'م': index + 1,
      'الاسم الكامل': r.name,
      'رقم التليفون': r.phone,
      'القرية / البلد': r.village,
      'تاريخ التسجيل': r.date
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'قائمة المسجلين')

    const dateStr = new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')
    const villageSuffix = selectedVillage.value ? `_${selectedVillage.value}` : '_الكل'
    XLSX.writeFile(wb, `مبادرة_مامون${villageSuffix}_${dateStr}.xlsx`)
  } catch (err) {
    console.error(err)
    alert('حدث خطأ أثناء التصدير')
  }
}

// Helper formatting utilities
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  try {
    const parts = dateStr.split(' ')
    if (parts.length > 0) return parts[0]
    return dateStr
  } catch (e) {
    return dateStr
  }
}

// Helper css styling classes for villages
const getVillageClass = (villageName) => {
  const map = {
    'أخطاب': 'akhtab',
    'الإنشاصية': 'inchas',
    'دروة': 'darwa',
    'ميت أبو الحسين': 'mit-hussien',
    'ميت مسعود': 'mit-masoud',
    'ميت معاند': 'mit-moanad',
    'جلموه': 'jalmoah',
    'ميت فضالة': 'mit-fadala'
  }
  return map[villageName] || 'default'
}
</script>

<style scoped>
.dashboard-wrapper {
  background-color: var(--cream);
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Dashboard Section */
.dashboard-section {
  padding: 40px 24px;
  background-color: #f1ede6;
  min-height: 100vh;
  animation: fade-in 0.6s ease-out;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(13, 33, 55, 0.08);
  padding-bottom: 20px;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  font-size: 2.5rem;
}

.dashboard-title {
  color: var(--dark);
  font-size: 1.8rem;
  font-weight: 900;
}

.dashboard-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 4px;
}

.btn-logout {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-logout:hover {
  background: var(--error);
  color: white;
}

/* Info Alert */
.info-alert {
  background-color: rgba(59, 130, 246, 0.08);
  border-right: 4px solid #3b82f6;
  color: #1e3a8a;
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.alert-icon {
  font-size: 1.3rem;
}

.alert-content p {
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.stats-card {
  background: #ffffff;
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-right: 4px solid var(--dark);
}

.stats-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
}

.stats-label {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 700;
}

.stats-value {
  font-size: 2rem;
  font-weight: 900;
  color: var(--dark);
}

.stats-icon-bg {
  position: absolute;
  left: 12px;
  bottom: -10px;
  font-size: 4.5rem;
  opacity: 0.06;
  pointer-events: none;
  z-index: 1;
}

/* Stats styling variation per village */
.total-card { border-right-color: var(--gold); }
.village-akhtab { border-right-color: #3b82f6; }
.village-inchas { border-right-color: #10b981; }
.village-darwa { border-right-color: #f59e0b; }
.village-mit-hussien { border-right-color: #8b5cf6; }
.village-mit-masoud { border-right-color: #ec4899; }
.village-mit-moanad { border-right-color: #06b6d4; }
.village-jalmoah { border-right-color: #14b8a6; }
.village-mit-fadala { border-right-color: #f43f5e; }

.stats-loading-placeholder {
  background: #ffffff;
  padding: 30px;
  text-align: center;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.pulse-loader {
  color: var(--text-muted);
  font-weight: 500;
  animation: pulse 1.5s infinite;
}

/* Toolbar */
.dashboard-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  padding: 16px 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.toolbar-search-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  max-width: 700px;
}

.search-box {
  position: relative;
  flex: 1.5;
  min-width: 200px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  right: 12px;
  color: var(--text-muted);
}

.search-box input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.search-box input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 2px rgba(201, 148, 42, 0.1);
}

.filter-box {
  flex: 1;
  min-width: 150px;
}

.filter-box select {
  width: 100%;
  padding: 10px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  background-color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-box select:focus {
  border-color: var(--gold);
}

.toolbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-delete-selected {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error);
  border: 1px solid var(--error);
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-delete-selected:hover {
  background-color: var(--error);
  color: white;
}

.btn-refresh, .btn-export {
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-refresh {
  background-color: #f1f5f9;
  border: 1.5px solid #cbd5e1;
  color: var(--dark);
}

.btn-refresh:hover:not(:disabled) {
  background-color: #cbd5e1;
}

.btn-export {
  background-color: var(--gold);
  border: 1.5px solid var(--gold);
  color: var(--dark);
  box-shadow: 0 2px 8px rgba(201, 148, 42, 0.2);
}

.btn-export:hover:not(:disabled) {
  background-color: var(--gold-light);
  border-color: var(--gold-light);
}

.btn-export:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.spin-anim {
  display: inline-block;
  animation: spin 1s linear infinite;
}

/* Table Card */
.table-card {
  background: #ffffff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.registrations-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  font-size: 0.95rem;
}

.registrations-table th, 
.registrations-table td {
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
}

.registrations-table th {
  background-color: #f8fafc;
  color: var(--dark);
  font-weight: 700;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

.registrations-table tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.registrations-table tbody tr:hover {
  background-color: #f8fafc;
}

.registrations-table tbody tr.row-selected {
  background-color: rgba(201, 148, 42, 0.05);
}

/* Column Widths & Styles */
.col-checkbox {
  width: 50px;
  text-align: center;
}

.col-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--gold);
}

.col-id {
  width: 60px;
  color: var(--text-muted);
  font-weight: 500;
}

.col-name {
  color: var(--dark);
}

.col-phone {
  width: 180px;
}

.phone-link {
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px dashed var(--text-muted);
  transition: all 0.2s ease;
}

.phone-link:hover {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

.col-village {
  width: 160px;
}

.table-village-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
}

.col-date {
  width: 120px;
  color: var(--text-muted);
}

/* Badge coloring per village in table */
.badge-default { background-color: #f1f5f9; color: var(--text-muted); }
.badge-akhtab { background-color: rgba(59, 130, 246, 0.1); color: #1d4ed8; }
.badge-inchas { background-color: rgba(16, 185, 129, 0.1); color: #047857; }
.badge-darwa { background-color: rgba(245, 158, 11, 0.1); color: #b45309; }
.badge-mit-hussien { background-color: rgba(139, 92, 246, 0.1); color: #6d28d9; }
.badge-mit-masoud { background-color: rgba(236, 72, 153, 0.1); color: #be185d; }
.badge-mit-moanad { background-color: rgba(6, 182, 212, 0.1); color: #0e7490; }
.badge-jalmoah { background-color: rgba(20, 184, 166, 0.1); color: #0f766e; }
.badge-mit-fadala { background-color: rgba(244, 63, 94, 0.1); color: #be123c; }

/* Status message rows in table */
.table-message {
  text-align: center;
  padding: 40px !important;
  color: var(--text-muted);
  background-color: #ffffff;
}

.error-text {
  color: var(--error);
  font-weight: 700;
}

.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.table-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e2e8f0;
  border-radius: 50%;
  border-top-color: var(--gold);
  animation: spin 0.8s linear infinite;
}

.table-footer {
  padding: 16px 20px;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  color: var(--text-muted);
  font-size: 0.9rem;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .btn-logout {
    align-self: flex-end;
  }
  
  .dashboard-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toolbar-actions {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .btn-refresh, .btn-export, .btn-delete-selected {
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }
}
</style>
