<template>
  <nav class="nav">
    <div class="nav-left">
      <NuxtLink to="/" class="logo">
        <span class="logo-badge">02</span>
        <span class="logo-name">スタジオ零二院</span>
      </NuxtLink>
      <span class="logo-sub">STUDIO REIJIIN</span>
    </div>

    <ul class="nav-links">
  <li><NuxtLink to="/schedule">SCHEDULE</NuxtLink></li>
  <li><NuxtLink to="/channels">CHANNELS</NuxtLink></li>
  <!--
  <li><NuxtLink to="/works">WORKS</NuxtLink></li>
  <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
  <li><NuxtLink to="/contact">CONTACT</NuxtLink></li>
  -->
</ul>

    <div class="nav-status">
      <span class="dot" />
      SYSTEM ONLINE
    </div>
  </nav>
</template>

<style scoped>
.nav {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid var(--border);
}

.nav-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-en);
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 0 8px var(--red-glow), 0 0 18px rgba(255,46,26,0.3);
}

.logo-badge {
  background: var(--red);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 3px;
  letter-spacing: 1px;
  box-shadow: 0 0 10px var(--red-glow), 0 0 20px rgba(255,46,26,0.3);
}

.logo-sub {
  font-family: var(--font-en);
  font-size: 9px;
  color: var(--cyan);
  letter-spacing: 4px;
  text-shadow: 0 0 6px var(--cyan-glow);
}

.nav-links a {
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(232, 232, 232, 0.4);
  transition: color 0.2s, text-shadow 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-en);
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan-glow);
  animation: pulse 2s ease-in-out infinite;
}



.nav-links {
  display: flex;
  gap: 28px;
  list-style: none;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}

@media (max-width: 640px) {
  .nav { padding: 12px 16px; flex-wrap: wrap; gap: 12px; }
  .nav-status { display: none; }
  .nav-links { gap: 16px; }
}
</style>
