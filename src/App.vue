<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { days, trip } from './data/trip'
import DaySection from './components/DaySection.vue'

const scrolled = ref(false)
const activeDay = ref(days[0]?.id ?? '')

function onScroll() {
  scrolled.value = window.scrollY > 40

  const marker = window.innerHeight * 0.35
  let current = days[0]?.id ?? ''
  for (const day of days) {
    const el = document.getElementById(day.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) current = day.id
  }
  activeDay.value = current
}

onMounted(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  // Refresh should start at the hero, not a leftover day hash / scroll position
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.scrollTo(0, 0)

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function scrollToDays() {
  document.getElementById('days')?.scrollIntoView({ behavior: 'smooth' })
}

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}
</script>

<template>
  <div class="page">
    <header class="topbar" :class="{ 'topbar--solid': scrolled }">
      <a class="topbar__brand" href="#top">{{ trip.name }}</a>
      <nav class="topbar__nav" aria-label="Day jump">
        <a
          v-for="day in days"
          :key="day.id"
          :href="`#${day.id}`"
          class="topbar__day"
          :class="{ 'topbar__day--active': activeDay === day.id }"
        >
          {{ dayNumber(day.date) }}
        </a>
      </nav>
    </header>

    <section id="top" class="hero">
      <img
        class="hero__image"
        :src="trip.heroImage"
        :alt="trip.heroAlt"
        width="2400"
        height="1600"
      />
      <div class="hero__veil" />
      <div class="hero__content">
        <div class="hero__portrait">
          <img
            :src="trip.groupPhoto"
            :alt="trip.groupPhotoAlt"
            width="320"
            height="320"
          />
        </div>
        <p class="hero__brand">{{ trip.name }} {{ trip.year }}</p>
        <h1 class="hero__title">{{ trip.rangeLabel }}</h1>
        <p class="hero__lede">{{ trip.tagline }}</p>
        <button type="button" class="hero__cta" @click="scrollToDays">
          View days
        </button>
      </div>
    </section>

    <main id="days" class="days">
      <header class="days__header">
        <h2 class="days__heading">The Days</h2>
        <p class="days__sub">
          Eleven days across Japan! Here’s everything we’ve planned so far,
          including our confirmed bookings and flexible ideas for each day.
        </p>
      </header>

      <DaySection
        v-for="(day, index) in days"
        :key="day.id"
        :day="day"
        :index="index"
      />
    </main>

    <footer class="footer">
      <p class="footer__brand">{{ trip.name }} {{ trip.year }}</p>
      <p class="footer__meta">
        {{ trip.travelers.join(' · ') }} · {{ trip.rangeLabel }}
      </p>
    </footer>
  </div>
</template>
