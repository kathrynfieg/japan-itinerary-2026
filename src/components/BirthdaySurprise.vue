<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Cake } from '@lucide/vue';

const BIRTHDAY = '2026-07-26';
const STORAGE_KEY = 'japan-2026-zac-surprise';

const open = ref(false);

const emit = defineEmits<{
  openDay: [];
}>();

/** Soft confetti pieces — positions and colors set in JS so they always render */
const confetti = [
  {
    left: '8%',
    delay: '0s',
    duration: '2.6s',
    color: '#e23d6f',
    size: 7,
    drift: -18,
  },
  {
    left: '14%',
    delay: '0.12s',
    duration: '3s',
    color: '#f06a3d',
    size: 5,
    drift: 14,
  },
  {
    left: '22%',
    delay: '0.05s',
    duration: '2.4s',
    color: '#f0b429',
    size: 6,
    drift: -8,
  },
  {
    left: '30%',
    delay: '0.28s',
    duration: '2.9s',
    color: '#3db88a',
    size: 8,
    drift: 20,
  },
  {
    left: '38%',
    delay: '0.08s',
    duration: '2.5s',
    color: '#5b7cfa',
    size: 5,
    drift: -22,
  },
  {
    left: '46%',
    delay: '0.2s',
    duration: '3.1s',
    color: '#b5451b',
    size: 7,
    drift: 10,
  },
  {
    left: '54%',
    delay: '0.02s',
    duration: '2.7s',
    color: '#e23d6f',
    size: 6,
    drift: -14,
  },
  {
    left: '62%',
    delay: '0.18s',
    duration: '2.8s',
    color: '#f0b429',
    size: 9,
    drift: 16,
  },
  {
    left: '70%',
    delay: '0.1s',
    duration: '2.5s',
    color: '#3db88a',
    size: 5,
    drift: -10,
  },
  {
    left: '78%',
    delay: '0.24s',
    duration: '3s',
    color: '#5b7cfa',
    size: 7,
    drift: 22,
  },
  {
    left: '86%',
    delay: '0.06s',
    duration: '2.6s',
    color: '#f06a3d',
    size: 6,
    drift: -16,
  },
  {
    left: '92%',
    delay: '0.16s',
    duration: '2.9s',
    color: '#e23d6f',
    size: 8,
    drift: 8,
  },
  {
    left: '18%',
    delay: '0.35s',
    duration: '2.7s',
    color: '#f0b429',
    size: 4,
    drift: 12,
  },
  {
    left: '42%',
    delay: '0.4s',
    duration: '3.2s',
    color: '#5b7cfa',
    size: 5,
    drift: -20,
  },
  {
    left: '58%',
    delay: '0.32s',
    duration: '2.4s',
    color: '#3db88a',
    size: 6,
    drift: 18,
  },
  {
    left: '74%',
    delay: '0.38s',
    duration: '2.8s',
    color: '#b5451b',
    size: 4,
    drift: -12,
  },
  {
    left: '50%',
    delay: '0.15s',
    duration: '2.55s',
    color: '#f06a3d',
    size: 7,
    drift: 6,
  },
  {
    left: '66%',
    delay: '0.42s',
    duration: '3.05s',
    color: '#e23d6f',
    size: 5,
    drift: -24,
  },
];

function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function shouldReveal() {
  if (typeof window === 'undefined') return false;
  const preview = new URLSearchParams(window.location.search).has('surprise');
  const isBirthday = localDateString() === BIRTHDAY;
  if (!isBirthday && !preview) return false;
  if (sessionStorage.getItem(STORAGE_KEY) === 'seen') return false;
  return true;
}

function dismiss() {
  open.value = false;
  sessionStorage.setItem(STORAGE_KEY, 'seen');
}

function seeToday() {
  dismiss();
  emit('openDay');
}

onMounted(() => {
  if (!shouldReveal()) return;
  // Let the page settle before the surprise arrives
  window.setTimeout(() => {
    open.value = true;
  }, 900);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="surprise">
      <div
        v-if="open"
        class="surprise"
        role="dialog"
        aria-modal="true"
        aria-labelledby="surprise-title"
      >
        <div class="surprise__veil" @click="dismiss" />
        <div class="surprise__burst" aria-hidden="true">
          <span
            v-for="(piece, i) in confetti"
            :key="i"
            class="surprise__speck"
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
        <div class="surprise__card">
          <p class="surprise__eyebrow">26 July 2026</p>
          <Cake
            class="surprise__icon"
            :size="28"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <h2 id="surprise-title" class="surprise__title">Happy 30th, Zac</h2>
          <p class="surprise__message">
            Thirty looks good on you. Today is yours — lake light in the
            morning, duck ramen at dusk, and ghost stories in the bamboo after
            dark.
          </p>
          <p class="surprise__from">With love from Jess &amp; Kat</p>
          <div class="surprise__actions">
            <button type="button" class="surprise__cta" @click="seeToday">
              View birthday day
            </button>
            <button type="button" class="surprise__dismiss" @click="dismiss">
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.surprise {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.surprise__veil {
  position: absolute;
  inset: 0;
  background: rgb(17 22 17 / 0.58);
  backdrop-filter: blur(6px);
}

.surprise__burst {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.surprise__speck {
  position: absolute;
  bottom: -12px;
  border-radius: 999px;
  opacity: 0;
  animation: speck-rise var(--duration) cubic-bezier(0.22, 1, 0.36, 1)
    var(--delay) both;
}

.surprise__card {
  position: relative;
  z-index: 2;
  width: min(100%, 24rem);
  padding: 2.15rem 1.75rem 1.65rem;
  text-align: center;
  color: var(--ink);
  background:
    radial-gradient(
      420px 180px at 50% 0%,
      rgb(181 69 27 / 0.1),
      transparent 70%
    ),
    #f7f8f4;
  border: 1px solid rgb(197 207 198 / 0.85);
  box-shadow: 0 24px 60px rgb(17 22 17 / 0.28);
  animation: card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.surprise__eyebrow {
  margin: 0 0 1rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.surprise__icon {
  display: block;
  margin: 0 auto 0.85rem;
  color: var(--accent);
}

.surprise__title {
  margin: 0 0 0.85rem;
  font-family: var(--serif);
  font-size: clamp(2.1rem, 8vw, 2.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1;
}

.surprise__message {
  margin: 0 auto 1.15rem;
  max-width: 19rem;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.surprise__from {
  margin: 0 0 1.65rem;
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--ink);
}

.surprise__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.surprise__cta {
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

.surprise__cta:hover {
  background: var(--accent-deep);
}

.surprise__dismiss {
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

.surprise__dismiss:hover {
  color: var(--ink);
}

.surprise-enter-active,
.surprise-leave-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.surprise-enter-from,
.surprise-leave-to {
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
  .surprise__speck,
  .surprise__card {
    animation: none;
  }

  .surprise__card {
    opacity: 1;
    transform: none;
  }

  .surprise__speck {
    display: none;
  }
}
</style>
