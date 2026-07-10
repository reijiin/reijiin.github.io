<template>
  <div class="page">
    <SiteNav />

    <div class="divider">
      <span class="divider-line" />
      <span class="divider-label">CHANNELS — 配信チャンネル</span>
      <span class="divider-line" />
    </div>

    <section class="section">
      <div class="section-header">
        <span class="section-title">ALL CHANNELS</span>
        <span class="section-sub">// {{ liveChannels.length }} LIVE</span>
      </div>

      <div class="channel-list">
        <div
          v-for="ch in channels"
          :key="ch.id"
          class="channel-row"
          :class="{ 'is-coming': ch.status === 'coming' }"
        >
          <!-- サムネ -->
          <div class="ch-thumb">
            <img v-if="ch.thumbnail" :src="ch.thumbnail" :alt="ch.name" />
            <span v-else class="ch-thumb-icon">▶</span>
          </div>

          <!-- 情報 -->
          <div class="ch-info">
            <div class="ch-header">
              <span class="ch-label">// {{ ch.label }}</span>
            </div>
            <h2 class="ch-name">{{ ch.name }}</h2>
            <p class="ch-desc">{{ ch.desc }}</p>
            <div v-if="ch.tags.length" class="ch-tags">
              <span v-for="tag in ch.tags" :key="tag" class="ch-tag">{{ tag }}</span>
            </div>
          </div>

          <!-- ボタン -->
          <div v-if="ch.status === 'live'" class="ch-btns">
            <NuxtLink :to="`/channels/${ch.id}`" class="btn btn-detail">詳細 →</NuxtLink>
            <a :href="ch.url" target="_blank" rel="noopener noreferrer" class="btn btn-yt">YouTube ▶</a>
          </div>
          <div v-else class="ch-coming-label">COMING SOON</div>
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

const channels = channelsData as Array<{
  id: string
  name: string
  desc: string
  detail: string
  url: string
  thumbnail: string
  embedVideoId: string
  tags: string[]
  status: 'live' | 'coming'
  label: string
}>

const liveChannels = channels.filter(c => c.status === 'live')
</script>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  margin-top: 40px;
  margin-bottom: 32px;
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

.section { padding: 0 32px 48px; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
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
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}

.channel-row::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 100%;
  background: var(--red);
  box-shadow: 0 0 8px var(--red-glow);
}

.channel-row:hover {
  border-color: rgba(255, 46, 26, 0.4);
  background: rgba(255, 46, 26, 0.03);
}

.channel-row.is-coming {
  opacity: 0.35;
  pointer-events: none;
}

.ch-thumb {
  flex: 0 0 160px;
  height: 90px;
  background: rgba(255, 46, 26, 0.06);
  border: 1px solid rgba(255, 46, 26, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ch-thumb img { width: 100%; height: 100%; object-fit: cover; }
.ch-thumb-icon { font-size: 24px; color: rgba(255, 46, 26, 0.2); }

.ch-info { flex: 1; }

.ch-header { margin-bottom: 4px; }

.ch-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(0, 229, 255, 0.55);
}

.ch-name {
  font-size: 16px;
  font-weight: 500;
  color: rgba(232, 232, 232, 0.95);
  margin-bottom: 6px;
}

.ch-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 10px;
}

.ch-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ch-tag {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 1px;
  color: rgba(255, 46, 26, 0.7);
  border: 1px solid rgba(255, 46, 26, 0.25);
  padding: 2px 8px;
}

.ch-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.btn {
  display: block;
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 2px;
  padding: 8px 16px;
  text-align: center;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.btn-detail {
  border: 1px solid var(--cyan);
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
}

.btn-detail:hover {
  background: var(--cyan-dim);
  box-shadow: 0 0 10px var(--cyan-glow);
}

.btn-yt {
  border: 1px solid rgba(255, 46, 26, 0.5);
  color: var(--red);
  text-shadow: 0 0 6px var(--red-glow);
}

.btn-yt:hover {
  background: var(--red-dim);
  box-shadow: 0 0 10px var(--red-glow);
}

.ch-coming-label {
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(232, 232, 232, 0.2);
  flex-shrink: 0;
}

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
  .section, .divider, .footer { padding-left: 16px; padding-right: 16px; }
  .channel-row { flex-direction: column; align-items: flex-start; }
  .ch-thumb { width: 100%; flex: none; }
  .ch-btns { flex-direction: row; width: 100%; }
  .btn { flex: 1; }
}
</style>
