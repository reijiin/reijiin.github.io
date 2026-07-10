<template>
  <div class="page">
    <SiteNav />

    <!-- トップバー：スケジュール + 次の投稿 -->
    <div class="top-bar">
      <NuxtLink to="/schedule" class="schedule-btn">SCHEDULE ▶</NuxtLink>
      <span class="top-sep">|</span>
      <template v-if="nextRelease">
        <span class="next-label">// NEXT RELEASE</span>
        <span class="next-date">{{ formatDate(nextRelease.date) }}</span>
        <span class="next-sep">·</span>
        <span class="next-channel">{{ nextRelease.channel }}</span>
      </template>
      <template v-else>
        <span class="next-label">// NO UPCOMING RELEASES</span>
      </template>
    </div>

    <!-- チャンネル一覧 -->
    <div class="divider">
      <span class="divider-line" />
      <span class="divider-label">CHANNELS — 配信チャンネル</span>
      <span class="divider-line" />
    </div>
    <section class="section">
      <div class="section-header">
        <span class="section-title">ACTIVE CHANNELS</span>
        <span class="section-sub">// 01 LIVE</span>
        <NuxtLink to="/channels" class="channels-btn">CHANNELS ▶</NuxtLink>
      </div>
      <div class="channels">
        <a
          v-for="ch in channels"
          :key="ch.id"
          :href="ch.url"
          target="_blank"
          rel="noopener noreferrer"
          class="channel-card"
          :class="{ 'is-coming': ch.status === 'coming' }"
        >
          <div class="channel-thumb">
            <img v-if="ch.thumbnail" :src="ch.thumbnail" :alt="ch.name" />
            <span v-else class="thumb-icon">▶</span>
          </div>
          <div class="channel-info">
            <p class="channel-name">{{ ch.name }}</p>
            <p class="channel-desc">{{ ch.desc }}</p>
            <span class="channel-tag">// {{ ch.label }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- About -->
    <div class="divider">
      <span class="divider-line" />
      <span class="divider-label">ABOUT — スタジオについて</span>
      <span class="divider-line" />
    </div>
    <section class="section about-section">
      <div class="about-inner">
        <div class="about-deco" aria-hidden="true">
          <div class="deco-ring">
            <span class="deco-num">02</span>
            <span class="deco-kanji">零二院</span>
          </div>
        </div>
        <div class="about-text-block">
          <p class="about-eyebrow">// AI CREATIVE STUDIO</p>
          <h2 class="about-title">STUDIO <span class="accent">零二院</span></h2>
          <p class="about-roman">REIJIIN — 02</p>
          <p class="about-desc">
            ローカルAIによる映像生成スタジオ。<br>
            キャラクターが踊る、新しい映像体験を創る。
          </p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <span class="footer-logo">STUDIO REIJIIN · 零二院</span>
      <span class="footer-copy">© 2025 スタジオ零二院</span>
      <span class="footer-id">02</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import channelsData from '~/public/data/channels.json'
import scheduleData from '~/public/data/schedule.json'

const channels = channelsData as Array<{
  id: string
  name: string
  desc: string
  url: string
  thumbnail: string
  status: 'live' | 'coming'
  label: string
}>

const schedule = scheduleData as Array<{
  date: string
  title: string
  channel: string
  channelId: string
  status: 'scheduled' | 'uploaded'
  videoId?: string
  url?: string
  caption?: string
}>

const today = new Date().toISOString().slice(0, 10)
const nextRelease = schedule
  .filter(s => s.status === 'scheduled' && s.date >= today)
  .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
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

/* トップバー */
.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 32px;
  border-bottom: 1px solid var(--border);
  background: rgba(0, 229, 255, 0.03);
}

.schedule-btn {
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
  border: 1px solid rgba(0, 229, 255, 0.4);
  padding: 4px 12px;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.schedule-btn:hover {
  background: var(--cyan-dim);
  box-shadow: 0 0 12px var(--cyan-glow);
}

.top-sep { color: rgba(232, 232, 232, 0.15); font-size: 12px; }

.next-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(232, 232, 232, 0.3);
}

.next-date {
  font-family: var(--font-en);
  font-size: 11px;
  font-weight: 700;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  letter-spacing: 2px;
}

.next-sep { color: rgba(232, 232, 232, 0.2); }

.next-channel {
  font-size: 11px;
  color: rgba(232, 232, 232, 0.5);
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  margin-bottom: 32px;
  margin-top: 40px;
}

.divider-line { flex: 1; height: 1px; background: var(--border); }

.divider-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 4px;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  white-space: nowrap;
}

/* Section */
.section { padding: 0 32px 48px; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 4px;
  color: rgba(232, 232, 232, 0.6);
}

.section-sub {
  font-family: var(--font-en);
  font-size: 10px;
  color: rgba(224, 48, 32, 0.45);
  letter-spacing: 2px;
  flex: 1;
}

.channels-btn {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--red);
  border: 1px solid rgba(255, 46, 26, 0.4);
  padding: 3px 10px;
  transition: background 0.2s, box-shadow 0.2s;
  text-shadow: 0 0 6px var(--red-glow);
}

.channels-btn:hover {
  background: var(--red-dim);
  box-shadow: 0 0 10px var(--red-glow);
}

/* チャンネルカード */
.channels {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.channel-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}

.channel-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 100%;
  background: var(--red);
  box-shadow: 0 0 8px var(--red-glow);
}

.channel-card:hover {
  border-color: rgba(224, 48, 32, 0.5);
  background: rgba(224, 48, 32, 0.05);
}

.channel-card.is-coming {
  opacity: 0.4;
  pointer-events: none;
}

.channel-thumb {
  width: 100%;
  height: 80px;
  background: rgba(224, 48, 32, 0.06);
  border: 1px solid rgba(224, 48, 32, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
}

.channel-thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb-icon { font-size: 24px; color: rgba(224, 48, 32, 0.25); }

.channel-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(232, 232, 232, 0.9);
  margin-bottom: 4px;
}

.channel-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
  line-height: 1.6;
}

.channel-tag {
  font-family: var(--font-en);
  font-size: 9px;
  color: var(--cyan);
  text-shadow: 0 0 4px var(--cyan-glow);
  letter-spacing: 2px;
}

/* About */
.about-section { padding-bottom: 48px; }

.about-inner {
  display: flex;
  align-items: center;
  gap: 40px;
}

.about-deco {
  flex: 0 0 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1.5px solid rgba(200, 40, 30, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.deco-ring::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  border: 1px solid rgba(200, 40, 30, 0.1);
}

.deco-num {
  font-family: var(--font-en);
  font-size: 42px;
  font-weight: 900;
  color: rgba(200, 40, 30, 0.18);
  position: absolute;
}

.deco-kanji {
  font-size: 10px;
  color: rgba(200, 40, 30, 0.4);
  letter-spacing: 2px;
  position: absolute;
  bottom: 26px;
}

.about-text-block { flex: 1; }

.about-eyebrow {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 4px;
  color: rgba(255, 46, 26, 0.5);
  margin-bottom: 8px;
}

.about-title {
  font-family: var(--font-en);
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 900;
  color: #f0f0f0;
  margin-bottom: 4px;
}

.accent { color: var(--red); }

.about-roman {
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 5px;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  margin-bottom: 16px;
}

.about-desc {
  font-size: 13px;
  color: rgba(232, 232, 232, 0.5);
  line-height: 2;
}

/* Footer */
.footer {
  padding: 20px 32px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.footer-logo { font-family: var(--font-en); font-size: 10px; color: rgba(224, 48, 32, 0.35); letter-spacing: 2px; }
.footer-copy { font-size: 11px; color: rgba(232, 232, 232, 0.2); }
.footer-id   { font-family: var(--font-en); font-size: 10px; color: rgba(224, 48, 32, 0.3); letter-spacing: 2px; }

@media (max-width: 640px) {
  .top-bar { padding: 8px 16px; flex-wrap: wrap; gap: 8px; }
  .section, .divider, .footer { padding-left: 16px; padding-right: 16px; }
  .about-inner { flex-direction: column; gap: 20px; }
  .about-deco { display: none; }
}
</style>
