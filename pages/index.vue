<template>
  <div class="page">
    <SiteNav />

    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <p class="eyebrow">// AI CREATIVE STUDIO — INITIALIZED</p>
        <h1 class="hero-title">
          STUDIO<br>
          <span class="accent">零二院</span>
        </h1>
        <p class="hero-roman">REIJIIN — 02</p>
        <p class="hero-desc">
          ローカルAIによる映像生成スタジオ。
        </p>
      </div>

      <div class="hero-deco" aria-hidden="true">
        <div class="deco-ring">
          <span class="deco-num">02</span>
          <span class="deco-kanji">零二院</span>
        </div>
      </div>
    </section>

    <!-- ピックアップ動画 -->
    <div class="divider">
      <span class="divider-line" />
      <span class="divider-label">PICKUP VIDEOS — ピックアップ</span>
      <span class="divider-line" />
    </div>
    <section class="section">
      <div class="section-header">
        <span class="section-title">FEATURED</span>
        <span class="section-sub">// SELECTED WORKS</span>
      </div>
      <div class="video-grid">
        <a
          v-for="v in pickupVideos"
          :key="v.id"
          :href="`https://www.youtube.com/watch?v=${v.id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="video-card"
        >
          <div class="video-thumb">
            <img :src="`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`" :alt="v.title" />
            <span class="play-icon">▶</span>
          </div>
          <div class="video-info">
            <p class="video-title">{{ v.title }}</p>
            <p class="video-meta">{{ v.channel }} · {{ v.date }}</p>
          </div>
        </a>
      </div>
    </section>

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

    <footer class="footer">
      <span class="footer-logo">STUDIO REIJIIN · 零二院</span>
      <span class="footer-copy">© 2025 スタジオ零二院</span>
      <span class="footer-id">02</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import pickupData from '~/public/data/pickup.json'
import channelsData from '~/public/data/channels.json'

const pickupVideos = pickupData as Array<{
  id: string
  title: string
  channel: string
  date: string
}>

const channels = channelsData as Array<{
  id: string
  name: string
  desc: string
  url: string
  thumbnail: string
  status: 'live' | 'coming'
  label: string
}>
</script>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 60px 32px 50px;
}

.eyebrow {
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 4px;
  color: var(--red);
  margin-bottom: 12px;
  opacity: 0.85;
}

.hero-title {
  font-family: var(--font-en);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 900;
  line-height: 1.1;
  color: #f0f0f0;
  margin-bottom: 6px;
}

.accent { color: var(--red); }

.hero-roman {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 6px;
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
  margin-bottom: 20px;
}

.hero-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 2;
  margin-bottom: 28px;
}

/* Deco */
.hero-deco {
  flex: 0 0 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-ring {
  width: 170px;
  height: 170px;
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
  inset: 14px;
  border-radius: 50%;
  border: 1px solid rgba(200, 40, 30, 0.1);
}

.deco-num {
  font-family: var(--font-en);
  font-size: 56px;
  font-weight: 900;
  color: rgba(200, 40, 30, 0.18);
  position: absolute;
}

.deco-kanji {
  font-size: 12px;
  color: rgba(200, 40, 30, 0.4);
  letter-spacing: 2px;
  position: absolute;
  bottom: 34px;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  margin-bottom: 32px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.divider-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 4px;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  white-space: nowrap;
}

/* Section */
.section {
  padding: 0 32px 48px;
}

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
}

/* ピックアップ動画 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 800px;
}

.video-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.video-card:hover {
  border-color: var(--cyan);
  box-shadow: 0 0 12px var(--cyan-glow);
}

.video-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(255, 46, 26, 0.05);
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s;
}

.video-card:hover .video-thumb img { opacity: 0.7; }

.play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: transparent;
  transition: color 0.2s, text-shadow 0.2s;
}

.video-card:hover .play-icon {
  color: #fff;
  text-shadow: 0 0 14px var(--cyan-glow);
}

.video-info { padding: 12px 14px; }

.video-title {
  font-size: 13px;
  color: rgba(232, 232, 232, 0.9);
  margin-bottom: 5px;
  line-height: 1.5;
}

.video-meta {
  font-family: var(--font-en);
  font-size: 9px;
  color: rgba(0, 229, 255, 0.55);
  letter-spacing: 1px;
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

.channel-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-icon {
  font-size: 24px;
  color: rgba(224, 48, 32, 0.25);
}

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

.footer-logo {
  font-family: var(--font-en);
  font-size: 10px;
  color: rgba(224, 48, 32, 0.35);
  letter-spacing: 2px;
}

.footer-copy {
  font-size: 11px;
  color: rgba(232, 232, 232, 0.2);
}

.footer-id {
  font-family: var(--font-en);
  font-size: 10px;
  color: rgba(224, 48, 32, 0.3);
  letter-spacing: 2px;
}

@media (max-width: 640px) {
  .hero { flex-direction: column; padding: 32px 16px 32px; gap: 24px; }
  .hero-deco { display: none; }
  .section, .divider, .footer { padding-left: 16px; padding-right: 16px; }
  .video-grid { grid-template-columns: 1fr; }
}
</style>
