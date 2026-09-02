<script setup lang="ts">
const emit = defineEmits<{
  back: []
}>()

type FontCombo = {
  id: string
  name: string
  heading: string
  body: string
  note: string
  current?: boolean
}

const combos: FontCombo[] = [
  {
    id: 'instrument',
    name: 'Instrument',
    heading: "'Instrument Serif', Georgia, serif",
    body: "'Instrument Sans', ui-sans-serif, sans-serif",
    note: 'Current Daymark pairing — editorial serif headlines with a clean, friendly sans.',
    current: true,
  },
  {
    id: 'fraunces-outfit',
    name: 'Fraunces + Outfit',
    heading: "'Fraunces', Georgia, serif",
    body: "'Outfit', ui-sans-serif, sans-serif",
    note: 'Soft optical serif with a geometric sans — warm but still modern.',
  },
  {
    id: 'source-jakarta',
    name: 'Source Serif + Jakarta',
    heading: "'Source Serif 4', Georgia, serif",
    body: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
    note: 'Product-polished and readable — confident headlines, approachable UI text.',
  },
  {
    id: 'baskerville-inter',
    name: 'Libre Baskerville + Inter',
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Inter', ui-sans-serif, sans-serif",
    note: 'Classic editorial feel with a neutral workhorse sans — very legible at small sizes.',
  },
  {
    id: 'playfair-lato',
    name: 'Playfair + Lato',
    heading: "'Playfair Display', Georgia, serif",
    body: "'Lato', ui-sans-serif, sans-serif",
    note: 'High-contrast display serif — elegant for travel, a touch more dramatic.',
  },
  {
    id: 'outfit-dm',
    name: 'Outfit + DM Sans',
    heading: "'Outfit', ui-sans-serif, sans-serif",
    body: "'DM Sans', ui-sans-serif, sans-serif",
    note: 'All-sans pairing — crisp, contemporary, and very app-like. Outfit carries the hero.',
  },
]
</script>

<template>
  <div class="font-lab">
    <header class="font-lab__bar">
      <button type="button" class="font-lab__back" @click="emit('back')">
        ← Back
      </button>
      <div class="font-lab__bar-copy">
        <p class="font-lab__eyebrow">Temporary</p>
        <h1 class="font-lab__title">Font combos</h1>
      </div>
      <p class="font-lab__hint">
        Open with <code>?fonts</code> in the URL
      </p>
    </header>

    <p class="font-lab__intro">
      Header and body pairings using Daymark copy. The first card is what you have
      today — the rest are options to compare side by side.
    </p>

    <ul class="font-lab__grid">
      <li
        v-for="combo in combos"
        :key="combo.id"
        class="font-lab__card"
        :class="{ 'font-lab__card--current': combo.current }"
      >
        <div class="font-lab__card-head">
          <div>
            <h2 class="font-lab__card-name">{{ combo.name }}</h2>
            <p class="font-lab__card-meta">
              <span>Heading · {{ combo.heading.split(',')[0].replace(/'/g, '') }}</span>
              <span>Body · {{ combo.body.split(',')[0].replace(/'/g, '') }}</span>
            </p>
          </div>
          <span v-if="combo.current" class="font-lab__badge">Current</span>
        </div>

        <p class="font-lab__card-note">{{ combo.note }}</p>

        <div
          class="font-lab__preview"
          :style="{
            '--preview-heading': combo.heading,
            '--preview-body': combo.body,
          }"
        >
          <p class="font-lab__preview-brand">Daymark</p>
          <h3 class="font-lab__preview-hero">
            The simple itinerary app.
          </h3>
          <p class="font-lab__preview-lede">
            Plan the days ahead, keep up with your trip as it unfolds, and hold
            onto the memories afterwards.
          </p>

          <div class="font-lab__preview-day">
            <p class="font-lab__preview-date">
              <span class="font-lab__preview-num">3</span>
              Jun · Thursday
            </p>
            <h4 class="font-lab__preview-day-title">
              Full Day in London, United Kingdom
            </h4>
            <p class="font-lab__preview-day-summary">
              A full day of London highlights
            </p>
            <ul class="font-lab__preview-stops">
              <li>
                <time>10:00</time>
                <div>
                  <strong>Buckingham Palace &amp; St James’s Park</strong>
                  <span>St James’s Park</span>
                </div>
                <em>Sight</em>
              </li>
              <li>
                <time>14:30</time>
                <div>
                  <strong>Tower Bridge &amp; Borough Market</strong>
                  <span>Borough Market</span>
                </div>
                <em>Food</em>
              </li>
            </ul>
          </div>

          <p class="font-lab__preview-ui">
            <span class="font-lab__preview-btn">Start a trip</span>
            <span class="font-lab__preview-caption">Free to try · no account needed</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.font-lab {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 4rem;
}

.font-lab__bar {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.font-lab__back {
  justify-self: start;
  margin: 0;
  padding: 0.45rem 0.75rem;
  border: 1px solid rgb(21 32 24 / 0.12);
  border-radius: 999px;
  background: #fff;
  color: var(--ink);
  font: inherit;
  font-size: 0.84rem;
  cursor: pointer;
}

.font-lab__back:hover {
  background: var(--paper);
}

.font-lab__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-deep);
}

.font-lab__title {
  margin: 0.2rem 0 0;
  font-family: var(--serif);
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  font-weight: 400;
  letter-spacing: -0.025em;
}

.font-lab__hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.font-lab__hint code {
  padding: 0.12rem 0.4rem;
  border-radius: 0.35rem;
  background: rgb(21 32 24 / 0.06);
  font-size: 0.78rem;
}

.font-lab__intro {
  max-width: 38rem;
  margin: 0 0 2rem;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.font-lab__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.font-lab__card {
  padding: 1.25rem;
  border: 1px solid rgb(21 32 24 / 0.08);
  border-radius: 1.25rem;
  background: rgb(255 255 255 / 0.72);
}

.font-lab__card--current {
  border-color: rgb(181 69 27 / 0.28);
  box-shadow: 0 0 0 1px rgb(181 69 27 / 0.08);
}

.font-lab__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.font-lab__card-name {
  margin: 0;
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.font-lab__card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.font-lab__badge {
  flex-shrink: 0;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: rgb(181 69 27 / 0.1);
  color: var(--accent-deep);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.font-lab__card-note {
  margin: 0.75rem 0 1rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--ink-soft);
}

.font-lab__preview {
  padding: 1.25rem;
  border-radius: 1rem;
  background:
    radial-gradient(520px 220px at 80% 0%, rgb(232 236 230 / 0.9) 0%, transparent 60%),
    var(--paper);
  border: 1px solid rgb(21 32 24 / 0.05);
  font-family: var(--preview-body);
  color: var(--ink);
}

.font-lab__preview-brand {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.font-lab__preview-hero {
  margin: 0.65rem 0 0;
  max-width: 14rem;
  font-family: var(--preview-heading);
  font-size: clamp(1.65rem, 4vw, 2.15rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.font-lab__preview-lede {
  margin: 0.75rem 0 0;
  max-width: 22rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--ink-soft);
}

.font-lab__preview-day {
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgb(21 32 24 / 0.08);
}

.font-lab__preview-date {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.font-lab__preview-num {
  font-family: var(--preview-heading);
  font-size: 1.65rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--ink);
  text-transform: none;
}

.font-lab__preview-day-title {
  margin: 0.45rem 0 0;
  font-family: var(--preview-heading);
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.font-lab__preview-day-summary {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.font-lab__preview-stops {
  list-style: none;
  margin: 0.85rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.font-lab__preview-stops li {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  gap: 0.55rem;
  align-items: start;
  font-size: 0.84rem;
}

.font-lab__preview-stops time {
  margin-top: 0.1rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}

.font-lab__preview-stops strong {
  display: block;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.font-lab__preview-stops span {
  display: block;
  margin-top: 0.1rem;
  font-size: 0.76rem;
  color: var(--ink-soft);
}

.font-lab__preview-stops em {
  margin-top: 0.12rem;
  padding: 0.18rem 0.42rem;
  border-radius: 999px;
  background: rgb(21 32 24 / 0.06);
  font-size: 0.62rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.font-lab__preview-ui {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 1rem;
  margin: 1.1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid rgb(21 32 24 / 0.08);
}

.font-lab__preview-btn {
  display: inline-block;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: var(--ink);
  color: #f4f6f2;
  font-size: 0.84rem;
  font-weight: 600;
}

.font-lab__preview-caption {
  font-size: 0.78rem;
  color: var(--ink-soft);
}

@media (min-width: 720px) {
  .font-lab__bar {
    grid-template-columns: auto 1fr auto;
    align-items: end;
  }

  .font-lab__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
