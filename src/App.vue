<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp, Cake } from '@lucide/vue'
import { days, trip } from './data/trip'
import BirthdaySurprise from './components/BirthdaySurprise.vue'
import DaySection from './components/DaySection.vue'
import KeyLinks from './components/KeyLinks.vue'

const scrolled = ref(false)
const showTop = ref(false)
const activeDay = ref(days[0]?.id ?? '')

function localDateString(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const todayDayId = computed(() => {
  const today = localDateString()
  const match = days.find((day) => day.date === today)
  if (match) return match.id
  if (today < trip.start) return days[0]?.id ?? ''
  return days[days.length - 1]?.id ?? ''
})

function onScroll() {
  scrolled.value = window.scrollY > 40
  showTop.value = window.scrollY > window.innerHeight * 0.6

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

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const topbar = document.querySelector('.topbar')
  const offset = (topbar?.getBoundingClientRect().height ?? 64) + 12
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

function scrollToToday() {
  scrollToId(todayDayId.value)
}

function scrollToBirthday() {
  scrollToId('jul-26')
}

function scrollToLinks() {
  scrollToId('links')
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}
</script>

<template>
  <div class="page">
    <BirthdaySurprise @open-day="scrollToBirthday" />

    <header class="topbar" :class="{ 'topbar--solid': scrolled }">
      <a class="topbar__brand" href="#top">{{ trip.name }}</a>
      <nav class="topbar__nav" aria-label="Day jump">
        <a
          v-for="day in days"
          :key="day.id"
          :href="`#${day.id}`"
          class="topbar__day"
          :class="{
            'topbar__day--active': activeDay === day.id,
            'topbar__day--birthday': day.theme === 'birthday',
          }"
          :aria-label="
            day.theme === 'birthday'
              ? `${dayNumber(day.date)} July · Zac’s 30th birthday`
              : undefined
          "
        >
          <span>{{ dayNumber(day.date) }}</span>
          <Cake
            v-if="day.theme === 'birthday'"
            class="topbar__day-cake"
            :size="10"
            :stroke-width="2.25"
            aria-hidden="true"
          />
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
        <div class="hero__actions">
          <button type="button" class="hero__cta" @click="scrollToToday">
            View today
          </button>
          <button type="button" class="hero__link" @click="scrollToLinks">
            Key links
          </button>
        </div>
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

    <KeyLinks />

    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__brand">{{ trip.name }}</p>
        <p class="footer__year">{{ trip.year }}</p>
        <p class="footer__travelers">{{ trip.travelers.join(' · ') }}</p>
        <p class="footer__dates">{{ trip.rangeLabel }}</p>
      </div>
    </footer>

    <button
      type="button"
      class="to-top"
      :class="{ 'to-top--visible': showTop }"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <ArrowUp :size="18" :stroke-width="2" aria-hidden="true" />
    </button>
  </div>
</template>
