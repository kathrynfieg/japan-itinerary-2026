<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Cake } from '@lucide/vue'

const TARGET_DATE = '2026-07-26'
const STORAGE_KEY = 'japan-2026-dn'
const DAY_ID = 'jul-26'

const open = ref(false)

const emit = defineEmits<{
  openDay: [id: string]
}>()

const accents = [
  { left: '8%', delay: '0s', duration: '2.6s', color: '#e23d6f', size: 7, drift: -18 },
  { left: '14%', delay: '0.12s', duration: '3s', color: '#f06a3d', size: 5, drift: 14 },
  { left: '22%', delay: '0.05s', duration: '2.4s', color: '#f0b429', size: 6, drift: -8 },
  { left: '30%', delay: '0.28s', duration: '2.9s', color: '#3db88a', size: 8, drift: 20 },
  { left: '38%', delay: '0.08s', duration: '2.5s', color: '#5b7cfa', size: 5, drift: -22 },
  { left: '46%', delay: '0.2s', duration: '3.1s', color: '#b5451b', size: 7, drift: 10 },
  { left: '54%', delay: '0.02s', duration: '2.7s', color: '#e23d6f', size: 6, drift: -14 },
  { left: '62%', delay: '0.18s', duration: '2.8s', color: '#f0b429', size: 9, drift: 16 },
  { left: '70%', delay: '0.1s', duration: '2.5s', color: '#3db88a', size: 5, drift: -10 },
  { left: '78%', delay: '0.24s', duration: '3s', color: '#5b7cfa', size: 7, drift: 22 },
  { left: '86%', delay: '0.06s', duration: '2.6s', color: '#f06a3d', size: 6, drift: -16 },
  { left: '92%', delay: '0.16s', duration: '2.9s', color: '#e23d6f', size: 8, drift: 8 },
  { left: '18%', delay: '0.35s', duration: '2.7s', color: '#f0b429', size: 4, drift: 12 },
  { left: '42%', delay: '0.4s', duration: '3.2s', color: '#5b7cfa', size: 5, drift: -20 },
  { left: '58%', delay: '0.32s', duration: '2.4s', color: '#3db88a', size: 6, drift: 18 },
  { left: '74%', delay: '0.38s', duration: '2.8s', color: '#b5451b', size: 4, drift: -12 },
  { left: '50%', delay: '0.15s', duration: '2.55s', color: '#f06a3d', size: 7, drift: 6 },
  { left: '66%', delay: '0.42s', duration: '3.05s', color: '#e23d6f', size: 5, drift: -24 },
]

/** Copy kept encoded so a casual file open doesn’t spoil the note */
const copy = computed(() => ({
  eyebrow: decode('MjYgSnVseSAyMDI2'),
  title: decode('SGFwcHkgMzB0aCwgWmFj'),
  body: decode(
    'VGhpcnR5IGxvb2tzIGdvb2Qgb24geW91LiBUb2RheSBpcyB5b3VycyDigJQgbGFrZSBsaWdodCBpbiB0aGUgbW9ybmluZywgZHVjayByYW1lbiBhdCBkdXNrLCBhbmQgZ2hvc3Qgc3RvcmllcyBpbiB0aGUgYmFtYm9vIGFmdGVyIGRhcmsu',
  ),
  from: decode('V2l0aCBsb3ZlIGZyb20gSmVzcyAmIEthdA=='),
  cta: decode('T3BlbiB0b2RheSdzIHBsYW4='),
}))

function decode(value: string) {
  try {
    return decodeURIComponent(
      Array.from(atob(value), (c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''),
    )
  } catch {
    return ''
  }
}

function localDateString(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function shouldReveal() {
  if (typeof window === 'undefined') return false
  const preview = new URLSearchParams(window.location.search).has('notice')
  const isTarget = localDateString() === TARGET_DATE
  if (!isTarget && !preview) return false
  if (sessionStorage.getItem(STORAGE_KEY) === 'seen') return false
  return true
}

function dismiss() {
  open.value = false
  sessionStorage.setItem(STORAGE_KEY, 'seen')
}

function openFeaturedDay() {
  dismiss()
  emit('openDay', DAY_ID)
}

onMounted(() => {
  if (!shouldReveal()) return
  window.setTimeout(() => {
    open.value = true
  }, 900)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="notice">
      <div
        v-if="open"
        class="notice"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-title"
      >
        <div class="notice__veil" @click="dismiss" />
        <div class="notice__burst" aria-hidden="true">
          <span
            v-for="(piece, i) in accents"
            :key="i"
            class="notice__speck"
            :style="{
              left: piece.left,
              width: `${piece.size}px`,
              height: `${piece.size * 2.2}px`,
              background: piece.color,
              '--delay': piece.delay,
              '--duration': piece.duration,
              '--drift': `${piece.drift}px`,
            }"
          />
        </div>
        <div class="notice__card">
          <p class="notice__eyebrow">{{ copy.eyebrow }}</p>
          <Cake
            class="notice__icon"
            :size="28"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <h2 id="notice-title" class="notice__title">{{ copy.title }}</h2>
          <p class="notice__message">{{ copy.body }}</p>
          <p class="notice__from">{{ copy.from }}</p>
          <div class="notice__actions">
            <button type="button" class="notice__cta" @click="openFeaturedDay">
              {{ copy.cta }}
            </button>
            <button type="button" class="notice__dismiss" @click="dismiss">
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.notice {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.notice__veil {
  position: absolute;
  inset: 0;
  background: rgb(17 22 17 / 0.58);
  backdrop-filter: blur(6px);
}

.notice__burst {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.notice__speck {
  position: absolute;
  bottom: -12px;
  border-radius: 999px;
  opacity: 0;
  animation: speck-rise var(--duration) cubic-bezier(0.22, 1, 0.36, 1) var(--delay)
    both;
}

.notice__card {
  position: relative;
  z-index: 2;
  width: min(100%, 24rem);
  padding: 2.15rem 1.75rem 1.65rem;
  text-align: center;
  color: var(--ink);
  background:
    radial-gradient(420px 180px at 50% 0%, rgb(181 69 27 / 0.1), transparent 70%),
    #f7f8f4;
  border: 1px solid rgb(197 207 198 / 0.85);
  box-shadow: 0 24px 60px rgb(17 22 17 / 0.28);
  animation: card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.notice__eyebrow {
  margin: 0 0 1rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.notice__icon {
  display: block;
  margin: 0 auto 0.85rem;
  color: var(--accent);
}

.notice__title {
  margin: 0 0 0.85rem;
  font-family: var(--serif);
  font-size: clamp(2.1rem, 8vw, 2.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1;
}

.notice__message {
  margin: 0 auto 1.15rem;
  max-width: 19rem;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.notice__from {
  margin: 0 0 1.65rem;
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--ink);
}

.notice__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.notice__cta {
  appearance: none;
  border: 0;
  background: var(--ink);
  color: #f4f6f2;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.9rem 1.35rem;
  cursor: pointer;
  transition: background 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.notice__cta:hover {
  background: var(--accent-deep);
}

.notice__dismiss {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--ink-soft);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  text-decoration-color: rgb(61 74 64 / 0.35);
}

.notice__dismiss:hover {
  color: var(--ink);
}

.notice-enter-active,
.notice-leave-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.notice-enter-from,
.notice-leave-to {
  opacity: 0;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(1.1rem) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes speck-rise {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  12% {
    opacity: 1;
  }
  70% {
    opacity: 0.85;
  }
  100% {
    opacity: 0;
    transform: translate3d(var(--drift), -85vh, 0) rotate(200deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .notice__speck,
  .notice__card {
    animation: none;
  }

  .notice__card {
    opacity: 1;
    transform: none;
  }

  .notice__speck {
    display: none;
  }
}
</style>
