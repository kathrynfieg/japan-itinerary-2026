<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight } from '@lucide/vue'
import {
  createTripFromInput,
  type CreateTripInput,
  type TripRecord,
} from '../lib/createTrip'

const emit = defineEmits<{
  created: [payload: TripRecord]
  back: []
}>()

const step = ref(1)
const name = ref('')
const whenMode = ref<'dates' | 'count'>('dates')
const start = ref('')
const end = ref('')
const dayCount = ref(7)
const travelersRaw = ref('')

const canContinueStep1 = computed(() => name.value.trim().length > 0)

const canContinueStep2 = computed(() => {
  if (whenMode.value === 'count') {
    return dayCount.value >= 1 && dayCount.value <= 60
  }
  if (!start.value || !end.value) return false
  return start.value <= end.value
})

const previewCount = computed(() => {
  if (whenMode.value === 'count') return dayCount.value
  if (!start.value || !end.value || start.value > end.value) return null
  const a = new Date(start.value + 'T12:00:00')
  const b = new Date(end.value + 'T12:00:00')
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000) + 1
})

function next() {
  if (step.value === 1 && canContinueStep1.value) step.value = 2
  else if (step.value === 2 && canContinueStep2.value) step.value = 3
}

function back() {
  if (step.value > 1) step.value -= 1
}

function create() {
  const travelers = travelersRaw.value
    .split(/[,&]/)
    .map((t) => t.trim())
    .filter(Boolean)

  const input: CreateTripInput = {
    name: name.value,
    travelers,
  }

  if (whenMode.value === 'dates') {
    input.start = start.value
    input.end = end.value
  } else {
    input.dayCount = dayCount.value
  }

  emit('created', createTripFromInput(input))
}
</script>

<template>
  <div class="onboard">
    <div class="onboard__inner">
      <p class="onboard__eyebrow">New trip · mock</p>

      <div class="onboard__progress" aria-hidden="true">
        <span
          class="onboard__dot"
          :class="{ 'onboard__dot--on': step >= 1 }"
        />
        <span
          class="onboard__dot"
          :class="{ 'onboard__dot--on': step >= 2 }"
        />
        <span
          class="onboard__dot"
          :class="{ 'onboard__dot--on': step >= 3 }"
        />
      </div>

      <section v-if="step === 1" class="onboard__step">
        <h1 class="onboard__title">Where are you going?</h1>
        <p class="onboard__lede">
          A place, a region, or just a trip name. Keep it simple.
        </p>
        <label class="onboard__field">
          <span class="onboard__label">Trip name</span>
          <input
            v-model="name"
            type="text"
            class="onboard__input onboard__input--lg"
            placeholder="Japan, Bali, Weekend away…"
            autocomplete="off"
            autofocus
            @keydown.enter.prevent="next"
          />
        </label>
      </section>

      <section v-else-if="step === 2" class="onboard__step">
        <h1 class="onboard__title">When is it?</h1>
        <p class="onboard__lede">
          Dates if you have them — or just how many days.
        </p>

        <div class="onboard__toggle" role="group" aria-label="Date mode">
          <button
            type="button"
            class="onboard__toggle-btn"
            :class="{ 'onboard__toggle-btn--on': whenMode === 'dates' }"
            @click="whenMode = 'dates'"
          >
            Date range
          </button>
          <button
            type="button"
            class="onboard__toggle-btn"
            :class="{ 'onboard__toggle-btn--on': whenMode === 'count' }"
            @click="whenMode = 'count'"
          >
            Number of days
          </button>
        </div>

        <div v-if="whenMode === 'dates'" class="onboard__dates">
          <label class="onboard__field">
            <span class="onboard__label">Start</span>
            <input v-model="start" type="date" class="onboard__input" />
          </label>
          <label class="onboard__field">
            <span class="onboard__label">End</span>
            <input v-model="end" type="date" class="onboard__input" />
          </label>
        </div>

        <label v-else class="onboard__field">
          <span class="onboard__label">Days</span>
          <input
            v-model.number="dayCount"
            type="number"
            class="onboard__input onboard__input--lg"
            min="1"
            max="60"
            inputmode="numeric"
          />
        </label>

        <p v-if="previewCount" class="onboard__hint">
          We’ll set up
          <strong>Day 1</strong> through
          <strong>Day {{ previewCount }}</strong> for you.
        </p>
      </section>

      <section v-else class="onboard__step">
        <h1 class="onboard__title">Who’s going?</h1>
        <p class="onboard__lede">Optional — skip if you want.</p>
        <label class="onboard__field">
          <span class="onboard__label">Travelers</span>
          <input
            v-model="travelersRaw"
            type="text"
            class="onboard__input onboard__input--lg"
            placeholder="Zac, Jess, Kat"
            autocomplete="off"
            @keydown.enter.prevent="create"
          />
        </label>
        <p class="onboard__hint">Separate names with commas.</p>
      </section>

      <div class="onboard__actions">
        <button
          v-if="step > 1"
          type="button"
          class="onboard__back"
          @click="back"
        >
          Back
        </button>

        <button
          v-if="step < 3"
          type="button"
          class="onboard__next"
          :disabled="step === 1 ? !canContinueStep1 : !canContinueStep2"
          @click="next"
        >
          Continue
          <ArrowRight :size="16" :stroke-width="2.25" aria-hidden="true" />
        </button>

        <template v-else>
          <button type="button" class="onboard__skip" @click="create">
            Skip
          </button>
          <button type="button" class="onboard__next" @click="create">
            Create trip
            <ArrowRight :size="16" :stroke-width="2.25" aria-hidden="true" />
          </button>
        </template>
      </div>

      <button type="button" class="onboard__demo" @click="emit('back')">
        Back to home
      </button>
    </div>
  </div>
</template>
