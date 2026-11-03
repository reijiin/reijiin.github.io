<template>
  <div class="page">
    <SiteNav />

    <div v-if="channel">
      <!-- ヘッダー -->
      <div class="ch-hero">
        <div class="ch-hero-text">
          <p class="ch-label">// {{ channel.label }}</p>
          <h1 class="ch-name">{{ channel.name }}</h1>
          <p class="ch-detail">{{ channel.detail }}</p>
          <div v-if="channel.tags.length" class="ch-tags">
            <span v-for="tag in channel.tags" :key="tag" class="ch-tag">{{ tag }}</span>
          </div>
          <div class="ch-btns">
            <a :href="channel.url" target="_blank" rel="noopener noreferrer" class="btn btn-yt">
              YouTubeチャンネルを見る ▶
            </a>
            <NuxtLink to="/channels" class="btn btn-back">← CHANNELS</NuxtLink>
          </div>
        </div>

        <div class="ch-hero-thumb" v-if="channel.thumbnail">
          <img :src="channel.thumbnail" :alt="channel.name" />
        </div>
      </div>

      <!-- サンプル動画 -->
      <div class="divider">
        <span class="divider-line" />
        <span class="divider-label">SAMPLE VIDEO — サンプル動画</span>
        <span class="divider-line" />
      </div>

      <section class="section">
        <div v-if="channel.embedVideoId" class="embed-wrap">
          <iframe
            :src="`https://www.youtube.com/embed/${channel.embedVideoId}?rel=0`"
            title="Sample Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <div v-else class="embed-placeholder">
          <span class="placeholder-icon">▶</span>
          <span class="placeholder-text">// SAMPLE VIDEO COMING SOON</span>
        </div>
      </section>
    </div>

    <!-- 404 -->
    <div v-else class="not-found">
      <p class="not-found-text">// CHANNEL NOT FOUND</p>
      <NuxtLink to="/channels" class="btn btn-back">← CHANNELS</NuxtLink>
    </div>

    <footer class="footer">
      <span class="footer-logo">STUDIO REIJIIN · 零二院</span>
      <span class="footer-copy">© 2025 スタジオ零二院</span>
      <span class="footer-id">02</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import channelsData from '~/public/data/channels.json'

const route = useRoute()

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

const channel = channels.find(c => c.id === route.params.id && c.status === 'live') ?? null

useHead({
  title: channel ? `${channel.name} | スタジオ零二院` : 'Channel Not Found | スタジオ零二院',
})
</script>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

/* チャンネルヒーロー */
.ch-hero {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  padding: 40px 32px 36px;
}

.ch-hero-text { flex: 1; }

.ch-label {
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(0, 229, 255, 0.6);
  margin-bottom: 8px;
}

.ch-name {
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 14px;
  line-height: 1.3;
}

.ch-detail {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.9;
  margin-bottom: 16px;
  max-width: 560px;
}

.ch-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
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
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 2px;
  padding: 9px 20px;
  transition: background 0.2s, box-shadow 0.2s;
}

.btn-yt {
  background: var(--red);
  color: #fff;
  border: 1px solid var(--red);
  box-shadow: 0 0 12px var(--red-glow);
}

.btn-yt:hover {
  background: #c02010;
  box-shadow: 0 0 20px var(--red-glow);
}

.btn-back {
  border: 1px solid rgba(232, 232, 232, 0.2);
  color: rgba(232, 232, 232, 0.45);
}

.btn-back:hover {
  background: rgba(232, 232, 232, 0.05);
  color: rgba(232, 232, 232, 0.7);
}

.ch-hero-thumb {
  flex: 0 0 260px;
  height: 146px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.ch-hero-thumb img { width: 100%; height: 100%; object-fit: cover; }

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
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

/* Section */
.section { padding: 0 32px 48px; }

/* 埋め込み動画 */
.embed-wrap {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.08);
}

.embed-wrap iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.embed-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border: 1px dashed rgba(255, 46, 26, 0.2);
  background: rgba(255, 46, 26, 0.03);
}

.placeholder-icon {
  font-size: 36px;
  color: rgba(255, 46, 26, 0.15);
}

.placeholder-text {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(232, 232, 232, 0.2);
}

/* 404 */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 80px 32px;
}

.not-found-text {
  font-family: var(--font-en);
  font-size: 13px;
  letter-spacing: 4px;
  color: rgba(232, 232, 232, 0.3);
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
  .ch-hero { flex-direction: column; padding: 24px 16px; }
  .ch-hero-thumb { width: 100%; flex: none; }
  .section, .divider, .footer { padding-left: 16px; padding-right: 16px; }
}
</style>
