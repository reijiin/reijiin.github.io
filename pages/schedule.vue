<template>
  <div class="page">
    <SiteNav />

    <section class="section">
      <div class="section-header">
        <span class="section-title">RELEASE SCHEDULE</span>
        <span class="section-sub">// 投稿予定カレンダー</span>
      </div>

      <!-- 月ナビ -->
      <div class="month-nav">
        <button class="month-btn" @click="prevMonth">◀</button>
        <span class="month-label">
          {{ currentYear }}<span class="month-sep">.</span>{{ String(currentMonth + 1).padStart(2, '0') }}
        </span>
        <button class="month-btn" @click="nextMonth">▶</button>
      </div>

      <!-- チャンネルフィルター -->
      <div class="filter-bar">
        <span class="filter-label">// CHANNEL</span>
        <select v-model="selectedChannel" class="filter-select">
          <option v-for="ch in channelOptions" :key="ch" :value="ch">
            {{ ch === 'ALL' ? 'ALL CHANNELS' : ch }}
          </option>
        </select>
      </div>

      <!-- 凡例 -->
      <div class="legend">
        <span class="legend-item"><span class="legend-dot dot-scheduled" />SCHEDULED</span>
        <span class="legend-item"><span class="legend-dot dot-uploaded" />UPLOADED</span>
      </div>

      <!-- カレンダーグリッド -->
      <div class="calendar">
        <div class="cal-header">
          <span v-for="d in dayLabels" :key="d" class="cal-dow">{{ d }}</span>
        </div>
        <div class="cal-grid">
          <div
            v-for="(cell, i) in filteredCalendarCells"
            :key="i"
            class="cal-cell"
            :class="{
              'is-empty': !cell.day,
              'is-today': cell.isToday,
              'is-past': cell.isPast,
              'has-events': cell.events.length > 0,
            }"
            @click="scrollToDate(cell.dateStr ?? null)"
          >
            <span v-if="cell.day" class="cal-day">{{ cell.day }}</span>
            <div v-if="cell.events.length" class="cal-events">
              <component
                :is="ev.url ? 'a' : 'div'"
                v-for="ev in cell.events"
                :key="ev.title"
                :href="ev.url || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="cal-event"
                :class="[ev.status === 'uploaded' ? 'ev-uploaded' : 'ev-scheduled', ev.url ? 'is-link' : '']"
                :title="ev.title + ' — ' + ev.channel"
              >
                <span class="ev-dot" />
                <span class="ev-text">{{ ev.title }}</span>
              </component>
            </div>
          </div>
        </div>
      </div>

      <!-- 当月のイベントリスト -->
      <div class="event-list" v-if="filteredMonthEvents.length">
        <div class="divider">
          <span class="divider-line" />
          <span class="divider-label">THIS MONTH — 今月の予定</span>
          <span class="divider-line" />
        </div>
        <component
          :is="ev.url ? 'a' : 'div'"
          v-for="ev in filteredMonthEvents"
          :key="ev.date + ev.title"
          :id="`event-${ev.date}`"
          :href="ev.url || undefined"
          target="_blank"
          rel="noopener noreferrer"
          class="event-item"
          :class="[
            ev.status === 'uploaded' ? 'ev-item-uploaded' : 'ev-item-scheduled',
            ev.url ? 'is-link' : '',
            highlightDate === ev.date ? 'is-highlight' : '',
          ]"
        >
          <div class="ev-thumb">
            <img
              v-if="ev.thumbnail"
              :src="ev.thumbnail"
              :alt="ev.title"
            />
            <img
              v-else-if="ev.videoId"
              :src="`https://img.youtube.com/vi/${ev.videoId}/hqdefault.jpg`"
              :alt="ev.title"
            />
            <span v-else class="ev-thumb-icon">▶</span>
          </div>
          <span class="ev-date">{{ formatDate(ev.date) }}</span>
          <span class="ev-bar" />
          <div class="ev-info">
            <span class="ev-title">{{ ev.title }}</span>
            <span class="ev-channel">{{ ev.channel }}</span>
            <span v-if="ev.caption" class="ev-caption">{{ ev.caption }}</span>
          </div>
          <span class="ev-status">{{ ev.status === 'uploaded' ? 'UPLOADED' : 'SCHEDULED' }}</span>
        </component>
      </div>
      <p v-else class="no-events">// NO EVENTS THIS MONTH</p>
    </section>

    <footer class="footer">
      <span class="footer-logo">STUDIO REIJIIN · 零二院</span>
      <span class="footer-copy">© 2025 スタジオ零二院</span>
      <span class="footer-id">02</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import scheduleData from '~/public/data/schedule.json'

const schedule = scheduleData as Array<{
  date: string
  title: string
  channel: string
  channelId: string
  status: 'scheduled' | 'uploaded'
  videoId?: string
  thumbnail?: string
  url?: string
  caption?: string
}>

const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth())

function prevMonth() {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
}

function nextMonth() {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
}

const todayStr = now.toISOString().slice(0, 10)

// チャンネルフィルター
const selectedChannel = ref('ALL')
const channelOptions = computed(() => {
  const names = [...new Set(schedule.map(e => e.channel))]
  return ['ALL', ...names]
})

const calendarCells = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: null, isToday: false, isPast: false, events: [] })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const events = schedule.filter(e => e.date === dateStr)
    cells.push({
      day: d,
      dateStr,
      isToday: dateStr === todayStr,
      isPast: dateStr < todayStr,
      events,
    })
  }
  return cells
})

const filteredCalendarCells = computed(() =>
  calendarCells.value.map(cell => ({
    ...cell,
    events: cell.events.filter(e =>
      selectedChannel.value === 'ALL' || e.channel === selectedChannel.value
    )
  }))
)

const filteredMonthEvents = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  return schedule
    .filter(e => e.date.startsWith(prefix))
    .filter(e => selectedChannel.value === 'ALL' || e.channel === selectedChannel.value)
    .sort((a, b) => a.date.localeCompare(b.date))
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

// カレンダークリック → リストにスクロール＆ハイライト
const highlightDate = ref('')

function scrollToDate(dateStr: string | null) {
  if (!dateStr) return
  const year = currentYear.value
  const month = currentMonth.value
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  if (!dateStr.startsWith(prefix)) return

  highlightDate.value = dateStr
  nextTick(() => {
    const el = document.getElementById(`event-${dateStr}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setTimeout(() => { highlightDate.value = '' }, 1500)
  })
}
</script>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

.section { padding: 40px 32px 48px; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 28px;
}

.section-title {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 4px;
  color: rgba(232, 232, 232, 0.85);
}

.section-sub {
  font-family: var(--font-en);
  font-size: 10px;
  color: rgba(224, 48, 32, 0.7);
  letter-spacing: 2px;
}

.month-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.month-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--red);
  font-family: var(--font-en);
  font-size: 11px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.month-btn:hover {
  background: var(--red-dim);
  box-shadow: 0 0 8px var(--red-glow);
}

.month-label {
  font-family: var(--font-en);
  font-size: 22px;
  font-weight: 900;
  color: #f0f0f0;
  letter-spacing: 4px;
  text-shadow: 0 0 10px var(--red-glow);
  min-width: 120px;
}

.month-sep { color: var(--red); margin: 0 2px; }

/* フィルター */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(232, 232, 232, 0.4);
}

.filter-select {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: rgba(232, 232, 232, 0.8);
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 2px;
  padding: 6px 12px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.filter-select:hover,
.filter-select:focus { border-color: var(--cyan); }

.filter-select option {
  background: #0a0b0e;
  color: #e8e8e8;
}

.legend {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(232, 232, 232, 0.65);
}

.legend-dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-scheduled { background: var(--cyan); box-shadow: 0 0 6px var(--cyan-glow); }
.dot-uploaded  { background: rgba(232, 232, 232, 0.5); }

.calendar {
  border: 1px solid rgba(255, 46, 26, 0.35);
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 40px;
}

.cal-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid rgba(255, 46, 26, 0.25);
  background: rgba(255, 46, 26, 0.06);
}

.cal-dow {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(0, 229, 255, 0.8);
  text-align: center;
  padding: 10px 0;
}

.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }

.cal-cell {
  min-height: 80px;
  border-right: 1px solid rgba(255, 46, 26, 0.15);
  border-bottom: 1px solid rgba(255, 46, 26, 0.15);
  padding: 6px;
  position: relative;
  transition: background 0.15s;
}

.cal-cell:nth-child(7n) { border-right: none; }
.cal-cell.is-empty { background: rgba(0, 0, 0, 0.15); }

.cal-cell.is-today {
  background: rgba(255, 46, 26, 0.1);
  border: 1px solid rgba(255, 46, 26, 0.45);
  box-shadow: inset 0 0 16px rgba(255, 46, 26, 0.08);
}

.cal-cell.is-past { opacity: 0.55; }

.cal-day {
  font-family: var(--font-en);
  font-size: 11px;
  color: rgba(232, 232, 232, 0.75);
  display: block;
  margin-bottom: 4px;
}

.is-today .cal-day {
  color: var(--red);
  text-shadow: 0 0 6px var(--red-glow);
  font-weight: 700;
}

.cal-events { display: flex; flex-direction: column; gap: 2px; }

.cal-event {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 2px;
  overflow: hidden;
  text-decoration: none;
  transition: opacity 0.2s;
}

.cal-event.is-link:hover { opacity: 0.75; }
.ev-scheduled { background: rgba(0, 229, 255, 0.15); }
.ev-uploaded  { background: rgba(232, 232, 232, 0.1); }

.ev-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.ev-scheduled .ev-dot { background: var(--cyan); box-shadow: 0 0 4px var(--cyan-glow); }
.ev-uploaded .ev-dot  { background: rgba(232, 232, 232, 0.55); }

.ev-text {
  font-size: 9px;
  color: rgba(232, 232, 232, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.divider-line { flex: 1; height: 1px; background: rgba(255, 46, 26, 0.35); }

.divider-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 4px;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  white-space: nowrap;
}

.event-list { display: flex; flex-direction: column; gap: 0; }

.event-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 46, 26, 0.18);
  border-top: none;
  background: rgba(255, 255, 255, 0.04);
  transition: background 0.2s;
  text-decoration: none;
}

.event-item:first-of-type { border-top: 1px solid rgba(255, 46, 26, 0.18); }
.event-item:hover { background: rgba(255, 255, 255, 0.07); }
.event-item.is-link:hover { background: rgba(0, 229, 255, 0.05); }

.cal-cell.has-events { cursor: pointer; }
.cal-cell.has-events:hover { background: rgba(0, 229, 255, 0.04); }

.event-item.is-highlight {
  border-color: var(--cyan) !important;
  background: rgba(0, 229, 255, 0.08) !important;
  transition: background 0.1s, border-color 0.1s;
}

.ev-item-scheduled { border-left: 3px solid var(--cyan); }
.ev-item-uploaded  { border-left: 3px solid rgba(232, 232, 232, 0.35); }

.ev-thumb {
  width: 72px;
  height: 40px;
  flex-shrink: 0;
  background: rgba(255, 46, 26, 0.08);
  border: 1px solid rgba(255, 46, 26, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ev-thumb img { width: 100%; height: 100%; object-fit: cover; }
.ev-thumb-icon { font-size: 16px; color: rgba(255, 46, 26, 0.25); }

.ev-date {
  font-family: var(--font-en);
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
  text-shadow: 0 0 8px var(--red-glow);
  min-width: 36px;
}

.ev-bar {
  width: 1px;
  height: 28px;
  background: rgba(255, 46, 26, 0.35);
  flex-shrink: 0;
}

.ev-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.ev-title { font-size: 13px; color: rgba(232, 232, 232, 0.95); }
.ev-channel { font-size: 11px; color: rgba(232, 232, 232, 0.6); }

.ev-caption {
  font-size: 11px;
  color: rgba(232, 232, 232, 0.4);
  line-height: 1.5;
  margin-top: 2px;
}

.ev-status {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
}

.ev-item-scheduled .ev-status { color: var(--cyan); text-shadow: 0 0 4px var(--cyan-glow); }
.ev-item-uploaded  .ev-status { color: rgba(232, 232, 232, 0.45); }

.no-events {
  font-family: var(--font-en);
  font-size: 11px;
  color: rgba(232, 232, 232, 0.35);
  letter-spacing: 2px;
  padding: 24px 0;
}

.footer {
  padding: 20px 32px;
  border-top: 1px solid rgba(255, 46, 26, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.footer-logo { font-family: var(--font-en); font-size: 10px; color: rgba(224, 48, 32, 0.5); letter-spacing: 2px; }
.footer-copy { font-size: 11px; color: rgba(232, 232, 232, 0.35); }
.footer-id   { font-family: var(--font-en); font-size: 10px; color: rgba(224, 48, 32, 0.45); letter-spacing: 2px; }

@media (max-width: 640px) {
  .section { padding: 24px 16px 32px; }
  .cal-cell { min-height: 56px; }
  .ev-text { display: none; }
  .ev-thumb { display: none; }
  .footer { padding: 16px; }
}
</style>
