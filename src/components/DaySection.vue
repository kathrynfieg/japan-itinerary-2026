<script setup lang="ts">
import { Cake, MapPin, PartyPopper } from '@lucide/vue'
import { activityTypes, type Day } from '../data/trip'

defineProps<{
  day: Day
  index: number
}>()

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}

function monthLabel(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    month: 'short',
  })
}
</script>

<template>
  <article
    :id="day.id"
    class="day"
    :class="{ 'day--birthday': day.theme === 'birthday' }"
    :style="{ '--i': index }"
  >
    <div class="day__rail" aria-hidden="true">
      <Cake
        v-if="day.theme === 'birthday'"
        class="day__cake"
        :size="14"
        :stroke-width="2"
      />
      <span v-else class="day__dot" />
    </div>

    <div class="day__body">
      <p class="day__date">
        <span class="day__num">{{ dayNumber(day.date) }}</span>
        <span class="day__meta">
          {{ monthLabel(day.date) }}
          <span class="day__sep">·</span>
          {{ day.weekday }}
        </span>
        <span
          v-if="day.theme === 'birthday'"
          class="day__birthday-mark"
          aria-label="Zac’s 30th birthday"
        >
          <PartyPopper :size="14" :stroke-width="2.25" aria-hidden="true" />
          <span>Zac’s 30th</span>
        </span>
      </p>

      <header class="day__header">
        <h3 class="day__title">{{ day.title }}</h3>
        <p class="day__summary">{{ day.summary }}</p>
      </header>

      <ul v-if="day.activities.length" class="day__list">
        <li
          v-for="(activity, i) in day.activities"
          :key="`${day.id}-${i}`"
          class="day__item"
          :class="{ 'day__item--timed': activity.time }"
        >
          <time v-if="activity.time" class="day__time">{{ activity.time }}</time>
          <div class="day__info">
            <div class="day__title-row">
              <a
                v-if="activity.link"
                class="day__activity-title day__activity-title--link"
                :href="activity.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ activity.title }}
              </a>
              <p v-else class="day__activity-title">{{ activity.title }}</p>
              <span
                v-if="activity.type"
                class="day__chip"
                :data-type="activity.type"
              >
                <span aria-hidden="true">{{ activityTypes[activity.type].emoji }}</span>
                {{ activityTypes[activity.type].label }}
              </span>
            </div>
            <a
              v-if="activity.place && activity.maps"
              class="day__place day__place--link"
              :href="activity.maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin class="day__place-icon" :size="13" :stroke-width="2" aria-hidden="true" />
              <span>{{ activity.place }}</span>
            </a>
            <p v-else-if="activity.place" class="day__place">
              <MapPin class="day__place-icon" :size="13" :stroke-width="2" aria-hidden="true" />
              <span>{{ activity.place }}</span>
            </p>
            <ul v-if="activity.notes?.length" class="day__notes">
              <li
                v-for="(note, noteIndex) in activity.notes"
                :key="noteIndex"
                class="day__note"
              >
                {{ note }}
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <p v-else class="day__empty">No stops listed yet.</p>
    </div>
  </article>
</template>
