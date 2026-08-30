<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ArrowUp, Cake, Pencil, Share2 } from '@lucide/vue'
import {
  africaDays,
  africaKeyLinks,
  africaTrip,
} from './data/africaTrip'
import {
  days as japanDays,
  keyLinks as japanKeyLinks,
  trip as japanTrip,
  type Day,
  type TripLink,
} from './data/trip'
import {
  nextTripId,
  type SessionTrip,
  type TripPrivacy,
  type TripRecord,
} from './lib/createTrip'
import DayNotice from './components/DayNotice.vue'
import DaySection from './components/DaySection.vue'
import EditMock from './components/EditMock.vue'
import HomeMock from './components/HomeMock.vue'
import KeyLinks from './components/KeyLinks.vue'
import OnboardingMock from './components/OnboardingMock.vue'
import PrivacySheet from './components/PrivacySheet.vue'
import ShareSheet from './components/ShareSheet.vue'
import logo from './assets/3.png'
import logoWhite from './assets/3-white.png'

function cloneDays(source: Day[]): Day[] {
  return source.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      notes: activity.notes ? [...activity.notes] : undefined,
      links: activity.links
        ? activity.links.map((link) => ({ ...link }))
        : undefined,
      files: activity.files
        ? activity.files.map((file) => ({ ...file }))
        : undefined,
    })),
  }))
}

function makeJapanRecord(): TripRecord {
  return {
    id: nextTripId('japan'),
    trip: {
      name: japanTrip.name,
      year: japanTrip.year,
      start: japanTrip.start,
      end: japanTrip.end,
      rangeLabel: japanTrip.rangeLabel,
      travelers: [...japanTrip.travelers],
      tagline: japanTrip.tagline,
      heroImage: japanTrip.heroImage,
      heroAlt: japanTrip.heroAlt,
      heroStyle: 'full',
      groupPhoto: japanTrip.groupPhoto,
      groupPhotoAlt: japanTrip.groupPhotoAlt,
      privacy: 'link',
      isDemo: true,
      daysIntro:
        'Eleven days across Japan! Here’s everything we’ve planned so far, including our confirmed bookings and flexible ideas for each day.',
    },
    days: cloneDays(japanDays),
    links: japanKeyLinks.map((link) => ({ ...link })),
  }
}

function makeAfricaRecord(): TripRecord {
  return {
    id: nextTripId('africa'),
    trip: {
      name: africaTrip.name,
      year: africaTrip.year,
      start: africaTrip.start,
      end: africaTrip.end,
      rangeLabel: africaTrip.rangeLabel,
      travelers: [...africaTrip.travelers],
      tagline: africaTrip.tagline,
      heroImage: africaTrip.heroImage,
      heroAlt: africaTrip.heroAlt,
      heroStyle: 'full',
      privacy: 'private',
      isDemo: true,
      daysIntro: africaTrip.daysIntro,
    },
    days: cloneDays(africaDays),
    links: africaKeyLinks.map((link) => ({ ...link })),
  }
}

const mode = ref<'home' | 'onboarding' | 'view' | 'edit'>('home')
const library = ref<TripRecord[]>([makeJapanRecord(), makeAfricaRecord()])
const activeId = ref<string | null>(null)

const activeRecord = computed(
  () => library.value.find((t) => t.id === activeId.value) ?? null,
)
const trip = computed(() => activeRecord.value?.trip ?? null)
const days = computed(() => activeRecord.value?.days ?? [])
const links = computed(() => activeRecord.value?.links ?? [])
const isDemo = computed(() => Boolean(trip.value?.isDemo))
const hasLinks = computed(() => links.value.length > 0)

const scrolled = ref(false)
const showTop = ref(false)
const activeDay = ref('')
const shareOpen = ref(false)
const privacyOpen = ref(false)

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
  const custom = trip.value?.daysIntro
  if (custom) return custom
  return `${count} day${count === 1 ? '' : 's'} ready to go. Tap Edit to add plans — titles start as Day 1–${count} and you can rename anytime.`
})

const showDayNotice = computed(
  () => Boolean(trip.value?.isDemo && trip.value.name === 'Japan'),
)

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
  const offset = (topbar?.getBoundingClientRect().height ?? 64) + 28
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

function goHome() {
  activeId.value = null
  mode.value = 'home'
}

function startCreate() {
  mode.value = 'onboarding'
}

function openTrip(id: string) {
  activeId.value = id
  mode.value = 'view'
}

function editTrip(id: string) {
  activeId.value = id
  shareOpen.value = false
  mode.value = 'edit'
}

function shareTrip(id: string) {
  activeId.value = id
  privacyOpen.value = false
  shareOpen.value = true
}

function openPrivacy(id: string) {
  activeId.value = id
  shareOpen.value = false
  privacyOpen.value = true
}

function setPrivacy(privacy: TripPrivacy) {
  const id = activeId.value
  if (!id) return
  library.value = library.value.map((record) =>
    record.id === id
      ? { ...record, trip: { ...record.trip, privacy } }
      : record,
  )
}

function duplicateTrip(id: string) {
  const source = library.value.find((t) => t.id === id)
  if (!source) return

  const copy: TripRecord = {
    id: nextTripId(),
    trip: {
      ...source.trip,
      name: `${source.trip.name} copy`,
      travelers: [...source.trip.travelers],
      isDemo: false,
      daysIntro: undefined,
    },
    days: source.days.map((day, index) => ({
      ...day,
      id: `day-${index + 1}-${day.date}-${nextTripId('d')}`,
      activities: day.activities.map((activity) => ({
        ...activity,
        notes: activity.notes ? [...activity.notes] : undefined,
        links: activity.links
          ? activity.links.map((link) => ({ ...link }))
          : undefined,
        files: activity.files
          ? activity.files.map((file) => ({ ...file }))
          : undefined,
      })),
    })),
    links: source.links.map((link) => ({ ...link })),
  }

  const index = library.value.findIndex((t) => t.id === id)
  const next = [...library.value]
  next.splice(index + 1, 0, copy)
  library.value = next
}

function removeTrip(id: string) {
  const record = library.value.find((t) => t.id === id)
  if (!record) return
  const ok = window.confirm(
    `Delete “${record.trip.name}”? This can’t be undone.`,
  )
  if (!ok) return
  library.value = library.value.filter((t) => t.id !== id)
  if (activeId.value === id) {
    activeId.value = null
    shareOpen.value = false
    mode.value = 'home'
  }
}

function openEdit() {
  shareOpen.value = false
  privacyOpen.value = false
  mode.value = 'edit'
}

function openShare() {
  privacyOpen.value = false
  shareOpen.value = true
}

function closeShare() {
  shareOpen.value = false
  if (mode.value === 'home' && !privacyOpen.value) activeId.value = null
}

function closePrivacy() {
  privacyOpen.value = false
  if (mode.value === 'home' && !shareOpen.value) activeId.value = null
}

function closeEdit(payload: {
  trip: SessionTrip
  days: Day[]
  links: TripLink[]
}) {
  const id = activeId.value
  if (!id) {
    mode.value = 'view'
    return
  }
  library.value = library.value.map((record) =>
    record.id === id
      ? {
          ...record,
          trip: payload.trip,
          days: payload.days,
          links: payload.links,
        }
      : record,
  )
  mode.value = 'view'
}

function onCreated(record: TripRecord) {
  library.value = [record, ...library.value]
  activeId.value = record.id
  mode.value = 'view'
}
</script>

<template>
  <HomeMock
    v-if="mode === 'home'"
    :trips="library"
    @create="startCreate"
    @open="openTrip"
    @edit="editTrip"
    @share="shareTrip"
    @privacy="openPrivacy"
    @duplicate="duplicateTrip"
    @remove="removeTrip"
  />

  <OnboardingMock
    v-else-if="mode === 'onboarding'"
    @created="onCreated"
    @back="goHome"
  />

  <EditMock
    v-else-if="mode === 'edit' && trip"
    :days="days"
    :trip="trip"
    :links="links"
    @done="closeEdit"
    @home="goHome"
  />

  <div v-else-if="trip" class="page">
    <DayNotice v-if="showDayNotice" @open-day="scrollToDay" />

    <header class="topbar" :class="{ 'topbar--solid': scrolled }">
      <button
        type="button"
        class="topbar__brand topbar__brand--btn"
        aria-label="Back to trips"
        @click="goHome"
      >
        <img
          class="topbar__mark"
          :src="scrolled ? logo : logoWhite"
          alt=""
          width="46"
          height="46"
        />
      </button>
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
          aria-label="Share trip"
          @click="openShare"
        >
          <Share2 :size="14" :stroke-width="2.25" aria-hidden="true" />
          <span>Share</span>
        </button>
        <button
          type="button"
          class="topbar__edit"
          aria-label="Edit trip"
          @click="openEdit"
        >
          <Pencil :size="14" :stroke-width="2.25" aria-hidden="true" />
          <span>Edit</span>
        </button>
      </div>
    </header>

    <section
      id="top"
      class="hero"
      :class="`hero--${trip.heroStyle ?? 'full'}`"
    >
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
            v-if="hasLinks"
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

    <KeyLinks :links="links" />

    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__brand">{{ trip.name }}</p>
        <p class="footer__year">{{ trip.year }}</p>
        <p v-if="trip.travelers.length" class="footer__travelers">
          {{ trip.travelers.join(' · ') }}
        </p>
        <p class="footer__dates">{{ trip.rangeLabel }}</p>
        <div class="footer__actions">
          <button type="button" class="footer__new" @click="goHome">
            Home
          </button>
          <button type="button" class="footer__new" @click="startCreate">
            New trip
          </button>
        </div>
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

  <ShareSheet
    v-if="trip && activeId"
    :open="shareOpen"
    :trip="trip"
    :days="days"
    :links="links"
    :trip-id="activeId"
    @close="closeShare"
  />

  <PrivacySheet
    v-if="trip && activeId"
    :open="privacyOpen"
    :trip="trip"
    @close="closePrivacy"
    @update="setPrivacy"
  />
</template>
