<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ArrowUp, Cake, Pencil } from '@lucide/vue'
import {
  days as japanDays,
  trip as japanTrip,
  type Day,
} from './data/trip'
import type { SessionTrip } from './lib/createTrip'
import DayNotice from './components/DayNotice.vue'
import DaySection from './components/DaySection.vue'
import EditMock from './components/EditMock.vue'
import KeyLinks from './components/KeyLinks.vue'
import OnboardingMock from './components/OnboardingMock.vue'

const mode = ref<'onboarding' | 'view' | 'edit'>('onboarding')
const sessionTrip = ref<SessionTrip | null>(null)
const sessionDays = ref<Day[]>([])

const scrolled = ref(false)
const showTop = ref(false)
const activeDay = ref('')

const trip = computed(() => sessionTrip.value)
const days = computed(() => sessionDays.value)
const isDemo = computed(() => Boolean(sessionTrip.value?.isDemo))

function localDateString(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const todayDayId = computed(() => {
  const list = days.value
  const currentTrip = trip.value
  if (!list.length || !currentTrip) return ''
  const today = localDateString()
  const match = list.find((day) => day.date === today)
  if (match) return match.id
  if (today < currentTrip.start) return list[0]?.id ?? ''
  return list[list.length - 1]?.id ?? ''
})

const daysIntro = computed(() => {
  const count = days.value.length
  if (isDemo.value) {
    return 'Eleven days across Japan! Here’s everything we’ve planned so far, including our confirmed bookings and flexible ideas for each day.'
  }
  return `${count} day${count === 1 ? '' : 's'} ready to go. Tap Edit to add plans — titles start as Day 1–${count} and you can rename anytime.`
})

function onScroll() {
  scrolled.value = window.scrollY > 40
  showTop.value = window.scrollY > window.innerHeight * 0.6

  const list = days.value
  const marker = window.innerHeight * 0.35
  let current = list[0]?.id ?? ''
  for (const day of list) {
    const el = document.getElementById(day.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) current = day.id
  }
  activeDay.value = current
}

function bindScroll() {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

function unbindScroll() {
  window.removeEventListener('scroll', onScroll)
}

onMounted(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  unbindScroll()
})

watch(mode, (next) => {
  unbindScroll()
  if (next === 'view') {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      bindScroll()
      activeDay.value = days.value[0]?.id ?? ''
    })
  } else {
    window.scrollTo(0, 0)
  }
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

function scrollToDay(id: string) {
  scrollToId(id)
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

function openEdit() {
  mode.value = 'edit'
}

function closeEdit(updated: Day[]) {
  sessionDays.value = updated
  mode.value = 'view'
}

function onCreated(payload: { trip: SessionTrip; days: Day[] }) {
  sessionTrip.value = payload.trip
  sessionDays.value = payload.days
  mode.value = 'view'
}

function openJapanDemo() {
  sessionTrip.value = {
    name: japanTrip.name,
    year: japanTrip.year,
    start: japanTrip.start,
    end: japanTrip.end,
    rangeLabel: japanTrip.rangeLabel,
    travelers: [...japanTrip.travelers],
    tagline: japanTrip.tagline,
    heroImage: japanTrip.heroImage,
    heroAlt: japanTrip.heroAlt,
    groupPhoto: japanTrip.groupPhoto,
    groupPhotoAlt: japanTrip.groupPhotoAlt,
    isDemo: true,
  }
  sessionDays.value = japanDays.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      notes: activity.notes ? [...activity.notes] : undefined,
    })),
  }))
  mode.value = 'view'
}

function startNewTrip() {
  sessionTrip.value = null
  sessionDays.value = []
  mode.value = 'onboarding'
}
</script>

<template>
  <OnboardingMock
    v-if="mode === 'onboarding'"
    @created="onCreated"
    @open-demo="openJapanDemo"
  />

  <EditMock
    v-else-if="mode === 'edit' && trip"
    :days="days"
    :trip="trip"
    @done="closeEdit"
  />

  <div v-else-if="trip" class="page">
    <DayNotice v-if="isDemo" @open-day="scrollToDay" />

    <header class="topbar" :class="{ 'topbar--solid': scrolled }">
      <a class="topbar__brand" href="#top">{{ trip.name }}</a>
      <div class="topbar__end">
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
        <button
          type="button"
          class="topbar__edit"
          aria-label="Open edit mock"
          @click="openEdit"
        >
          <Pencil :size="14" :stroke-width="2.25" aria-hidden="true" />
          <span>Edit</span>
        </button>
      </div>
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
        <div v-if="trip.groupPhoto" class="hero__portrait">
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
          <button
            v-if="isDemo"
            type="button"
            class="hero__link"
            @click="scrollToLinks"
          >
            Key links
          </button>
          <button v-else type="button" class="hero__link" @click="openEdit">
            Add plans
          </button>
        </div>
      </div>
    </section>

    <main id="days" class="days">
      <header class="days__header">
        <h2 class="days__heading">The Days</h2>
        <p class="days__sub">{{ daysIntro }}</p>
      </header>

      <DaySection
        v-for="(day, index) in days"
        :key="day.id"
        :day="day"
        :index="index"
      />
    </main>

    <KeyLinks v-if="isDemo" />

    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__brand">{{ trip.name }}</p>
        <p class="footer__year">{{ trip.year }}</p>
        <p v-if="trip.travelers.length" class="footer__travelers">
          {{ trip.travelers.join(' · ') }}
        </p>
        <p class="footer__dates">{{ trip.rangeLabel }}</p>
        <button type="button" class="footer__new" @click="startNewTrip">
          New trip mock
        </button>
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
